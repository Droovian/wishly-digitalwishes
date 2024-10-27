import React from 'react'
import { Suspense } from 'react'
import { OccasionCards } from '@/components/OccasionCards'
import { HeaderTextOccasion } from '@/components/OccasionHeader'
import { auth } from "@clerk/nextjs/server"
import HomeLoader from '@/components/skeletons/HomeLoader'
import { Sparkles } from 'lucide-react'

const Home = () => {
  const { userId }: any = auth()

  return (
    <Suspense fallback={<HomeLoader />}>
      <div className="min-h-screen w-full flex flex-col justify-start py-12 px-4 sm:px-6 lg:px-8 dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-red-950/[0.2]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Create Your Perfect</span>
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Invitation
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Choose from our selection of beautifully designed invitation templates. Customize and share in seconds!
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2 text-primary" />
              Select Your Occasion
            </h2>
            <div className=" p-10 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
              <OccasionCards />
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-base text-gray-500 dark:text-gray-300">
              Looking for more?
              <a href="/custom" className="font-medium text-primary hover:text-primary-dark transition duration-150 ease-in-out ml-1">
                Coming soon....
              </a>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Home