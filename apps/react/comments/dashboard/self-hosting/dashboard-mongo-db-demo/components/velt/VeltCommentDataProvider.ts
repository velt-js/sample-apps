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
  console.log('Info: Comments GET called:', request);
  try {
    const response = await fetch(`${DATA_PROVIDER_URL}/get`, {
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
    const response = await fetch(`${DATA_PROVIDER_URL}/save`, {
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
    const response = await fetch(`${DATA_PROVIDER_URL}/delete`, {
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
