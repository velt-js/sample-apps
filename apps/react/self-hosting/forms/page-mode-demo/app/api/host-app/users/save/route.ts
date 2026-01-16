import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

/**
 * Host App API - Save User to Database
 *
 * This is part of the HOST APP, not the Velt implementation.
 * Saves users directly to MongoDB when they log in.
 *
 * Separation of concerns:
 * - /api/host-app/* = Your app's user management (this file)
 * - /api/velt/* = Velt self-hosting implementation
 */

// Cache MongoDB client
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const uri = process.env.VELT_MONGODB_CONNECTION_STRING || '';
  if (!uri) {
    throw new Error('VELT_MONGODB_CONNECTION_STRING not configured');
  }

  cachedClient = new MongoClient(uri);
  await cachedClient.connect();
  return cachedClient;
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();

    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const dbName = process.env.VELT_MONGODB_DATABASE || 'velt_comments';
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Upsert user
    await collection.updateOne(
      { userId: user.userId },
      { $set: user },
      { upsert: true }
    );

    console.log('[Host App] User saved to MongoDB:', user.userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Host App] Error saving user:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
