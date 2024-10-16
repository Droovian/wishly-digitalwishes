"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BorderButton from './BorderButton'
import { loginWithGoogle, logoutUser, getUser } from '@/appwrite/appwrite';
const Navbar = () => {
    
  return (
    <div className='w-full h-20 bg-white border-b-1 border-gray-500'>
        <div className='flex items-center justify-between w-11/12 mx-auto h-full'>
            <p className='font-bold text-xl sm:text-3xl text-[#000000]'>Wishly</p>
            <div className='invisible sm:visible border rounded-xl p-3'>
                <ul className='flex font-bold text-gray-600 text-sm space-x-4 mx-10'>
                    <Link href={"/about"} className='hover:text-gray-800'>About us</Link>
                    <Link href={"/contact"} className='hover:text-gray-800'>Reach out</Link>
                </ul>
            </div>
            <div>
                <BorderButton text='Sign Up' onClick={() => {}} />
            </div>
        </div>
    </div>
  )
}

export default Navbar