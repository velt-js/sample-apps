// MongoDB store for Velt self-hosting
// Docs: https://docs.velt.dev/self-host-data/overview

import { MongoClient, Db } from 'mongodb';

export type CommentAnnotation = {
  annotationId: string;
  documentId?: string;
  organizationId?: string;
  metadata?: unknown;
  comments: Record<string, { commentId: string | number; commentHtml?: string; commentText?: string }>;
};

export type ReactionAnnotation = {
  annotationId: string;
  documentId?: string;
  organizationId?: string;
  metadata?: unknown;
  icon?: string;
};

export type Attachment = {
  attachmentId: number;
  name?: string;
  url?: string;
  mimeType?: string;
  size?: number;
  documentId?: string;
  organizationId?: string;
  base64Data?: string;
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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eng_db_user:pAS6b4RCSkLZI7Wf@cluster0.8belzzg.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority';
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

    // Create indexes on first connection
    clientPromise.then(async (connectedClient) => {
      const db = connectedClient.db(DB_NAME);
      // Comments indexes
      await db.collection(COMMENTS_COLLECTION).createIndex({ annotationId: 1 }, { unique: true }).catch(() => {});
      await db.collection(COMMENTS_COLLECTION).createIndex({ documentId: 1 }).catch(() => {});
      await db.collection(COMMENTS_COLLECTION).createIndex({ organizationId: 1 }).catch(() => {});
      // Reactions indexes
      await db.collection(REACTIONS_COLLECTION).createIndex({ annotationId: 1 }, { unique: true }).catch(() => {});
      await db.collection(REACTIONS_COLLECTION).createIndex({ documentId: 1 }).catch(() => {});
      await db.collection(REACTIONS_COLLECTION).createIndex({ organizationId: 1 }).catch(() => {});
      // Attachments indexes
      await db.collection(ATTACHMENTS_COLLECTION).createIndex({ attachmentId: 1 }, { unique: true }).catch(() => {});
      await db.collection(ATTACHMENTS_COLLECTION).createIndex({ documentId: 1 }).catch(() => {});
      // Users indexes
      await db.collection(USERS_COLLECTION).createIndex({ userId: 1 }, { unique: true }).catch(() => {});
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
}): Promise<Record<string, CommentAnnotation>> {
  const database = await getDb();
  const collection = database.collection<CommentAnnotation>(COMMENTS_COLLECTION);

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
  const result: Record<string, CommentAnnotation> = {};
  for (const annotation of annotations) {
    result[annotation.annotationId] = annotation;
  }

  return result;
}

export async function saveComments(
  annotations: Record<string, CommentAnnotation>,
  context?: { documentId?: string; organizationId?: string }
): Promise<void> {
  const database = await getDb();
  const collection = database.collection<CommentAnnotation>(COMMENTS_COLLECTION);

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
  const collection = database.collection<CommentAnnotation>(COMMENTS_COLLECTION);

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
  attachment: Attachment,
  context?: { documentId?: string; organizationId?: string }
): Promise<{ url: string }> {
  const database = await getDb();
  const collection = database.collection<Attachment>(ATTACHMENTS_COLLECTION);

  // Store the full attachment data including base64Data
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

  // Return a URL that points to our GET endpoint to serve the file
  const url = `/api/velt/attachments/get/${attachment.attachmentId}`;
  return { url };
}

export async function getAttachment(attachmentId: number): Promise<Attachment | null> {
  const database = await getDb();
  const collection = database.collection<Attachment>(ATTACHMENTS_COLLECTION);

  const attachment = await collection.findOne({ attachmentId });
  return attachment || null;
}

export async function deleteAttachment(attachmentId: number): Promise<boolean> {
  const database = await getDb();
  const collection = database.collection<Attachment>(ATTACHMENTS_COLLECTION);

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
}): Promise<Record<string, ReactionAnnotation>> {
  const database = await getDb();
  const collection = database.collection<ReactionAnnotation>(REACTIONS_COLLECTION);

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

  const result: Record<string, ReactionAnnotation> = {};
  for (const annotation of annotations) {
    result[annotation.annotationId] = annotation;
  }

  return result;
}

export async function saveReactions(
  annotations: Record<string, ReactionAnnotation>,
  context?: { documentId?: string; organizationId?: string }
): Promise<void> {
  const database = await getDb();
  const collection = database.collection<ReactionAnnotation>(REACTIONS_COLLECTION);

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
  const collection = database.collection<ReactionAnnotation>(REACTIONS_COLLECTION);

  const result = await collection.deleteOne({ annotationId });
  return result.deletedCount > 0;
}
