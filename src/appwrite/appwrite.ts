import { Client, Account, OAuthProvider, Databases, ID, Query, Storage } from "appwrite";
import { appwriteConfig } from "./config";
import crypto from 'crypto';

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

export const generateInviteToken = () => {
  return crypto.randomBytes(16).toString('hex'); 
};

export const createInviteLink = (token: string, spaceId: string) => {
  const baseUrl = 'http://localhost:3000/validate'; 
  return `${baseUrl}?token=${token}&spaceId=${spaceId}`; 
};

const MAX_VIDEOS_PER_SPACE = 4;
const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

export async function uploadVideoWithThumbnail(
  creatorId: string,
  title: string,
  videoFile: File,
  spaceId: string,
) {
  try {
    let videoResponse, fileUrl;

    if(videoFile.size > MAX_VIDEO_SIZE_BYTES) {
      throw new Error('Video file size exceeds the limit of 100MB.');
    }

    const existingVideos = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("spaceId", spaceId)]
    );

    if (existingVideos.documents.length >= MAX_VIDEOS_PER_SPACE) {
      throw new Error("Video limit for this space has been reached (4 videos max).");
    }

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
        spaceId: spaceId,
      }
    );

    console.log('Video data successfully stored in Appwrite:', videoDoc);
    return videoDoc; 
  } catch (error) {
    console.error('Error storing video data:', error);
    throw error; 
  }
}

export async function addToRsvpList(inviteId: string, name: string){
  try {
    const invite = await getInviteByDocumentId(inviteId);

    if (!invite) {
      throw new Error('Invite not found');
    }

    if(invite.rsvpList.includes(name)) {
      throw new Error('Name already added to RSVP list');
    }

    const updatedRsvpList = [...invite.rsvpList, name];

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.invitesCollectionId,
      inviteId,
      {
        rsvpList: updatedRsvpList,
      }
    );

    console.log("RSVP successfully added:", name);
  } catch (error) {
    console.error("Error adding to RSVP list:", error);
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
  age: string,
  addVideo: boolean,
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
        age: spaceData.age,
        addVideo: spaceData.addVideo,
      }
    );

    console.log("Space created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating video space:", error);
    throw error;
  }
};

export const handleDeleteInviteById = async (inviteId: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.invitesCollectionId,
      inviteId
    );
  } catch (error) {
    console.error('Error deleting invite:', error);
    throw error;
  }
}

export const viewRsvpList = async (inviteId: string) => {
  try {
    const invite = await getInviteByDocumentId(inviteId);

    if (!invite) {
      throw new Error('Invite not found');
    }

    return invite.rsvpList;
  } catch (error) {
    console.error('Error viewing RSVP list:', error);
    throw error;
  }
}

export const getSpacesByCreatorId = async (creatorId: string, email: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,  // Your Database ID
      appwriteConfig.spacesId,    // Spaces Collection ID
      [Query.or([Query.equal("creatorId", creatorId), Query.contains("collaborators", email)])]
    );

    return response.documents;
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return [];
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

export const createInviteDocument = async (groupId: string, token: string) => {
  const expirationTime = new Date(Date.now() + 30 * 60 * 1000);

  const inviteData = {
    token: token,
    groupId: groupId,
    status: false,
    expiration: expirationTime.toISOString(),
  };

  await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collabsCollectionId,
    token,
    inviteData
  );

};

export const getInviteByToken = async (token: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collabsCollectionId,
      [Query.equal('token', token)]
    );

    if (response.total > 0) {
      return response.documents[0]; // Return the first invite document found
    }
    return null;
  } catch (error) {
    console.error('Error fetching invite by token:', error);
    throw error; // Handle error appropriately
  }
};

export const createInvite = async (inviteData: {
  hostName: string;
  inviteeName?: string;
  customMessage: string;
  eventDate: string;
  eventTime?: string;
  location?: string;
  template: string;
  userId: string
  inviteType:string
}) => {
  try {
    console.log(inviteData.userId);
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.invitesCollectionId,
      ID.unique(), 
      inviteData
    );
    console.log("Invitation successfully created:", response);
    return response;
  } catch (error) {
    console.error("Error creating invitation:", error);
    throw error; 
  }
};

export const getInvitesByUserId = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.invitesCollectionId,
      [Query.equal('userId', userId)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching invites:', error);
    throw error;
  }
}

const getSpaceById = async (spaceId: string) => {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.spacesId,
      spaceId
    );

    return response;
  } catch (error) {
    console.error('Error fetching space by ID:', error);
    throw error;
  }
}

export const updateCollaborators = async (spaceId: string, email: string) => {
  const space = await getSpaceById(spaceId); 

  if (space.collaborators.includes(email)) {
    throw new Error('User already a collaborator');
  }

  const updatedCollaborators = [...space.collaborators, email];

  await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.spacesId,
    spaceId,
    {
      collaborators: updatedCollaborators,
    }
  );
};

export const getInviteByDocumentId = async (documentId: string) => {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.invitesCollectionId,
      documentId
    );

    return response;
  } catch (error) {
    console.error('Error fetching invite by document ID:', error);
    throw error;
  }
}

export const getVideosBySpaceId = async (spaceId: string) => {
  try {
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [
      Query.equal('spaceId', spaceId) 
    ]);
    return response.documents;
  } catch (error) {
    console.error(`Error fetching videos: ${error}`);
    throw error; 
  }
};


export const deleteSpace = async (spaceId: string) => {
  try {
    const videos = await getVideosBySpaceId(spaceId); // Ensure function name matches

    if (videos && videos.length >= 0) {
      await Promise.all(videos.map(video => {
        const videoId = video.$id; 
        return databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.videoCollectionId,
          videoId
        );
      }));
    }

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.spacesId,
      spaceId
    );

    return { success: true };
  } catch (error) {
    console.error('Error deleting space:', error);
    throw new Error('Could not delete space. Please try again later.');
  }
};




export { ID } from 'appwrite';
export { OAuthProvider } 