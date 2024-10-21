"use client"
import React, { useEffect, useState, useMemo } from 'react'; // Import useMemo
import { getSpacesByCreatorId } from '@/appwrite/appwrite'; 
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; 

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [spaces, setSpaces] = useState<any[]>([]);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchSpaces = async () => {
      if (!user) {
        console.log('Please log in to Wishly');
        setLoading(false);
        return;
      }

      try {
        const response = await getSpacesByCreatorId(user.id);
        if (response) {
          setSpaces(response);
          console.log(response[0].$id); 
        } else {
          setSpaces([]);
        }
      } catch (error) {
        console.error(`Encountered an error fetching spaces: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) fetchSpaces();
  }, [user, isLoaded]);

  const handleSpaceClick = (spaceId: string) => {
    router.push(`/space/${spaceId}`); 
  };

  
  const renderedSpaces = useMemo(() => {
    return spaces.map((space) => (
      <li key={space.$id} onClick={() => handleSpaceClick(space.$id)} style={{ cursor: 'pointer' }}>
        {space.name}
      </li>
    ));
  }, [spaces]); 

  return (
    <div>
      {loading ? (
        <p>Loading spaces...</p>
      ) : spaces.length > 0 ? (
        <ul>
          {renderedSpaces} 
        </ul>
      ) : (
        <p>No spaces found</p>
      )}
    </div>
  );
};

export default Dashboard;
