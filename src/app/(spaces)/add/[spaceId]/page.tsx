"use client";

import React from "react";
import VideoUploadForm from "@/components/VideoForm";

export default function VideoUploadContainer({ params }: { params: { spaceId: string } }) {
  // Extract spaceId from route params
  const { spaceId } = params; // Fixing the extraction of spaceId

  if (!spaceId) {
    return <p className="text-center text-gray-500">No Space ID found</p>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Upload a Video</h2>
      {/* Pass spaceId to VideoUploadForm */}
      <VideoUploadForm spaceId={spaceId} />
    </div>
  );
};
