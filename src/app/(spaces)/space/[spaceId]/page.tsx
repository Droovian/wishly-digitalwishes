import VideoUploadForm from "@/components/VideoForm";
import { Suspense, useEffect, useState } from "react";
import FormLoader from "@/components/skeletons/form-loader";
import { getVideosBySpaceID } from "@/appwrite/appwrite";
export default function SpaceDetails ({ params }: { params: { spaceId: string } }) {
  
  const spaceId = params.spaceId;
  const [videos,setVideos] = useState<any[]>([])
  const [message,setMessage] = useState("")
  if(!spaceId) {
    return (
      <div className='p-5 flex justify-center items-center'>
          <h1>Space not found</h1>
      </div>
    );
  }
  const fetchVideosBySpaceId = async() => {
    try {
      const response = await getVideosBySpaceID(spaceId);
      if (response && response.length!=0) {
        setVideos(response)
      } else {
        console.log("please add videos ")
        setVideos([])
        setMessage("No videos have been added as of yet, click on the Add button to upload videos to the space")
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchVideosBySpaceId();
  },[videos])

  return (
    <div className='p-5 flex justify-center items-center'>
      <Suspense fallback={<FormLoader/>}>
        <VideoUploadForm spaceId={spaceId} />
      </Suspense>
    </div>
  );
};


