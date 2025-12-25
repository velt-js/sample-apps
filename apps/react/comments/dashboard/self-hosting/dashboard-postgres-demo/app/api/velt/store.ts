// PostgreSQL store for Velt self-hosting
// Docs: https://docs.velt.dev/self-host-data/overview

import { Pool } from 'pg';

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

// Neon PostgreSQL connection string
const DATABASE_URL = 'postgresql://neondb_owner:npg_ytNISs3UM0hl@ep-delicate-scene-a4k5mjyr-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const COMMENTS_TABLE = 'comment_annotations';
const REACTIONS_TABLE = 'reaction_annotations';
const ATTACHMENTS_TABLE = 'attachments';
const USERS_TABLE = 'users';

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
    // Comments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${COMMENTS_TABLE} (
        annotation_id TEXT PRIMARY KEY,
        document_id TEXT,
        organization_id TEXT,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_${COMMENTS_TABLE}_document_id ON ${COMMENTS_TABLE}(document_id)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_${COMMENTS_TABLE}_organization_id ON ${COMMENTS_TABLE}(organization_id)
    `);

    // Reactions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${REACTIONS_TABLE} (
        annotation_id TEXT PRIMARY KEY,
        document_id TEXT,
        organization_id TEXT,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_${REACTIONS_TABLE}_document_id ON ${REACTIONS_TABLE}(document_id)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_${REACTIONS_TABLE}_organization_id ON ${REACTIONS_TABLE}(organization_id)
    `);

    // Attachments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${ATTACHMENTS_TABLE} (
        attachment_id INTEGER PRIMARY KEY,
        document_id TEXT,
        organization_id TEXT,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_${ATTACHMENTS_TABLE}_document_id ON ${ATTACHMENTS_TABLE}(document_id)
    `);

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
        user_id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    console.log('[PostgreSQL] Tables initialized');
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
    const query = `SELECT annotation_id, data FROM ${COMMENTS_TABLE} ${whereClause}`;

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
        `INSERT INTO ${COMMENTS_TABLE} (annotation_id, document_id, organization_id, data, updated_at)
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
      `DELETE FROM ${COMMENTS_TABLE} WHERE annotation_id = $1`,
      [annotationId]
    );
    return (result.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}

// ============================================================
// Users
// ============================================================

export async function getUsers(userIds: string[]): Promise<Record<string, User>> {
  if (!userIds.length) return {};

  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const result = await client.query(
      `SELECT user_id, data FROM ${USERS_TABLE} WHERE user_id = ANY($1)`,
      [userIds]
    );

    const users: Record<string, User> = {};
    for (const row of result.rows) {
      const user = row.data as User;
      users[row.user_id] = user;
    }

    return users;
  } finally {
    client.release();
  }
}

export async function saveUser(user: User): Promise<void> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    await client.query(
      `INSERT INTO ${USERS_TABLE} (user_id, data, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         data = EXCLUDED.data,
         updated_at = NOW()`,
      [user.userId, JSON.stringify(user)]
    );
  } finally {
    client.release();
  }
}

// ============================================================
// Attachments
// ============================================================

export async function saveAttachment(
  attachment: Attachment,
  context?: { documentId?: string; organizationId?: string }
): Promise<{ url: string }> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const documentId = context?.documentId || attachment.documentId || null;
    const organizationId = context?.organizationId || attachment.organizationId || null;

    // Store the full attachment data including base64Data
    const attachmentData = {
      ...attachment,
      documentId,
      organizationId,
    };

    await client.query(
      `INSERT INTO ${ATTACHMENTS_TABLE} (attachment_id, document_id, organization_id, data, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (attachment_id)
       DO UPDATE SET
         document_id = EXCLUDED.document_id,
         organization_id = EXCLUDED.organization_id,
         data = EXCLUDED.data,
         updated_at = NOW()`,
      [attachment.attachmentId, documentId, organizationId, JSON.stringify(attachmentData)]
    );

    // Return a URL that points to our GET endpoint to serve the file
    const url = `/api/velt/attachments/get/${attachment.attachmentId}`;
    return { url };
  } finally {
    client.release();
  }
}

export async function getAttachment(attachmentId: number): Promise<Attachment | null> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const result = await client.query(
      `SELECT data FROM ${ATTACHMENTS_TABLE} WHERE attachment_id = $1`,
      [attachmentId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].data as Attachment;
  } finally {
    client.release();
  }
}

export async function deleteAttachment(attachmentId: number): Promise<boolean> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const result = await client.query(
      `DELETE FROM ${ATTACHMENTS_TABLE} WHERE attachment_id = $1`,
      [attachmentId]
    );
    return (result.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}

// ============================================================
// Reactions
// ============================================================

export async function getReactions(filters: {
  organizationId?: string;
  reactionAnnotationIds?: string[];
  documentIds?: string[];
}): Promise<Record<string, ReactionAnnotation>> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const conditions: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (filters.reactionAnnotationIds?.length) {
      conditions.push(`annotation_id = ANY($${paramIndex})`);
      values.push(filters.reactionAnnotationIds);
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
    const query = `SELECT annotation_id, data FROM ${REACTIONS_TABLE} ${whereClause}`;

    const result = await client.query(query, values);

    const annotations: Record<string, ReactionAnnotation> = {};
    for (const row of result.rows) {
      const annotation = row.data as ReactionAnnotation;
      annotations[row.annotation_id] = annotation;
    }

    return annotations;
  } finally {
    client.release();
  }
}

export async function saveReactions(
  annotations: Record<string, ReactionAnnotation>,
  context?: { documentId?: string; organizationId?: string }
): Promise<void> {
  if (Object.keys(annotations).length === 0) return;

  await ensureInitialized();
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');

    for (const [id, annotation] of Object.entries(annotations)) {
      const documentId = context?.documentId || annotation.documentId || null;
      const organizationId = context?.organizationId || annotation.organizationId || null;

      const data = {
        ...annotation,
        annotationId: id,
        documentId,
        organizationId,
      };

      await client.query(
        `INSERT INTO ${REACTIONS_TABLE} (annotation_id, document_id, organization_id, data, updated_at)
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

export async function deleteReaction(annotationId: string): Promise<boolean> {
  await ensureInitialized();
  const client = await getPool().connect();
  try {
    const result = await client.query(
      `DELETE FROM ${REACTIONS_TABLE} WHERE annotation_id = $1`,
      [annotationId]
    );
    return (result.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}
