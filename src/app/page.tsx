import { Landing } from "@/components/GridBackground";
import { auth, currentUser } from "@clerk/nextjs/server";
import { storeUserInDatabase } from "@/appwrite/appwrite";

export default async function Home() {

  const { userId }: any = auth();
  const user = await currentUser();

  const username = user?.username || '';
  const email = user?.emailAddresses[0]?.emailAddress || ""; 

  if (userId) {
    await storeUserInDatabase(userId, username, email);
  }

  return (
    <>
      <Landing />
    </>
  );
}
