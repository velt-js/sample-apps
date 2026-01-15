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

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result); // This includes the data URL prefix (data:mime/type;base64,...)
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

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
    // Extract the file and convert to base64 if present
    const { file, ...attachmentWithoutFile } = request.attachment;
    let base64Data = request.attachment.base64Data;

    // If we have a File object, convert it to base64
    if (file && file instanceof File) {
      console.log('[Velt Self-Host] Converting file to base64:', file.name, file.size, 'bytes');
      base64Data = await fileToBase64(file);
    }

    // Create the payload with base64Data instead of file
    const payload = {
      attachment: {
        ...attachmentWithoutFile,
        base64Data,
      },
      metadata: request.metadata,
    };

    const response = await fetch(`${ATTACHMENTS_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      console.error('[Velt Self-Host] Attachment SAVE endpoint returned', response.status);
      return { success: false, statusCode: response.status };
    }
    const data = await response.json();
    // The Django backend returns { result: { url: '/api/velt/attachments/get/{id}' } }
    // We need to prepend the backend base URL for cross-origin requests
    const result = data.result;
    if (result?.url && !result.url.startsWith('http')) {
      // Convert relative URL to absolute URL pointing to Django backend
      result.url = `${BACKEND_BASE_URL}${result.url.replace('/api/velt', '')}`;
    }
    return { success: true, statusCode: 200, data: result };
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
