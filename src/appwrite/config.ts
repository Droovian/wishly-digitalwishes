export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    videoCollectionId: process.env.NEXT_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID!,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
    spacesId: process.env.NEXT_PUBLIC_APPWRITE_SPACES_ID!,
    collabsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLABS_COLLECTION_ID!,
    invitesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_INVITES_COLLECTION_ID!
};
