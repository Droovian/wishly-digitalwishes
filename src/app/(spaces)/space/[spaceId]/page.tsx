"use client";

import VideoUploadForm from "@/components/VideoForm";
import { Suspense, useEffect, useState } from "react";
import FormLoader from "@/components/skeletons/form-loader";
import VideoGroupMessage from "@/components/templates/video-group-carousel";
import { getVideosBySpaceID,getSpaceDetailsBySpaceId } from "@/appwrite/appwrite";
import { useUIContext } from "../../UiContext";

export default function SpaceDetails({ params }: { params: { spaceId: string } }) {
  const { setSidebarVisible } = useUIContext();
  const spaceId = params.spaceId;
  const [videos, setVideos] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Hide sidebar on mount and optionally reset visibility on unmount
  useEffect(() => {
    setSidebarVisible(false);  // Hide sidebar when this component loads

    return () => setSidebarVisible(true); // Show sidebar when this component unmounts
  }, [setSidebarVisible]);

  if (!spaceId) {
    return (
      <div className="p-5 flex justify-center items-center">
        <h1>Space not found</h1>
      </div>
    );
  }

  const fetchVideosBySpaceId = async () => {
    try {
      const response = await getVideosBySpaceID(spaceId);
      if (response && response.length !== 0) {
        setVideos(response);
        console.log(response,"videos")
      } else {
        console.log("Please add videos.");
        setVideos([]);
        setMessage(
          "No videos have been added as of yet, click on the Add button to upload videos to the space"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpaceDetails = async () => {
    setLoading(true); // Set loading state before fetching
    setError(null); // Reset error state
    try {
      const spaceDetails = await getSpaceDetailsBySpaceId(spaceId); // Call the Appwrite function
      setDetails(spaceDetails);
      console.log(spaceDetails,"new") // Set the retrieved details
    } catch (error) {
      setError('Failed to fetch space details'); // Handle error
      console.error(error); // Log the error for debugging
    } finally {
      setLoading(false); // Reset loading state after fetching
    }
  };
  useEffect(() => {
    fetchVideosBySpaceId();
    fetchSpaceDetails();
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <VideoGroupMessage videos={videos} details={details}/>
    </div>
  );
}
