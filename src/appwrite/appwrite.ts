import { Client, Account, OAuthProvider, Databases, ID, Query, Storage } from "appwrite";
import { appwriteConfig } from "./config";

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId) 
 
 const databases = new Databases(client);
 const storage = new Storage(client);

 export async function uploadFile(file: File) {
  try {
    const response = await storage.createFile(appwriteConfig.bucketId, ID.unique(), file);
    return response;
  } 
  catch (error) {
    console.error('Error uploading file:', error);
  }
 }

 export async function uploadVideoWithThumbnail(
  creatorId: string,
  title: string,
  videoFile: File
) {
  try {
    let videoResponse, fileUrl;

    videoResponse = await storage.createFile(appwriteConfig.bucketId, ID.unique(), videoFile);

    fileUrl = await getFilePreview(videoResponse.$id);

    const videoDoc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title,
        video: fileUrl, 
        creatorId,
      }
    );

    console.log('Video data successfully stored in Appwrite:', videoDoc);
    return videoDoc; 
  } catch (error) {
    console.error('Error storing video data:', error);
    throw error; 
  }
}
 
 export async function getFilePreview(fileId: string) {
  try {
    let fileUrl = await storage.getFileView(appwriteConfig.bucketId, fileId);

    if(!fileUrl){ throw new Error('File not found')}

    return fileUrl;
  } catch (error) {
    console.error('Error fetching file preview:', error);
  }
 }

 export const storeUserInDatabase = async (userId: string, name: string, email: string) => {
  try {
   
    const userExists = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('userId', userId)] 
    );

    if (userExists.total === 0) {
      const userDoc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        'unique()',  
        {
          userId,
          name,
          email,
        }
      );

      console.log('User data successfully stored in Appwrite:', userDoc);
    } else {
      console.error('User already exists in Appwrite');
    }
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

export { ID } from 'appwrite';
export { OAuthProvider } 