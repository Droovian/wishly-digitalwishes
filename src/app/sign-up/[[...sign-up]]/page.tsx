"use client";

import { SignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp afterSignOutUrl={"/"}
       />
    </div>
  );
}
