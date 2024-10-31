import React from 'react'
import CreateSpace from '@/components/CreateSpace'
import { Suspense } from 'react'
import FormLoader from '@/components/skeletons/form-loader'
const CreateForm = () => {
  return (
    <div className='flex justify-center items-center w-full h-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]'>
      <Suspense fallback={<FormLoader/>}>
        <CreateSpace />
      </Suspense>
    </div>
  )
}

export default CreateForm