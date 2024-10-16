import { Client, Account, OAuthProvider } from "appwrite";

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('670f8c83000b3c68feee') 

export const account = new Account(client);

  export const loginWithGoogle = async () => {
    try {
        await account.createOAuth2Session(
        OAuthProvider.Google,
        'http://localhost:3000/home',
        'http://localhost:3000/fail',
        ['email', 'profile', 'openid']
      )
    
    } catch (error) {
      console.error('OAuth login error:', error);
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

  export const getCurrentSession = async () => {
    try {
      const session = await account.getSession('current');
      console.log('Provider:', session.provider);
      console.log('Provider UID:', session.providerUid);
      console.log('Provider Access Token:', session.providerAccessToken);
      return session;
    } catch (error) {
      console.error("Error fetching session:", error);
      return null;
    }
  };

export { ID } from 'appwrite';
export { OAuthProvider } 