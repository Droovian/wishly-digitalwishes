import React from 'react'
import VideoUploadForm from '@/components/VideoForm'

const Video = (spaceId:string) => {
  return (
    <div className='p-5 flex justify-center items-center'>
        <VideoUploadForm spaceId={spaceId} />
    </div>
  )
}

export default Video