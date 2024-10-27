'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { UserButton, SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-800 transition-colors"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )

  return (
    <nav className="w-full h-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between w-11/12 mx-auto h-full">
        <button onClick={() => { router.back() }} className="font-bold text-xl sm:text-3xl text-black">
          Invicollab
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="border rounded-xl p-3">
            <ul className="flex font-bold text-gray-600 text-sm space-x-4">
              <NavLink href="/create">Create a wish</NavLink>
              <NavLink href="/about">About</NavLink>
            </ul>
          </div>
          <SignedIn>
            <SignOutButton>
                <Button variant="destructive">Sign out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>

        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                <NavLink href="/create">Start a space</NavLink>
                <NavLink href="/about">About</NavLink>
                <SignedIn>
                  <SignOutButton>
                    <Button variant="destructive" className="w-full">Sign out</Button>
                  </SignOutButton>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button className="w-full">Sign in</Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}