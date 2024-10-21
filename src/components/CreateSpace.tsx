"use client";

import React from 'react'
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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const spaceSchema = z.object({
    spaceId: z.string(),
    name: z.string().min(5, { message: "Title must be at least 5 characters." }),
    creatorId: z.string(),
    customMessage: z.string().min(10, { message: "Message must be at least 10 characters." }),
  });
  
  type SpaceFormData = z.infer<typeof spaceSchema>;

const CreateSpace = () => {

  const form = useForm<SpaceFormData>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
        spaceId: "",
        name: "",
        creatorId: "",
        customMessage: "",
    },
  });

  const onSubmit = async (data: SpaceFormData) => {
    try {
      console.log("Form Data Submitted:", data);
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Card className="w-3/4 sm:w-1/2">
      <CardHeader className='text-center'>
        <CardTitle>Create your own video space!</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Video Title */}
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
            <Button type="submit" className="w-full">
              Create a space
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateSpace