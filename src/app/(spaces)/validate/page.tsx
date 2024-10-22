"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getInviteByToken, updateCollaborators } from '@/appwrite/appwrite'; // Import the function to update collaborators
import { useUser } from '@clerk/nextjs';

export default function Validate() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const spaceId = searchParams.get('spaceId');
  const { user, isLoaded } = useUser();
  
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !spaceId) {
        setMessage('No token/spaceid provided.');
        return;
      }

      if (!isLoaded || !user) {
        // Wait until user data is loaded
        return;
      }

      try {
        const inviteData = await getInviteByToken(token);

        console.log('Invite data:', inviteData);
        
        if (!inviteData) {
          setMessage('Invalid invitation token.');
        } else {
          const currentTime = new Date();
          const expirationTime = new Date(inviteData.expiration);

          if (currentTime > expirationTime) {
            setMessage('This invitation link has expired.');
          } else {
            setMessage('Token is valid. Welcome!');
            // Add user email to collaborators array
             await updateCollaborators(spaceId, user.emailAddresses[0].emailAddress); // Assuming inviteData contains spaceId
            setMessage('You have been added as a collaborator!');
          }
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setMessage('Error verifying the invitation link.');
      }
    };

    verifyToken();
  }, [token, user, isLoaded]); // Add isLoaded to the dependency array

  // Render loading state
  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>Invite</h1>
      <p>{message}</p>
    </div>
  );
}
