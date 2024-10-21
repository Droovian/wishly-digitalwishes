'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "./FileUploader"; // Import your custom FileUploader component
import { uploadVideoWithThumbnail } from "@/appwrite/appwrite";
// Define schema for form validation using zod
const videoSchema = z.object({
  creatorId: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  video: z.instanceof(File).nullable().refine((file) => file instanceof File, {
    message: "Please upload a video file.",
  }),
});

type VideoFormData = z.infer<typeof videoSchema>;
interface VideoProps {
 spaceId:string ,
}

const VideoUploadForm: React.FC<VideoProps> = ({ spaceId }) =>  {

  const { userId } = useAuth();
  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      creatorId: "",
      title: "",
      video: undefined,
    },
  });

  // Handle form submission
  const onSubmit = async (data: VideoFormData) => {
    try {
      console.log("Form Data Submitted:", data);
      // TODO: Upload video and thumbnail to Appwrite storage here
      if (!userId) {
        console.error("User ID is required but is undefined");
        return; // or handle the error as needed
      }
      
      if(data.video && data.title){
        const response = await uploadVideoWithThumbnail(userId, data.title, data.video,spaceId); //fix this 
        console.log('Video data successfully stored in Appwrite:', response);
      }
      else{
        console.log('An error occured while uploading video');
        
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Custom handlers for file uploads using FileUploader
  const handleVideoUpload = (files: File[]) => {
    form.setValue("video", files[0] || null); // Set the first file as video
  };

  return (
    <Card className="w-3/4 sm:w-1/2">
      <CardHeader>
        <CardTitle>Create a custom video message</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Video Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video title" {...field} />
                  </FormControl>
                  <FormDescription>This will be the title of the video message.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video Upload using FileUploader */}
            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Video</FormLabel>
                  <FormControl>
                    <FileUploader onChange={handleVideoUpload} />
                  </FormControl>
                  <FormDescription>Upload a video message to send.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Upload Video Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default VideoUploadForm;