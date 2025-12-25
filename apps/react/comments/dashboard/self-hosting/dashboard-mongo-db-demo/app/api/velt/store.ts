// MongoDB store for Velt self-hosting
// Docs: https://docs.velt.dev/self-host-data/overview

import { MongoClient, Db } from 'mongodb';

export type PartialCommentAnnotation = {
  annotationId: string;
  documentId?: string;
  organizationId?: string;
  metadata?: unknown;
  comments: Record<string, PartialComment>;
};

export type PartialComment = {
  commentId: string | number;
  commentHtml?: string;
  commentText?: string;
};

export type PartialReactionAnnotation = {
  annotationId: string;
  documentId?: string;
  organizationId?: string;
  metadata?: unknown;
  icon?: string;
};

export type PartialAttachment = {
  attachmentId: number;
  name?: string;
  url?: string;
  mimeType?: string;
  size?: number;
  documentId?: string;
  organizationId?: string;
  data?: unknown;
};

export type User = {
  userId: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  [key: string]: unknown;
};

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://eng_db_user:pAS6b4RCSkLZI7Wf@cluster0.8belzzg.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority';
const DB_NAME = 'velt_comments';
const COMMENTS_COLLECTION = 'comment_annotations';
const REACTIONS_COLLECTION = 'reaction_annotations';
const ATTACHMENTS_COLLECTION = 'attachments';
const USERS_COLLECTION = 'users';

// Cache connection promise for serverless environments
let clientPromise: Promise<MongoClient> | null = null;

async function getDb(): Promise<Db> {
  if (!clientPromise) {
    const client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();

    // Create indexes on first connection (all in parallel)
    clientPromise.then(async (connectedClient) => {
      const db = connectedClient.db(DB_NAME);
      await Promise.all([
        // Comments indexes
        db.collection(COMMENTS_COLLECTION).createIndex({ annotationId: 1 }, { unique: true }),
        db.collection(COMMENTS_COLLECTION).createIndex({ documentId: 1 }),
        db.collection(COMMENTS_COLLECTION).createIndex({ organizationId: 1 }),
        // Reactions indexes
        db.collection(REACTIONS_COLLECTION).createIndex({ annotationId: 1 }, { unique: true }),
        db.collection(REACTIONS_COLLECTION).createIndex({ documentId: 1 }),
        db.collection(REACTIONS_COLLECTION).createIndex({ organizationId: 1 }),
        // Attachments indexes
        db.collection(ATTACHMENTS_COLLECTION).createIndex({ attachmentId: 1 }, { unique: true }),
        db.collection(ATTACHMENTS_COLLECTION).createIndex({ documentId: 1 }),
        // Users indexes
        db.collection(USERS_COLLECTION).createIndex({ userId: 1 }, { unique: true }),
      ]).catch(() => {}); // Silently ignore if indexes already exist
      console.log('[MongoDB] Connected to database:', DB_NAME);
    });
  }

  const client = await clientPromise;
  return client.db(DB_NAME);
}

export async function getComments(filters: {
  organizationId?: string;
  commentAnnotationIds?: string[];
  documentIds?: string[];
}): Promise<Record<string, PartialCommentAnnotation>> {
  const database = await getDb();
  const collection = database.collection<PartialCommentAnnotation>(COMMENTS_COLLECTION);

  // Build query
  const query: Record<string, unknown> = {};

  if (filters.commentAnnotationIds?.length) {
    query.annotationId = { $in: filters.commentAnnotationIds };
  }
  if (filters.documentIds?.length) {
    query.documentId = { $in: filters.documentIds };
  }
  if (filters.organizationId) {
    query.organizationId = filters.organizationId;
  }

  const annotations = await collection.find(query).toArray();

  // Convert to Record format expected by Velt
  const result: Record<string, PartialCommentAnnotation> = {};
  for (const annotation of annotations) {
    result[annotation.annotationId] = annotation;
  }

  return result;
}

export async function saveComments(
  annotations: Record<string, PartialCommentAnnotation>,
  context?: { documentId?: string; organizationId?: string }
): Promise<void> {
  const database = await getDb();
  const collection = database.collection<PartialCommentAnnotation>(COMMENTS_COLLECTION);

  const operations = Object.entries(annotations).map(([id, annotation]) => ({
    updateOne: {
      filter: { annotationId: id },
      update: {
        $set: {
          ...annotation,
          annotationId: id,
          // Store documentId and organizationId at top level for querying
          documentId: context?.documentId || annotation.documentId,
          organizationId: context?.organizationId || annotation.organizationId,
        }
      },
      upsert: true
    }
  }));

  if (operations.length > 0) {
    await collection.bulkWrite(operations);
  }
}

