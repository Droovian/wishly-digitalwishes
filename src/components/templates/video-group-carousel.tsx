"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Heart, 
  Gift, 
  PartyPopper, 
  Sparkles,
  Play,
  Pause
} from 'lucide-react'
import { Card } from "@/components/ui/card"

interface Video {
  id: string
  url: string
  title: string
  date?: string
}

interface PolaroidCollectionProps {
  videos: Video[]
  recipientName?: string
}

export default function PolaroidCollection({
  videos,
  recipientName = "Dearest Friend"
}: PolaroidCollectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length)
  }, [videos])

  // Handle video playback
  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === focusedIndex && isPlaying) {
          videoRef.play()
        } else {
          videoRef.pause()
          videoRef.currentTime = 0
        }
      }
    })
  }, [focusedIndex, isPlaying])

  const handleVideoToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  const containerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const polaroidVariants = {
    closed: { 
      y: 100, 
      opacity: 0,
      rotateX: 45
    },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotate: (i % 2 === 0 ? -2 : 2) + (Math.random() * 1 - 0.5),
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: i * 0.15
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-200 p-6">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateY: -20 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateY: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <Card 
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-none shadow-2xl cursor-pointer w-[400px] overflow-hidden"
              onClick={() => setIsOpen(true)}
            >
              <motion.div 
                className="p-12 text-center relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-4 left-4 w-24 h-24 border-t-2 border-l-2 border-white" />
                  <div className="absolute bottom-4 right-4 w-24 h-24 border-b-2 border-r-2 border-white" />
                </div>

                <div className="relative">
                  <BookOpen className="w-16 h-16 mx-auto mb-8 text-zinc-100" />
                  <motion.div 
                    className="absolute -top-2 -right-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </div>

                <div className="font-serif space-y-6 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <h2 className="text-2xl text-zinc-300 uppercase tracking-wider">Hey Shivam</h2>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Happy birthday</h1>
                    <h3 className="text-3xl italic text-zinc-200">for</h3>
                  </motion.div>
                  
                  <motion.p 
                    className="text-zinc-400 mt-8 text-lg flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Open to begin your journey...
                    <PartyPopper className="w-5 h-5 text-yellow-400" />
                  </motion.p>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[1600px]"
          >
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              className="flex flex-wrap justify-center gap-12 relative py-12"
            >
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  variants={polaroidVariants}
                  custom={index}
                  className={`transform-gpu cursor-pointer ${
                    index === focusedIndex ? 'z-10' : 'z-0'
                  }`}
                >
                  <motion.div
                    className="transition-all duration-500"
                    animate={{
                      scale: index === focusedIndex ? 1.05 : 1,
                      opacity: index === focusedIndex ? 1 : 0.85,
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => setFocusedIndex(index)}
                  >
                    {/* Polaroid Frame */}
                    <div className="bg-white p-6 pb-20 shadow-2xl w-[480px]">
                      {/* Video Container */}
                      <div className="aspect-[4/3] bg-black mb-4 relative overflow-hidden rounded-sm">
                        <video
                          ref={el => {
                            videoRefs.current[index] = el; // Assign the video element
                            return; // Explicitly return nothing
                          }}
                          src={video.url}
                          className="w-full h-full object-cover"
                          loop
                          muted={false}
                        />
                        {index === focusedIndex && (
                          <motion.button
                            className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg"
                            onClick={handleVideoToggle}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 text-zinc-800" />
                            ) : (
                              <Play className="w-6 h-6 text-zinc-800" />
                            )}
                          </motion.button>
                        )}
                      </div>
                      
                      {/* Polaroid Caption */}
                      <div className="absolute bottom-6 left-0 right-0 text-center font-serif">
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4 text-zinc-400" />
                          <p className="text-zinc-800 text-xl">{video.title}</p>
                          <Sparkles className="w-4 h-4 text-zinc-400" />
                        </div>
                        <p className="text-zinc-500 text-base mt-2">
                          {video.date || new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation Dots */}
            <div className="text-center font-serif text-zinc-600">
              <p className="text-lg mb-4 flex items-center justify-center gap-2">
                Click to focus...
              </p>
              <div className="flex justify-center gap-3 mt-2">
                {videos.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === focusedIndex ? 'bg-zinc-800' : 'bg-zinc-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setFocusedIndex(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}