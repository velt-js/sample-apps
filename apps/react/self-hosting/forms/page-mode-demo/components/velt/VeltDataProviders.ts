// [Velt] Data providers for self-hosting content with Django backend
// Docs: https://docs.velt.dev/self-host-data/overview

// Base URL for the Django backend API
// In development: http://localhost:8000/api/velt
// In production: your deployed Django API URL
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_SELF_HOSTING_BASE_URL || 'http://localhost:8000/api/velt';

const COMMENTS_URL = `${BACKEND_BASE_URL}/comments`;
const USERS_URL = `${BACKEND_BASE_URL}/users`;
const ATTACHMENTS_URL = `${BACKEND_BASE_URL}/attachments`;
const REACTIONS_URL = `${BACKEND_BASE_URL}/reactions`;

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

// ============================================================
// Comment Data Provider
// ============================================================

const fetchCommentsFromDB = async (request: {
  organizationId: string;
  commentAnnotationIds?: string[];
  documentIds?: string[];
  folderId?: string;
  allDocuments?: boolean;
}) => {
  console.log('[Velt Self-Host] Comments GET called:', request);
  try {
    const response = await fetch(`${COMMENTS_URL}/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] Comments GET endpoint returned', response.status);
      return { data: {}, success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { data: data.result || data.data || {}, success: data.success, statusCode: response.status };
  } catch (error) {
    console.warn('[Velt Self-Host] Comments GET error:', error);
    return { data: {}, success: false, statusCode: 500 };
  }
};

const saveCommentsToDB = async (request: {
  commentAnnotation: Record<string, {
    annotationId: string;
    metadata?: unknown;
    comments: Record<string, { commentId: string | number; commentHtml?: string; commentText?: string }>;
  }>;
}) => {
  console.log('[Velt Self-Host] Comments SAVE called:', request);
  try {
    const response = await fetch(`${COMMENTS_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] Comments SAVE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { success: data.success ?? true, statusCode: response.status };
  } catch (error) {
    console.warn('[Velt Self-Host] Comments SAVE error:', error);
    return { success: false, statusCode: 500 };
  }
};

const deleteCommentsFromDB = async (request: {
  commentAnnotationId: string;
  metadata?: unknown;
}) => {
  console.log('[Velt Self-Host] Comments DELETE called:', request);
  try {
    const response = await fetch(`${COMMENTS_URL}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] Comments DELETE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { success: data.success ?? true, statusCode: response.status };
  } catch (error) {
    console.warn('[Velt Self-Host] Comments DELETE error:', error);
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
// User Data Provider
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

// NOTE: saveCurrentUserToDB() has been removed because SDK v0.1.3 doesn't provide
// a saveUser() endpoint. The /api/velt/users/save endpoint no longer exists.
// Users are fetched on-demand via userDataProvider.get() which uses SDK's getUsers().

export const userDataProvider = {
  get: fetchUsersFromDB
};

// ============================================================
// Attachment Data Provider
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

// Note: fileToBase64 helper removed - SDK v0.1.3 uses S3 storage with actual files
// instead of base64 encoding in MongoDB

const saveAttachmentToDB = async (request: {
  attachment: {
    attachmentId?: number;
    name?: string;
    url?: string;
    mimeType?: string;
    size?: number;
    base64Data?: string;
    file?: File;
  };
  metadata?: unknown;
}) => {
  console.log('[Velt Self-Host] Attachment SAVE called:', request);
  try {
    const { file, base64Data, ...attachmentWithoutFile } = request.attachment;

    // SDK v0.1.3 requires multipart/form-data with actual file (for S3 storage)
    if (!file || !(file instanceof File)) {
      console.error('[Velt Self-Host] No file object provided for attachment save');
      return { success: false, statusCode: 400 };
    }

    console.log('[Velt Self-Host] Uploading file to S3:', file.name, file.size, 'bytes');

    // Create FormData with file and request JSON
    const formData = new FormData();
    formData.append('file', file);
    
    // Create request JSON structure for SDK
    const requestJson = {
      attachment: {
        ...attachmentWithoutFile,
        name: file.name,
        mimeType: file.type,
      },
      metadata: request.metadata,
    };
    formData.append('request', JSON.stringify(requestJson));

    const response = await fetch(`${ATTACHMENTS_URL}/save`, {
      method: 'POST',
      body: formData
      // Note: Don't set Content-Type header - browser will set it with boundary
    });
    
    if (!response.ok) {
      console.error('[Velt Self-Host] Attachment SAVE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    
    const data = await response.json();
    // SDK returns S3 URL in the attachment.file field
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
// Reaction Data Provider
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
      return { data: {}, success: false, statusCode: response.status };
    }
    const data = await response.json();
    return { data: data.result || data.data || {}, success: data.success, statusCode: response.status };
  } catch (error) {
    console.error('[Velt Self-Host] Error fetching reactions:', error);
    return { data: {}, success: false, statusCode: 500 };
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
