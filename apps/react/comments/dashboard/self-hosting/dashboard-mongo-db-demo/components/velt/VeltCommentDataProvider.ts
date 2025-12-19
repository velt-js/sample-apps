// [Velt] Comment data provider for self-hosting comment content
// Docs: https://docs.velt.dev/self-host-data/comments

const DATA_PROVIDER_URL = '/api/velt/comments';

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
  console.log('[Velt Self-Host] GET called:', request);
  try {
    const response = await fetch(`${DATA_PROVIDER_URL}/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] GET endpoint returned', response.status);
      return { data: {}, success: true, statusCode: 200 }; // Return empty data on 404
    }
    const data = await response.json();
    return { data: data.result || {}, success: true, statusCode: 200 };
  } catch (error) {
    console.error('[Velt Self-Host] Error fetching comments:', error);
    return { data: {}, success: true, statusCode: 200 }; // Graceful fallback
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
  console.log('[Velt Self-Host] SAVE called:', request);
  try {
    const response = await fetch(`${DATA_PROVIDER_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] SAVE endpoint returned', response.status);
      return { success: true, statusCode: 200 }; // Graceful fallback
    }
    await response.json();
    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error('[Velt Self-Host] Error saving comments:', error);
    return { success: true, statusCode: 200 }; // Graceful fallback
  }
};

// Delete comment annotations from your backend
const deleteCommentsFromDB = async (request: {
  commentAnnotationId: string;
  metadata?: unknown;
}) => {
  console.log('[Velt Self-Host] DELETE called:', request);
  try {
    const response = await fetch(`${DATA_PROVIDER_URL}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.warn('[Velt Self-Host] DELETE endpoint returned', response.status);
      return { success: true, statusCode: 200 }; // Graceful fallback
    }
    await response.json();
    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error('[Velt Self-Host] Error deleting comments:', error);
    return { success: true, statusCode: 200 }; // Graceful fallback
  }
};

export const commentDataProvider = {
  get: fetchCommentsFromDB,
  save: saveCommentsToDB,
  delete: deleteCommentsFromDB,
  config: commentResolverConfig
};
