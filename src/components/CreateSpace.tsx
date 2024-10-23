"use client";

import React, { useState } from "react";
import { createVideoSpace,getSpacesByCreatorId } from "@/appwrite/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Updated schema to include creator's name
const spaceSchema = z.object({
  name: z.string().min(5, { message: "Title must be at least 5 characters." }),
  createdBy: z.string().min(2, { message: "Name must be at least 2 characters." }),
  customMessage: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type SpaceFormData = z.infer<typeof spaceSchema>;

const CreateSpace = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<SpaceFormData>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
      createdBy: "",
      customMessage: "",
    },
  });


  const onSubmit = async (data: SpaceFormData) => {

    try {
      setLoading(true);
      const response = await createVideoSpace(data,user!.id);
      setLoading(false);
      router.push("/dashboard")
      console.log("Video space created:", response);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      toast.error("Error creating video space.");
    }
  };

  return (
    <Card className="w-3/4 sm:w-1/2">
      <ToastContainer
      position="top-center"
      autoClose={3000}
      />
      <CardHeader className="text-center">
        <CardTitle>Create your own video space!</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Space Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name your space</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter space name..." {...field} />
                  </FormControl>
                  <FormDescription>This will be the name of your space.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Creator's Name */}
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custom Message */}
            <FormField
              control={form.control}
              name="customMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your custom message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              Create a space
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateSpace;
