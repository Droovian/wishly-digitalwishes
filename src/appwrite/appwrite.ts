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
  videoFile: File,
  spaceId: string,
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
        spaceId, //please take care of the space id as well here
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

    if (!fileUrl) { throw new Error('File not found') }

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

// appwrite function for creating a video space

export const createVideoSpace = async (spaceData: {
  name: string,
  createdBy: string,
  customMessage: string,
}, userId: string) => {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.spacesId,
      ID.unique(), // generates the space id for us
      {
        name: spaceData.name,
        createdBy: spaceData.createdBy,
        creatorId: userId,
        customMessage: spaceData.customMessage,
      }
    );

    console.log("Space created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating video space:", error);
    throw error;
  }
};


//query all the spaces created by the logged in user

export const getSpacesByCreatorId = async (creatorId: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,  // Your Database ID
      appwriteConfig.spacesId, //spaces id
      [Query.equal('creatorId', creatorId)]
    );

    console.log('Spaces:', response.documents);
    return response.documents;
  } catch (error) {
    console.error('Error fetching spaces:', error);
  }
};

// query to list all the videos related to a particular space

export const getVideosBySpaceID = async (spaceId:string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal('spaceId',spaceId)]
    );
    console.log("successfully fetched videos for the id");
    return response.documents;
  } catch (error) {
    console.log("Error occured while fetching videos" + error);
  }
}


// export const loginWithGoogle = async () => {
//   try {
//       await account.createOAuth2Session(
//       OAuthProvider.Google,
//       'http://localhost:3000/home',
//       'http://localhost:3000/fail',
//       ['email', 'profile', 'openid']
//     )

//   } catch (error) {
//     console.error('OAuth login error:', error);
//   }
// }

// export const logoutUser = async () => {
//   try {
//     await account.deleteSession('current')
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const getUser = async () => {
//   try {
//     return await account.get()
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const getCurrentSession = async () => {
//   try {
//     const session = await account.getSession('current');
//     console.log('Provider:', session.provider);
//     console.log('Provider UID:', session.providerUid);
//     console.log('Provider Access Token:', session.providerAccessToken);
//     return session;
//   } catch (error) {
//     console.error("Error fetching session:", error);
//     return null;
//   }
// };

export { ID } from 'appwrite';
export { OAuthProvider } 