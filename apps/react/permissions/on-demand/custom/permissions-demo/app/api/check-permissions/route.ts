import { NextRequest, NextResponse } from 'next/server';
import {
  computeEffectiveAccess,
  loadPermissionSettings,
  loadSelectedUser,
  PermissionSettings,
  UserRole,
  NodeType,
} from '@/lib/permissions-data';

// Velt Permission Query types
interface PermissionResource {
  type: NodeType | 'context';
  id: string;
  source: string;
  organizationId: string;
  context?: Record<string, string | number>;
}

interface PermissionQueryRequest {
  userId: string;
  resource: PermissionResource;
}

interface PermissionQueryBody {
  data: {
    requests: PermissionQueryRequest[];
  };
}

// Velt Permission Result types
interface PermissionResultItem {
  userId: string;
  resourceId: string;
  type: string;
  organizationId: string;
  hasAccess: boolean;
  accessRole?: 'viewer' | 'editor';
  expiresAt?: number;
}

interface PermissionResultResponse {
  data: PermissionResultItem[];
  success: boolean;
  statusCode: number;
  message?: string;
}

// Map Velt resource IDs to our internal IDs
function mapResourceId(resourceId: string, resourceType: string): string {
  // Our demo uses IDs like 'org-a', 'folder-a', 'doc-a'
  // Velt might send different IDs, so we need to map them

  // If it's already our format, return as-is
  if (resourceId.startsWith('org-') || resourceId.startsWith('folder-') || resourceId.startsWith('doc-')) {
    return resourceId;
  }

  // For the demo, we'll use the organization ID 'org-a' for organization type
  if (resourceType === 'organization') {
    return 'org-a';
  }

  return resourceId;
}

export async function POST(request: NextRequest): Promise<NextResponse<PermissionResultResponse>> {
  try {
    const body: PermissionQueryBody = await request.json();
    const { requests } = body.data;

    // Load current permission settings and user from the request headers or defaults
    // In a real app, these would come from your database
    // For this demo, we read from localStorage via cookies/headers or use defaults

    let permissionSettings: PermissionSettings;
    let selectedUser: UserRole;

    // Try to get settings from custom headers (for demo purposes)
    const settingsHeader = request.headers.get('x-demo-permission-settings');
    const userHeader = request.headers.get('x-demo-selected-user');

    if (settingsHeader) {
      try {
        permissionSettings = JSON.parse(settingsHeader);
      } catch {
        permissionSettings = loadPermissionSettings();
      }
    } else {
      permissionSettings = loadPermissionSettings();
    }

    if (userHeader && ['Intern', 'Owner', 'Custom'].includes(userHeader)) {
      selectedUser = userHeader as UserRole;
    } else {
      selectedUser = loadSelectedUser();
    }

    // Process each permission request
    const permissions: PermissionResultItem[] = [];

    for (const req of requests) {
      const { userId, resource } = req;
      const { type, id, organizationId } = resource;

      // Handle context-based requests (return access based on org membership)
      if (type === 'context') {
        const orgAccess = computeEffectiveAccess('org-a', selectedUser, permissionSettings);
        permissions.push({
          userId,
          resourceId: id,
          type: 'context',
          organizationId,
          hasAccess: orgAccess.hasAccess,
        });
        continue;
      }

      // Map the resource ID to our internal ID
      const internalId = mapResourceId(id, type);

      // Compute access for this resource
      const access = computeEffectiveAccess(internalId, selectedUser, permissionSettings);

      const result: PermissionResultItem = {
        userId,
        resourceId: id,
        type,
        organizationId,
        hasAccess: access.hasAccess,
      };

      // Add accessRole for documents
      if (type === 'document' && access.hasAccess) {
        result.accessRole = access.accessRole;
        // Set expiration 10 minutes from now for demo
        result.expiresAt = Date.now() + 10 * 60 * 1000;
      }

      permissions.push(result);
    }

    // Return response in Velt's expected format
    const response: PermissionResultResponse = {
      data: permissions,
      success: true,
      statusCode: 200,
      message: 'Permissions validated successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Permission check error:', error);

    return NextResponse.json(
      {
        data: [],
        success: false,
        statusCode: 500,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-demo-permission-settings, x-demo-selected-user',
    },
  });
}
