// In-memory store for demo purposes
// Replace with your database (PostgreSQL, MongoDB, etc.) in production

export type CommentAnnotation = {
  annotationId: string;
  documentId?: string;
  organizationId?: string;
  metadata?: unknown;
  comments: Record<string, { commentId: string | number; commentHtml?: string; commentText?: string }>;
};

// In-memory storage - data persists only while server is running
const commentStore: Map<string, CommentAnnotation> = new Map();

export function getComments(filters: {
  organizationId?: string;
  commentAnnotationIds?: string[];
  documentIds?: string[];
}): Record<string, CommentAnnotation> {
  const result: Record<string, CommentAnnotation> = {};

  for (const [id, annotation] of commentStore.entries()) {
    // Filter by annotation IDs if provided
    if (filters.commentAnnotationIds?.length && !filters.commentAnnotationIds.includes(id)) {
      continue;
    }
    // Filter by document IDs if provided
    if (filters.documentIds?.length && annotation.documentId && !filters.documentIds.includes(annotation.documentId)) {
      continue;
    }
    // Filter by organization if provided
    if (filters.organizationId && annotation.organizationId && annotation.organizationId !== filters.organizationId) {
      continue;
    }
    result[id] = annotation;
  }

  return result;
}

export function saveComments(annotations: Record<string, CommentAnnotation>): void {
  for (const [id, annotation] of Object.entries(annotations)) {
    commentStore.set(id, { ...annotation, annotationId: id });
  }
}

export function deleteComment(annotationId: string): boolean {
  return commentStore.delete(annotationId);
}