export async function deleteComment(annotationId: string): Promise<boolean> {
  const database = await getDb();
  const collection = database.collection<PartialCommentAnnotation>(COMMENTS_COLLECTION);

  const result = await collection.deleteOne({ annotationId });
  return result.deletedCount > 0;
}

// ============================================================
// Users
// ============================================================

export async function getUsers(userIds: string[]): Promise<Record<string, User>> {
  const database = await getDb();
  const collection = database.collection<User>(USERS_COLLECTION);

  if (!userIds.length) return {};

  const users = await collection.find({ userId: { $in: userIds } }).toArray();

  const result: Record<string, User> = {};
  for (const user of users) {
    result[user.userId] = user;
  }

  return result;
}

export async function saveUser(user: User): Promise<void> {
  const database = await getDb();
  const collection = database.collection<User>(USERS_COLLECTION);

  await collection.updateOne(
    { userId: user.userId },
    { $set: user },
    { upsert: true }
  );
}

// ============================================================
// Attachments
// ============================================================

export async function saveAttachment(
  attachment: PartialAttachment,
  context?: { documentId?: string; organizationId?: string }
): Promise<{ url: string }> {
  const database = await getDb();
  const collection = database.collection<PartialAttachment>(ATTACHMENTS_COLLECTION);

  const attachmentData = {
    ...attachment,
    documentId: context?.documentId || attachment.documentId,
    organizationId: context?.organizationId || attachment.organizationId,
  };

  await collection.updateOne(
    { attachmentId: attachment.attachmentId },
    { $set: attachmentData },
    { upsert: true }
  );

  // Return the URL (in a real implementation, this would be a cloud storage URL)
  return { url: attachment.url || `/api/velt/attachments/${attachment.attachmentId}` };
}

export async function deleteAttachment(attachmentId: number): Promise<boolean> {
  const database = await getDb();
  const collection = database.collection<PartialAttachment>(ATTACHMENTS_COLLECTION);

  const result = await collection.deleteOne({ attachmentId });
  return result.deletedCount > 0;
}

// ============================================================
// Reactions
// ============================================================

export async function getReactions(filters: {
  organizationId?: string;
  reactionAnnotationIds?: string[];
  documentIds?: string[];
}): Promise<Record<string, PartialReactionAnnotation>> {
  const database = await getDb();
  const collection = database.collection<PartialReactionAnnotation>(REACTIONS_COLLECTION);

  const query: Record<string, unknown> = {};

  if (filters.reactionAnnotationIds?.length) {
    query.annotationId = { $in: filters.reactionAnnotationIds };
  }
  if (filters.documentIds?.length) {
    query.documentId = { $in: filters.documentIds };
  }
  if (filters.organizationId) {
    query.organizationId = filters.organizationId;
  }

  const annotations = await collection.find(query).toArray();

  const result: Record<string, PartialReactionAnnotation> = {};
  for (const annotation of annotations) {
    result[annotation.annotationId] = annotation;
  }

  return result;
}

export async function saveReactions(
  annotations: Record<string, PartialReactionAnnotation>,
  context?: { documentId?: string; organizationId?: string }
): Promise<void> {
  const database = await getDb();
  const collection = database.collection<PartialReactionAnnotation>(REACTIONS_COLLECTION);

  const operations = Object.entries(annotations).map(([id, annotation]) => ({
    updateOne: {
      filter: { annotationId: id },
      update: {
        $set: {
          ...annotation,
          annotationId: id,
          documentId: context?.documentId || annotation.documentId,
          organizationId: context?.organizationId || annotation.organizationId,
        }
      },
      upsert: true
    }
  }));

  if (operations.length > 0) {
    await collection.bulkWrite(operations);
  }
}

export async function deleteReaction(annotationId: string): Promise<boolean> {
  const database = await getDb();
  const collection = database.collection<PartialReactionAnnotation>(REACTIONS_COLLECTION);

  const result = await collection.deleteOne({ annotationId });
  return result.deletedCount > 0;
}
