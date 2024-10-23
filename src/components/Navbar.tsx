"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import BorderButton from './BorderButton'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
const Navbar = () => {

    const router = useRouter();

  return (
    <div className='w-full h-20 bg-white border-b-1 border-gray-500'>
        <div className='flex items-center justify-between w-11/12 mx-auto h-full'>
            <button onClick={() => {router.back()}} className='font-bold text-xl sm:text-3xl text-[#000000]'>Wishly</button>
            <div className='invisible sm:visible border rounded-xl p-3'>
                <ul className='flex font-bold text-gray-600 text-sm space-x-4 mx-10'>
                    <Link href={"/create"} className='hover:text-gray-800'>Start a space</Link>
                    <Link href={"/about"} className='hover:text-gray-800'>about</Link>
                </ul>
            </div>
            <div className="flex items-center">
                <SignedIn>
                    <SignOutButton redirectUrl='/' />
                </SignedIn>
                <SignedOut>
                <SignInButton>
                    <BorderButton text='Sign in' />
                </SignInButton>
                </SignedOut>
            </div>
        </div>
    </div>
  )
}

export default Navbar