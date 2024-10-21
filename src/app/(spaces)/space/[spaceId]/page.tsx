"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

const SpaceDetails = ({ params }: { params: { spaceId: string } }) => {
  const spaceId = params.spaceId;
  useEffect(() => {
    console.log(`Space ID: ${spaceId}`); 
  }, [spaceId]);

  return (
    <div>
      <h1>Space Details</h1>
      <p>Space ID: {spaceId}</p>
    </div>
  );
};

export default SpaceDetails;
