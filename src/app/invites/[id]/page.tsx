import { getInviteByDocumentId } from "@/appwrite/appwrite";

export default async function Invites({ params }: { params: { id: string } }) {

    const invite = await getInviteByDocumentId(params.id);

    if(!invite){
        return <div>
            <h1>Invite not found</h1>
        </div>
    }

    

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <p>{invite.hostName}</p>
            <p>{invite.customMessage}</p>
        </div>
    )
}