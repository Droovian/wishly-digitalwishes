"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getInviteByToken, updateCollaborators } from '@/appwrite/appwrite'; // Import the function to update collaborators
import { useUser } from '@clerk/nextjs';
import VideoUploadForm from '@/components/VideoForm';
import { useRouter } from 'next/navigation';

export default function Validate() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const spaceId = searchParams.get('spaceId')!;
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [isCollaborator, setIsCollaborator] = useState(false); // State to track if the user is a collaborator

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !spaceId) {
        setMessage('No token/spaceId provided.');
        return;
      }

      if (!isLoaded || !user) {
        return;
      }

      try {
        const inviteData = await getInviteByToken(token);

        if (!inviteData) {
          setMessage('Invalid invitation token.');
        } else {
          const currentTime = new Date();
          const expirationTime = new Date(inviteData.expiration);

          if (currentTime > expirationTime) {
            setMessage('This invitation link has expired.');
          } else {
            setMessage('Token is valid. Welcome!');

            // Try to add the user as a collaborator
            try {
              await updateCollaborators(spaceId, user.emailAddresses[0].emailAddress);
              alert('You have been added as a collaborator!');
              router.push('/dashboard')
              setIsCollaborator(true); // Set collaborator state to true
            } catch (error: any) {
              if (error.message === 'User already a collaborator') {
                setIsCollaborator(true)
                alert('You are already a collaborator on this space.'); // Set specific message for this case
                router.push('/dashboard')
              } else {
                setMessage('Error adding you as a collaborator. Please try again.');
                router.push('/sign-in')
              }
            }
          }
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setMessage('Error verifying the invitation link.');
      }
    };

    verifyToken();
  }, [token, user, isLoaded]);

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className='flex justify-center items-center'>
      <h1>Please wait till we verify the entered token..</h1>
      {/* {isCollaborator && <VideoUploadForm spaceId={spaceId} />}  */}
    </div>
  );
}
