import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filePath = searchParams.get('path')
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      )
    }

    // Get the base path relative to this project
    // This works both locally and on Vercel
    // We go up from master-sample-app to sample-apps root: ../../
    const projectRoot = path.resolve(process.cwd(), '../../')
    
    // Construct the full path
    const fullPath = path.join(projectRoot, filePath)
    const normalizedPath = path.normalize(fullPath)
    const normalizedBase = path.normalize(projectRoot)
    
    // Security check: ensure the file is within the sample-apps directory
    if (!normalizedPath.startsWith(normalizedBase)) {
      return NextResponse.json(
        { error: 'Access denied - path outside of allowed directory' },
        { status: 403 }
      )
    }

    // Read the file
    const content = await readFile(normalizedPath, 'utf-8')
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error reading file:', error)
    return NextResponse.json(
      { error: 'Failed to read file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

