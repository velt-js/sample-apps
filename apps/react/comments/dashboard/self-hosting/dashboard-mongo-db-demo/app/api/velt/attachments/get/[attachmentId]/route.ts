import { NextRequest, NextResponse } from 'next/server';
import { getAttachment } from '../../../comments/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  try {
    const { attachmentId } = await params;
    const attachmentIdNum = parseInt(attachmentId, 10);

    if (isNaN(attachmentIdNum)) {
      return NextResponse.json({ success: false, error: 'Invalid attachment ID' }, { status: 400 });
    }

    console.log('[Velt API] GET attachment:', attachmentIdNum);

    const attachment = await getAttachment(attachmentIdNum);

    if (!attachment) {
      return NextResponse.json({ success: false, error: 'Attachment not found' }, { status: 404 });
    }

    // Check if we have base64Data to serve
    if (!attachment.base64Data) {
      return NextResponse.json({ success: false, error: 'No file data available' }, { status: 404 });
    }

    // Convert base64 to binary
    const base64Data = attachment.base64Data;
    // Handle data URL format (e.g., "data:application/pdf;base64,...")
    const base64Content = base64Data.includes(',')
      ? base64Data.split(',')[1]
      : base64Data;

    const binaryData = Buffer.from(base64Content, 'base64');

    // Return the file with appropriate headers
    return new NextResponse(binaryData, {
      status: 200,
      headers: {
        'Content-Type': attachment.mimeType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${attachment.name || 'attachment'}"`,
        'Content-Length': binaryData.length.toString(),
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('[Velt API] Error getting attachment:', error);
    return NextResponse.json({ success: false, error: 'Failed to get attachment' }, { status: 500 });
  }
}
