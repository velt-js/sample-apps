// PostgreSQL store for Velt comments
// Docs: https://docs.velt.dev/self-host-data/comments

import { Pool } from 'pg';

export type CommentAnnotation = {
  annotationId: string;
  documentId?: string;
  organizationId?: string;
  metadata?: unknown;
  comments: Record<string, { commentId: string | number; commentHtml?: string; commentText?: string }>;
};

// PostgreSQL connection string
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL && process.env.NODE_ENV === 'production') {
  console.warn('[PostgreSQL] WARNING: DATABASE_URL not set. Database operations will fail.');
}

const TABLE_NAME = 'comment_annotations';

// Create a connection pool for serverless environments
let pool: Pool | null = null;
let initPromise: Promise<void> | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
}

async function ensureInitialized(): Promise<void> {
  if (!initPromise) {
    initPromise = initializeTable();
  }
  return initPromise;
}

async function initializeTable(): Promise<void> {
  const client = await getPool().connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        annotation_id TEXT PRIMARY KEY,
        document_id TEXT,
        organization_id TEXT,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Create indexes for faster queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_document_id ON ${TABLE_NAME}(document_id)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_organization_id ON ${TABLE_NAME}(organization_id)
    `);

    console.log('[PostgreSQL] Table initialized:', TABLE_NAME);
  } finally {
    client.release();
  }
}

export async function getComments(filters: {
  organizationId?: string;
  commentAnnotationIds?: string[];
  documentIds?: string[];
}): Promise<Record<string, CommentAnnotation>> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const conditions: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (filters.commentAnnotationIds?.length) {
      conditions.push(`annotation_id = ANY($${paramIndex})`);
      values.push(filters.commentAnnotationIds);
      paramIndex++;
    }
    if (filters.documentIds?.length) {
      conditions.push(`document_id = ANY($${paramIndex})`);
      values.push(filters.documentIds);
      paramIndex++;
    }
    if (filters.organizationId) {
      conditions.push(`organization_id = $${paramIndex}`);
      values.push(filters.organizationId);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT annotation_id, data FROM ${TABLE_NAME} ${whereClause}`;

    const result = await client.query(query, values);

    // Convert to Record format expected by Velt
    const annotations: Record<string, CommentAnnotation> = {};
    for (const row of result.rows) {
      const annotation = row.data as CommentAnnotation;
      annotations[row.annotation_id] = annotation;
    }

    return annotations;
  } finally {
    client.release();
  }
}

export async function saveComments(
  annotations: Record<string, CommentAnnotation>,
  context?: { documentId?: string; organizationId?: string }
): Promise<void> {
  if (Object.keys(annotations).length === 0) return;

  await ensureInitialized();
  const client = await getPool().connect();
  try {
    // Use a transaction for batch upserts
    await client.query('BEGIN');

    for (const [id, annotation] of Object.entries(annotations)) {
      const documentId = context?.documentId || annotation.documentId || null;
      const organizationId = context?.organizationId || annotation.organizationId || null;

      // Store the full annotation with annotationId included
      const data = {
        ...annotation,
        annotationId: id,
        documentId,
        organizationId,
      };

      await client.query(
        `INSERT INTO ${TABLE_NAME} (annotation_id, document_id, organization_id, data, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (annotation_id)
         DO UPDATE SET
           document_id = EXCLUDED.document_id,
           organization_id = EXCLUDED.organization_id,
           data = EXCLUDED.data,
           updated_at = NOW()`,
        [id, documentId, organizationId, JSON.stringify(data)]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteComment(annotationId: string): Promise<boolean> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const result = await client.query(
      `DELETE FROM ${TABLE_NAME} WHERE annotation_id = $1`,
      [annotationId]
    );
    return (result.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}
