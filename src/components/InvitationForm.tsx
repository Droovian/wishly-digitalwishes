'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { createInvite } from "@/appwrite/appwrite"
const inviteSchema = z.object({
  hostName: z.string().min(2, { message: "Host name must be at least 2 characters." }),
  inviteeName: z.string().optional(),
  customMessage: z.string().min(10, { message: "Custom message must be at least 10 characters." }),
  eventDate: z.string().min(1, { message: "Event date is required." }),
  eventTime: z.string().optional(),
  location: z.string().optional(),
  template: z.string().min(1, { message: "Please select a template." }),
})

type InviteFormData = z.infer<typeof inviteSchema>
interface InviteType{
inviteType:string
}
export default function InviteForm({inviteType}:InviteType) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      hostName: "",
      inviteeName: "",
      customMessage: "",
      eventDate: "",
      template: "",
      location: "",
      eventTime: "",
    },
  })

  const onSubmit = async (data: InviteFormData) => {
    if(!user){
      toast.error("You must be logged in to create an invitation.")
      return
    }

    const inviteData = {
      ...data,
      userId: user.id,
      inviteType
    }

    try {
      setIsLoading(true);
      console.log("Form Data Submitted:", data)
      
      await createInvite(inviteData);
      toast.success("Invitation created successfully.")
      setIsLoading(false);
      form.reset()
      
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      toast.error("Error creating invitation.")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-full">
      <ToastContainer 
        position="top-center"
      />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
            <FormField
              control={form.control}
              name="hostName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormDescription>This will be displayed as the sender's name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inviteeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invitee's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipient's name (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Modern">Modern</SelectItem>
                      <SelectItem value="Retro">Retro</SelectItem>
                      <SelectItem value="Comic">Comic book</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the look and feel of your invite.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Time (optional)</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location or URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Generate Invitation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}