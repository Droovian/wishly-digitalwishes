import { getInviteByDocumentId } from "@/appwrite/appwrite";
import BookInvitation from "@/components/invitations/BookInvitation";
import AnimatedEnvelope from "@/components/Envelope";
import { InvitationDetail } from "@/lib/data";
export default async function Invites({ params }: { params: { id: string } }) {

    const invite = await getInviteByDocumentId(params.id);
    
    
    if(!invite){
        return <div>
            <h1>Invite not found</h1>
        </div>
    }

    return (
        <div className="">
            <AnimatedEnvelope InviteID={params.id}/>
        </div>
    )
}