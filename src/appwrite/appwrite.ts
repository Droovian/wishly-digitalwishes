import { Client, Account, OAuthProvider } from "appwrite";

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('670f8c83000b3c68feee') 

export const account = new Account(client);

  export const loginWithGoogle = async () => {
    try {
      await account.createOAuth2Session(OAuthProvider.Google)
    } catch (error) {
      console.error(error)
    }
  }
  
  export const logoutUser = async () => {
    try {
      await account.deleteSession('current')
    } catch (error) {
      console.error(error)
    }
  }
  
  export const getUser = async () => {
    try {
      return await account.get()
    } catch (error) {
      console.error(error)
    }
  }

export { ID } from 'appwrite';
export { OAuthProvider } 