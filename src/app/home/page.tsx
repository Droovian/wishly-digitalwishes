"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { OccasionCards } from '@/components/OccasionCards';
import { HeaderTextOccasion } from '@/components/OccasionHeader';

interface User {
  name: string;
  email: string;
}


const Home=  () => {

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  console.log(userId);
  
  
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      <h2 className="py-10 flex justify-center mx-auto text-xl md:text-5xl font-bold font-sans">
        <HeaderTextOccasion/>
      </h2>

      <div>
        <OccasionCards />
      </div>
    </div>
  );
};

export default Home;
