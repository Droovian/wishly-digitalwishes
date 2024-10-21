import React from 'react'
import CreateSpace from '@/components/CreateSpace'

const CreateForm = () => {
  return (
    <div className='flex justify-center items-center h-screen dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]'>
        <CreateSpace />
    </div>
  )
}

export default CreateForm