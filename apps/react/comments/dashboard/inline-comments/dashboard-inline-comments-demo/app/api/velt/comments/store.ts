// MongoDB store for Velt comments
// Docs: https://docs.velt.dev/self-host-data/comments

import { MongoClient, Db } from 'mongodb';

export type CommentAnnotation = {
  annotationId: string;
  documentId?: string;
  organizationId?: string;
  metadata?: unknown;
  comments: Record<string, { commentId: string | number; commentHtml?: string; commentText?: string }>;
};

// MongoDB connection string - replace with your own
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'velt_comments';
const COLLECTION_NAME = 'comment_annotations';

let client: MongoClient | null = null;
let db: Db | null = null;

async function getDb(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);

  // Create indexes for faster lookups
  await db.collection(COLLECTION_NAME).createIndex({ annotationId: 1 }, { unique: true });
  await db.collection(COLLECTION_NAME).createIndex({ documentId: 1 });
  await db.collection(COLLECTION_NAME).createIndex({ organizationId: 1 });

  console.log('[MongoDB] Connected to database:', DB_NAME);
  return db;
}

export async function getComments(filters: {
  organizationId?: string;
  commentAnnotationIds?: string[];
  documentIds?: string[];
}): Promise<Record<string, CommentAnnotation>> {
  const database = await getDb();
  const collection = database.collection<CommentAnnotation>(COLLECTION_NAME);

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
  const collection = database.collection<CommentAnnotation>(COLLECTION_NAME);

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
  const collection = database.collection<CommentAnnotation>(COLLECTION_NAME);

  const result = await collection.deleteOne({ annotationId });
  return result.deletedCount > 0;
}
