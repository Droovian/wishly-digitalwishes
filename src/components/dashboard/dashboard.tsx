"use client";

import React, { useEffect, useState } from 'react'
import { createInviteDocument, generateInviteToken, getSpacesByCreatorId, createInviteLink, deleteSpace, getInvitesByUserId } from '@/appwrite/appwrite'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Plus, Mail, Copy, X, Trash } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useClipboard } from 'use-clipboard-copy'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Invitation = {
  $id: string;
  hostName: string;
  inviteeName: string;
  customMessage: string;
  eventDate: Date;
  eventTime?: Date;
  location: string;
  template: 'Modern' | 'Retro' | 'Comic';  
  userId: string;
};

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const clipboard = useClipboard()
  const [loading, setLoading] = useState(true)
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [videoGroups, setVideoGroups] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [linkType, setLinkType] = useState<string>('')  // To track which type of link is open
  const [currentLink, setCurrentLink] = useState<string>('')

  const formInviLink = (InviteId: string) => {
    const invitationLink = `http://localhost:3000/invites/${InviteId}`;
    setCurrentLink(invitationLink);
    setLinkType('invitation');
    setIsModalOpen(true);
  }

  const createCollabLink = async (groupId: string) => {
    const inviteToken = generateInviteToken()
    await createInviteDocument(groupId, inviteToken)
    const generatedInviteLink = createInviteLink(inviteToken, groupId)
    setCurrentLink(generatedInviteLink)
    setLinkType('collaboration');
    setIsModalOpen(true)
  }

  const fetchInvitations = async () => {
    if (!user) {
      toast('Log in to view invitations')
      return
    }
    try {
      const response: any = await getInvitesByUserId(user.id)
      if (response) {
        setInvitations(response)
      } else {
        setInvitations([])
      }
    } catch (error) {
      console.error(`Encountered an error fetching invitations: ${error}`)
    }
  }

  const copyToClipboard = () => {
    clipboard.copy(currentLink)
    toast.success(`${linkType === 'invitation' ? 'Invitation' : 'Collaboration'} link copied to clipboard!`)
  }

  const handleDeleteSpace = async (spaceId: string) => {
    if (window.confirm('Are you sure you want to delete this space?')) {
      try {
        await deleteSpace(spaceId);
        setVideoGroups(prevGroups => prevGroups.filter(group => group.$id !== spaceId));
        toast.success('Space deleted successfully!');
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete space.');
      }
    }
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      if (!user) {
        console.log('Please log in to Wishly')
        setLoading(false)
        return
      }
      const email = user?.primaryEmailAddress?.emailAddress || '';
      try {
        const response = await getSpacesByCreatorId(user.id, email)
        if (response) {
          setVideoGroups(response)
        } else {
          setVideoGroups([])
        }
      } catch (error) {
        console.error(`Encountered an error fetching spaces: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded) fetchSpaces()
  }, [user, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      console.log(user?.primaryEmailAddress?.emailAddress)
      fetchInvitations();
    }
  }, [user, isLoaded]);

  const handleSpaceClick = (spaceId:string)=>{
    router.push(`space/${spaceId}`)
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Digital Creations</h1>

      <ToastContainer 
        position='top-center'
        autoClose={5000}
        closeOnClick
      />

      <Tabs defaultValue="invitations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="videoGroups">Video Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="invitations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => (
              <Card key={invitation.$id}>
                <CardHeader>
                  <CardTitle>To: {invitation.hostName}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" onClick={() => formInviLink(invitation?.$id)}>
                    <Mail className="mr-2 h-4 w-4" /> Send
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex items-center justify-center">
              <Button variant="ghost"><Plus className="mr-2 h-4 w-4" /> Create New Invitation</Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videoGroups">
          {loading ? (
            <div className="text-center py-10">Loading video groups...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoGroups.length > 0 ? (
                videoGroups.map((group) => (
                  <Card key={group.$id}>
                    <CardHeader>
                      <CardTitle onClick={()=>{handleSpaceClick(group.$id)}} className='hover:cursor-pointer'>{group.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-3 items-center">
                        <Button variant="outline" onClick={() => createCollabLink(group.$id)}>
                          Create Collab Link
                        </Button>
                        <Button variant="outline" onClick={() => { router.push(`/space/${group.$id}`) }}>Add Video</Button> 
                        
                          <Trash onClick={()=> handleDeleteSpace(group.$id)} className="mr-2 h-4 w-4" /> 
                         
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div>No video groups found.</div>
              )}
              <Card className="flex items-center justify-center">
                <Button variant="ghost"
                onClick={() => router.push('/create')}
                ><Plus className="mr-2 h-4 w-4" /> Create New Video Group</Button>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{linkType === 'invitation' ? 'Invitation Link' : 'Collaboration Link'}</DialogTitle>
            <DialogDescription>
              Share this link with those you'd like to {linkType === 'invitation' ? 'invite' : 'collaborate'} with.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              value={currentLink}
              readOnly
              className="flex-1"
            />
            <Button onClick={copyToClipboard} className="shrink-0">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
          <Button onClick={() => setIsModalOpen(false)} variant="outline" className="mt-4">
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
