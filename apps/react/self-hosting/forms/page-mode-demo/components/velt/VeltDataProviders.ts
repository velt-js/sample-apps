// [Velt] Config-based data providers for self-hosting with Django backend
// Docs: https://docs.velt.dev/self-host-data/overview
//
// This uses the new config-based resolver endpoints where the SDK automatically
// handles HTTP requests, retries, and response formatting.

/* eslint-disable @typescript-eslint/no-explicit-any */

// Base URL for the Django backend API
// In development: http://localhost:8000/api/velt
// In production: your deployed Django API URL
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_SELF_HOSTING_BASE_URL || 'http://localhost:8000/api/velt';

// ============================================================
// Comment Data Provider (Config-Based)
// ============================================================
// The SDK will automatically make POST requests to these endpoints
// Request/Response formats are handled by the SDK

export const commentDataProvider = {
  config: {
    resolveTimeout: 20000,
    saveRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    deleteRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    getRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    getConfig: {
      url: `${BACKEND_BASE_URL}/comments/get`,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    saveConfig: {
      url: `${BACKEND_BASE_URL}/comments/save`,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    deleteConfig: {
      url: `${BACKEND_BASE_URL}/comments/delete`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
} as any;

// ============================================================
// User Data Provider (Config-Based)
// ============================================================
// User resolver only supports getConfig (no save/delete)
// Request format: { organizationId: string, userIds: string[] }
// Response format: { data: Record<string, User>, success: boolean, statusCode: number }

export const userDataProvider = {
  config: {
    resolveTimeout: 5000,
    getRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    // Configure which levels to resolve users for
    resolveUsersConfig: {
      organization: false,
      folder: false,
      document: true
    },
    getConfig: {
      url: `${BACKEND_BASE_URL}/users/get`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
} as any;

// ============================================================
// Attachment Data Provider (Config-Based)
// ============================================================
// When using saveConfig, the SDK automatically handles multipart/form-data uploads.
// No need for custom save() method - the SDK does it all!
//
// Save Request format (handled by SDK as multipart/form-data):
//   - file: File object (binary)
//   - request: JSON string with { attachment: {...}, metadata: {...} }
//
// Save Response format: { data: { url: string }, success: true, statusCode: 200 }

export const attachmentDataProvider = {
  config: {
    resolveTimeout: 30000, // Longer timeout for file uploads
    saveRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    deleteRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    saveConfig: {
      url: `${BACKEND_BASE_URL}/attachments/save`,
      // Note: Don't set Content-Type - browser will set multipart/form-data with boundary
    },
    deleteConfig: {
      url: `${BACKEND_BASE_URL}/attachments/delete`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
} as any;

// ============================================================
// Reaction Data Provider (Config-Based)
// ============================================================
// The SDK will automatically make POST requests to these endpoints

export const reactionDataProvider = {
  config: {
    resolveTimeout: 5000,
    saveRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    deleteRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    getRetryConfig: {
      retryCount: 3,
      retryDelay: 2000
    },
    getConfig: {
      url: `${BACKEND_BASE_URL}/reactions/get`,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    saveConfig: {
      url: `${BACKEND_BASE_URL}/reactions/save`,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    deleteConfig: {
      url: `${BACKEND_BASE_URL}/reactions/delete`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
} as any;
