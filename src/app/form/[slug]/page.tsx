import Image from "next/image"
import { Suspense } from "react"
import InviteForm from "@/components/InvitationForm"
import FormLoader from "@/components/skeletons/form-loader"
import BirthdayParty from '@/public/images/birthdaygroup.jpeg'
import Date from "@/public/images/datenew.jpeg"
import HouseParty from "@/public/images/housepartynew.jpeg" 

export default function Page({ params }: { params: { slug: string } }) {
  let selectedImage;
  let eventType;

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
                    <InviteForm/>
                </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}