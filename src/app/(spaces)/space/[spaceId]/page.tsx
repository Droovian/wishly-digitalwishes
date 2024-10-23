import VideoUploadForm from "@/components/VideoForm";
import { Suspense } from "react";
import FormLoader from "@/components/skeletons/form-loader";
export default function SpaceDetails ({ params }: { params: { spaceId: string } }) {
  
  const spaceId = params.spaceId;
  
  if(!spaceId) {
    return (
      <div className='p-5 flex justify-center items-center'>
          <h1>Space not found</h1>
      </div>
    );
  }
  
  return (
    <div className='p-5 flex justify-center items-center'>
      <Suspense fallback={<FormLoader/>}>
        <VideoUploadForm spaceId={spaceId} />
      </Suspense>
    </div>
  );
};


