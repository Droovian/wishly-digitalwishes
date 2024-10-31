import Image from "next/image";
import { Suspense } from "react";
import InviteForm from "@/components/InvitationForm";
import FormLoader from "@/components/skeletons/form-loader";
import BirthdayParty from '@/public/images/birthdaygroup.jpeg';
import Date from "@/public/images/datenew.jpeg";
import HouseParty from "@/public/images/housepartynew.jpeg"; 

export default function Page({ params }: { params: { slug: string } }) {
  let selectedImage;
  let eventType; // Declare eventType but set it appropriately in cases
  let inviteType: string = "default"; // Set a default value for inviteType

  switch (params.slug) {
    case "birthday":
      selectedImage = BirthdayParty;
      inviteType = "birthday";
      eventType = "Birthday"; // Set eventType
      break;
    case "houseparty":
      selectedImage = HouseParty;
      inviteType = "houseparty";
      eventType = "House Party"; // Set eventType
      break;
    case "date":
      selectedImage = Date;
      inviteType = "date";
      eventType = "Date"; // Set eventType
      break;
    default:
      selectedImage = HouseParty;
      inviteType = "houseparty"; // Assign a default value for inviteType
      eventType = "House Party"; // Set eventType
  }

  return (
    <div className="min-h-screen dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
          <div className="relative h-64 lg:h-auto">
            <Image 
              src={selectedImage}
              alt={`${eventType} invitation image`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
              loading="lazy"
            />
          </div>
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              Create Your Digital Invitation
            </h2>
            <Suspense fallback={<FormLoader />}>
              <InviteForm inviteType={inviteType} /> {/* This will now always have a value */}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
