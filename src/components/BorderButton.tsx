import React from 'react'

type BorderButtonProps = {
    text: string
    onClick: () => void
}

const BorderButton = ({ text, onClick }: BorderButtonProps) => {
  return (
    <button className="p-[3px] relative" onClick={onClick}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-4 sm:px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            {text}
        </div>
    </button>
  )
}

export default BorderButton


