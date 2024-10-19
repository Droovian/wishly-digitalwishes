import InviteForm from "@/components/InvitationForm"
import Image from "next/image"
import BirthdayParty from '@/public/images/birthdaygroup.jpeg'
import HouseParty from "@/public/images/housepartynew.jpeg"
import Date from "@/public/images/datenew.jpeg"

export default function Page({ params }: { params: { slug: string}}){

    let selectedImage;

    switch(params.slug){
        case "birthday": BirthdayParty;
        selectedImage = BirthdayParty;
        break;
        case "houseparty": HouseParty;
        selectedImage = HouseParty;
        break;
        case "date": Date;
        selectedImage = Date;
        break;
        default: 
        selectedImage = HouseParty;
    }

    return (
        <div className="grid grid-cols-1 p-5 sm:grid-cols-2 h-full w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
            <div className="hidden lg:flex">
                <Image 
                    src={selectedImage}
                    alt="birthday"
                    className="rounded-md"
                />
            </div>
            <div className="">
                <InviteForm/>
            </div>
            
        </div>
    )
} 