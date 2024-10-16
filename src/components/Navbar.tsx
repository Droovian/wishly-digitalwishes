"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import BorderButton from './BorderButton'
import { loginWithGoogle, logoutUser, getUser } from '@/appwrite/appwrite';
import { useGlobalContext } from '@/context/app-provider';
const Navbar = () => {

    const { user, setUser, isLogged, setIsLogged } = useGlobalContext()!;

    const handleLogout = async() => {
        await logoutUser();
        setIsLogged(false);
        setUser(null);
    }

  return (
    <div className='w-full h-20 bg-white border-b-1 border-gray-500'>
        <div className='flex items-center justify-between w-11/12 mx-auto h-full'>
            <Link href={"/"} className='font-bold text-xl sm:text-3xl text-[#000000]'>Wishly</Link>
            <div className='invisible sm:visible border rounded-xl p-3'>
                <ul className='flex font-bold text-gray-600 text-sm space-x-4 mx-10'>
                    <Link href={"/about"} className='hover:text-gray-800'>About us</Link>
                    <Link href={"/contact"} className='hover:text-gray-800'>Reach out</Link>
                </ul>
            </div>
            {
            !isLogged ? 
            <div>
                <BorderButton text='Sign Up' onClick={loginWithGoogle} />
            </div> : (
                
                 <BorderButton text='Logout' onClick={handleLogout} />

            )
            }
        </div>
    </div>
  )
}

export default Navbar