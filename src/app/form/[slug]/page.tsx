import InviteForm from "@/components/InvitationForm"
import Image from "next/image"
import BirthdayParty from '@/public/images/birthdaygroup.jpeg'
import HouseParty from "@/public/images/housepartynew.jpeg"
import Date from "@/public/images/datenew.jpeg"
import { Suspense } from "react"
import FormLoader from "@/components/skeletons/form-loader"

export default function Page({ params }: { params: { slug: string}}){

    let selectedImage;
    let inviteType = "houseparty";
    switch(params.slug){
        case "birthday": BirthdayParty;
        selectedImage = BirthdayParty;
        inviteType = "birthday"
        break;
        case "houseparty": HouseParty;
        selectedImage = HouseParty;
        inviteType = "houseparty"

        break;
        case "valentine": Date;
        selectedImage = Date;
        inviteType = "valentine"

        break;
        default: 
        selectedImage = HouseParty;
        inviteType = "houseparty"
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-12 md:grid-cols-2 dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
            <div className="hidden lg:flex gap-3">
                <Image 
                    src={selectedImage}
                    alt="birthday"
                    className="rounded-md"
                />
            </div>
            <Suspense fallback={<FormLoader/>}>
                <div className="">
                    <InviteForm inviteType = {inviteType}/>
                </div>
            </Suspense>
            
        </div>
    )
} 