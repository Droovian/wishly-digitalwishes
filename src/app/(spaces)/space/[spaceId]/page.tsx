import VideoUploadForm from "@/components/VideoForm";

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
        <VideoUploadForm spaceId={spaceId} />
    </div>
  );
};


