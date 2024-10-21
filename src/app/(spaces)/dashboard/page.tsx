"use client"

import React, { useState } from 'react'
import { Plus, Users, Video, Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Invitation {
  id: number;
  title: string;
  date: string;
}

interface VideoGroup {
  id: number;
  title: string;
  collaborators: number;
  videos: number;
}

const Dashboard: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: 1, title: "Birthday Party", date: "2024-05-15" },
    { id: 2, title: "Wedding Anniversary", date: "2024-06-20" },
  ])

  const [videoGroups, setVideoGroups] = useState<VideoGroup[]>([
    { id: 1, title: "Family Reunion Videos", collaborators: 3, videos: 5 },
    { id: 2, title: "Graduation Memories", collaborators: 2, videos: 8 },
  ])

  const [newCollaborator, setNewCollaborator] = useState<string>("")
  const [newVideoUrl, setNewVideoUrl] = useState<string>("")

  const addCollaborator = (groupId: number) => {
    // Logic to add collaborator
    console.log(`Adding collaborator ${newCollaborator} to group ${groupId}`)
    setNewCollaborator("")
  }

  const addVideo = (groupId: number) => {
    // Logic to add video
    console.log(`Adding video ${newVideoUrl} to group ${groupId}`)
    setNewVideoUrl("")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Digital Creations</h1>
      
      <Tabs defaultValue="invitations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="videoGroups">Video Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invitations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => (
              <Card key={invitation.id}>
                <CardHeader>
                  <CardTitle>{invitation.title}</CardTitle>
                  <CardDescription>Date: {invitation.date}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Send</Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex items-center justify-center">
              <Button variant="ghost"><Plus className="mr-2 h-4 w-4" /> Create New Invitation</Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="videoGroups">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                  <CardDescription>
                    {group.collaborators} collaborators · {group.videos} videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Add Collaborator</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Collaborator</DialogTitle>
                          <DialogDescription>
                            Enter the email of the person you'd like to invite to collaborate.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="collaborator" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="collaborator"
                              value={newCollaborator}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCollaborator(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={() => addCollaborator(group.id)}>Add Collaborator</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline"><Video className="mr-2 h-4 w-4" /> Add Video</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Video</DialogTitle>
                          <DialogDescription>
                            Enter the URL of the video you'd like to add to this group.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="video-url" className="text-right">
                              Video URL
                            </Label>
                            <Input
                              id="video-url"
                              value={newVideoUrl}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVideoUrl(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={() => addVideo(group.id)}>Add Video</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="flex items-center justify-center">
              <Button variant="ghost"><Plus className="mr-2 h-4 w-4" /> Create New Video Group</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard