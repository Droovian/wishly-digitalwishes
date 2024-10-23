import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { OccasionCards } from '@/components/OccasionCards';
import { HeaderTextOccasion } from '@/components/OccasionHeader';
import { auth, currentUser } from "@clerk/nextjs/server";
import HomeLoader from '@/components/skeletons/HomeLoader';
interface User {
  name: string;
  email: string;
}


const Home=  () => {

  const { userId }: any = auth();
 
  return (
    <Suspense fallback={<HomeLoader/>}>
    <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      <h2 className="py-10 flex justify-center mx-auto text-xl md:text-5xl font-bold font-sans">
        <HeaderTextOccasion/>
      </h2>

      <div>
        <OccasionCards />
      </div>
    </div>
    </Suspense>
  );
};

export default Home;
