// [Velt] Data providers for self-hosting content
// Docs: https://docs.velt.dev/self-host-data/overview

const COMMENTS_URL = '/api/velt/comments';
const USERS_URL = '/api/velt/users';
const ATTACHMENTS_URL = '/api/velt/attachments';
const REACTIONS_URL = '/api/velt/reactions';

const commentResolverConfig = {
  resolveTimeout: 2000,
  saveRetryConfig: {
    retryCount: 3,
    retryDelay: 2000
  },
  deleteRetryConfig: {
    retryCount: 3,
    retryDelay: 2000
  }
};

// Fetch comment annotations from your backend
const fetchCommentsFromDB = async (request: {
  organizationId: string;
  commentAnnotationIds?: string[];
  documentIds?: string[];
  folderId?: string;
  allDocuments?: boolean;
}) => {
  console.log('Info: Comments GET called:', request);
  try {
    const response = await fetch(`${COMMENTS_URL}/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('Error: Comments GET endpoint returned', response.status);
      return { data: {}, success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { data: data.result || {}, success: data.success, statusCode: response.status };
  } catch (error) {
    console.warn('Error: Comments GET endpoint returned', error);
    return { data: {}, success: false, statusCode: 500 };
  }
};

// Save comment annotations to your backend
const saveCommentsToDB = async (request: {
  commentAnnotation: Record<string, {
    annotationId: string;
    metadata?: unknown;
    comments: Record<string, { commentId: string | number; commentHtml?: string; commentText?: string }>;
  }>;
}) => {
  console.log('Info: Comments SAVE called:', request);
  try {
    const response = await fetch(`${COMMENTS_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('Error: Comments SAVE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { success: data.success ?? true, statusCode: response.status };
  } catch (error) {
    console.warn('Error: Comments SAVE endpoint returned', error);
    return { success: false, statusCode: 500 };
  }
};

// Delete comment annotations from your backend
const deleteCommentsFromDB = async (request: {
  commentAnnotationId: string;
  metadata?: unknown;
}) => {
  console.log('Info: Comments DELETE called:', request);
  try {
    const response = await fetch(`${COMMENTS_URL}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('Error: Comments DELETE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { success: data.success ?? true, statusCode: response.status };
  } catch (error) {
    console.warn('Error: Comments DELETE endpoint returned', error);
    return { success: false, statusCode: 500 };
  }
};

export const commentDataProvider = {
  get: fetchCommentsFromDB,
  save: saveCommentsToDB,
  delete: deleteCommentsFromDB,
  config: commentResolverConfig
};

// ============================================================
// User Data Provider - for self-hosting user PII
// Docs: https://docs.velt.dev/self-host-data/users
// ============================================================

const fetchUsersFromDB = async (userIds: string[]) => {
  console.log('[Velt Self-Host] Users GET called:', userIds);
  try {
    const response = await fetch(`${USERS_URL}/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userIds })
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] Users GET endpoint returned', response.status);
      return {};
    }
    const data = await response.json();
    return data.result || {};
  } catch (error) {
    console.error('[Velt Self-Host] Error fetching users:', error);
    return {};
  }
};

// Save current user to database (call this when user logs in)
export const saveCurrentUserToDB = async (user: {
  userId: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  [key: string]: unknown;
}) => {
  console.log('[Velt Self-Host] Saving current user:', user);
  try {
    const response = await fetch(`${USERS_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user })
    });
    if (!response.ok) {
      console.error('[Velt Self-Host] User SAVE endpoint returned', response.status);
    }
  } catch (error) {
    console.error('[Velt Self-Host] Error saving user:', error);
  }
};

export const userDataProvider = {
  get: fetchUsersFromDB
};

// ============================================================
// Attachment Data Provider - for self-hosting file attachments
// Docs: https://docs.velt.dev/self-host-data/attachments
// ============================================================

const attachmentResolverConfig = {
  resolveTimeout: 2000,
  saveRetryConfig: {
    retryCount: 3,
    retryDelay: 2000
  },
  deleteRetryConfig: {
    retryCount: 3,
    retryDelay: 2000
  }
};

const saveAttachmentToDB = async (request: {
  attachment: {
    attachmentId?: number;
    name?: string;
    url?: string;
    mimeType?: string;
    size?: number;
    base64Data?: string;
  };
  metadata?: unknown;
}) => {
  console.log('[Velt Self-Host] Attachment SAVE called:', request);
  try {
    const response = await fetch(`${ATTACHMENTS_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.error('[Velt Self-Host] Attachment SAVE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { success: true, statusCode: 200, data: data.result };
  } catch (error) {
    console.error('[Velt Self-Host] Error saving attachment:', error);
    return { success: false, statusCode: 500 };
  }
};

const deleteAttachmentFromDB = async (request: {
  attachmentId: number;
  metadata?: unknown;
}) => {
  console.log('[Velt Self-Host] Attachment DELETE called:', request);
  try {
    const response = await fetch(`${ATTACHMENTS_URL}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.error('[Velt Self-Host] Attachment DELETE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    await response.json();
    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error('[Velt Self-Host] Error deleting attachment:', error);
    return { success: false, statusCode: 500 };
  }
};

export const attachmentDataProvider = {
  save: saveAttachmentToDB,
  delete: deleteAttachmentFromDB,
  config: attachmentResolverConfig
};

// ============================================================
// Reaction Data Provider - for self-hosting reactions
// Docs: https://docs.velt.dev/self-host-data/reactions
// ============================================================

const reactionResolverConfig = {
  resolveTimeout: 2000,
  saveRetryConfig: {
    retryCount: 3,
    retryDelay: 2000
  },
  deleteRetryConfig: {
    retryCount: 3,
    retryDelay: 2000
  }
};

const fetchReactionsFromDB = async (request: {
  organizationId: string;
  reactionAnnotationIds?: string[];
  documentIds?: string[];
  folderId?: string;
  allDocuments?: boolean;
}) => {
  console.log('[Velt Self-Host] Reactions GET called:', request);
  try {
    const response = await fetch(`${REACTIONS_URL}/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] Reactions GET endpoint returned', response.status);
      return { data: {}, success: true, statusCode: 200 };
    }
    const data = await response.json();
    return { data: data.result || {}, success: true, statusCode: 200 };
  } catch (error) {
    console.error('[Velt Self-Host] Error fetching reactions:', error);
    return { data: {}, success: true, statusCode: 200 };
  }
};

const saveReactionsToDB = async (request: {
  reactionAnnotation: Record<string, {
    annotationId: string;
    metadata?: unknown;
    icon?: string;
  }>;
}) => {
  console.log('[Velt Self-Host] Reactions SAVE called:', request);
  try {
    const response = await fetch(`${REACTIONS_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.error('[Velt Self-Host] Reactions SAVE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    await response.json();
    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error('[Velt Self-Host] Error saving reactions:', error);
    return { success: false, statusCode: 500 };
  }
};

const deleteReactionFromDB = async (request: {
  reactionAnnotationId: string;
  metadata?: unknown;
}) => {
  console.log('[Velt Self-Host] Reactions DELETE called:', request);
  try {
    const response = await fetch(`${REACTIONS_URL}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.error('[Velt Self-Host] Reactions DELETE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    await response.json();
    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error('[Velt Self-Host] Error deleting reaction:', error);
    return { success: false, statusCode: 500 };
  }
};

export const reactionDataProvider = {
  get: fetchReactionsFromDB,
  save: saveReactionsToDB,
  delete: deleteReactionFromDB,
  config: reactionResolverConfig
};
