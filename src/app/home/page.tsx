"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, logoutUser } from '@/appwrite/appwrite';
import { useGlobalContext } from '@/context/app-provider';
import { account } from '@/appwrite/appwrite';
import { getCurrentSession } from '@/appwrite/appwrite';

interface User {
  name: string;
  email: string;
}


const Home=  () => {

  const { user, setUser, isLogged, setIsLogged } = useGlobalContext()!;

  console.log('user', user);
  
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      <h2 className="py-10 flex justify-center mx-auto text-xl md:text-5xl font-bold font-sans">
        {user && `Welcome, ${user.name}`}
      </h2>

    </div>
  );
};

export default Home;
