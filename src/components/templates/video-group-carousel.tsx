"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Video {
  id: string
  url: string
  title: string
}

interface VideoGroupCarouselProps {
  videos: Video[]
}

export default function VideoGroupCarousel({ videos }: VideoGroupCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <CardContent className="p-6">
        <div className="relative aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <video
                src={videos[currentIndex].url}
                title={videos[currentIndex].title}
                className="w-full h-full object-cover rounded-lg"
                controls
                autoPlay
                loop
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="icon" onClick={prevVideo}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{videos[currentIndex].title}</h2>
            <p className="text-sm text-muted-foreground">
              Video {currentIndex + 1} of {videos.length}
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={nextVideo}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {videos.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
              initial={false}
              animate={{
                scale: index === currentIndex ? 1.5 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}