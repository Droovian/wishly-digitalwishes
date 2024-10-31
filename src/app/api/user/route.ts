// /app/api/storeUser/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases } from 'appwrite';

const client = new Client();
const databases = new Databases(client);

// Initialize the Appwrite client
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('670f8c83000b3c68feee'); // Your Appwrite Project ID

// Define the type for user data
interface UserData {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string; // Optional field
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, email, avatarUrl }: UserData = body;

    // Check if the user already exists
    const userExists = await databases.listDocuments(
      '6710996a000569b8a6ad',  // Your Database ID
      '671099c3003764136a39', // Your Collection ID
      [`userId=${userId}`]  // Filter based on userId
    );

    // If the user doesn't exist, create a new document in Appwrite
    if (userExists.total === 0) {
      const userDoc = await databases.createDocument(
        '6710996a000569b8a6ad',
        '671099c3003764136a39',
        'unique()',  // Auto-generate document ID
        {
          userId,
          name,
          email,
          avatarUrl, // Optional fields can be undefined
        }
      );

      return NextResponse.json({ message: 'User stored successfully', data: userDoc });
    } else {
      return NextResponse.json({ message: 'User already exists' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error storing user data' }, { status: 500 });
  }
}
