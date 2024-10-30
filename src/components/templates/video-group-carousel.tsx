'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Confetti from 'react-confetti';
import { Play, Pause, X } from 'lucide-react'
import Cake from '@/public/images/cake-image.jpeg';
import Image from "next/image";
import AnimatedBirthdayCake from "../birthday-cake";
interface Video {
  id: string;
  url: string;
  title: string;
}

interface VideoGroupMessageProps {
  videos: Video[];
}

export default function Component({ videos }: VideoGroupMessageProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [rotateCard, setRotateCard] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const envelopeVariants = {
    visible: { opacity: 1, scale: 1 },
    fadeOut: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const topFlapVariants = {
    closed: { 
      rotateX: 0,
      y: 0,
      originY: 0,
      translateZ: 0,
      opacity: 1,
    },
    open: { 
      rotateX: -180,
      y: 0,
      originY: 0,
      translateZ: 10,
      opacity: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut"
      }
    }
  };

  const topCardVariants = {
    closed: { 
      rotateY: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.7 },
    },
    open: { 
      rotateY: -180,
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: "easeOut" },
    }
  };

  const letterVariants = {
    closed: { 
      y: 0,
      opacity: 0,
      scale: 0.8,
      z: -1,
    },
    open: { 
      y: -160,
      opacity: 1,
      scale: 1,
      z: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentVideoIndex !== null) {
        closeVideo();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [currentVideoIndex]);

  useEffect(() => {
    // Pause all videos when modal is closed
    if (currentVideoIndex === null) {
      videoRefs.current.forEach(video => {
        if (video) video.pause();
      });
      setPlayingVideos(new Set());
    }
  }, [currentVideoIndex]);
  
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  const handleCardClick = () => {
    setRotateCard(!rotateCard);
  };

  const handleVideoToggle = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideos(prev => new Set(prev).add(index));
      } else {
        video.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }
    }
  };

  const closeVideo = () => {
    if (currentVideoIndex !== null) {
      const video = videoRefs.current[currentVideoIndex];
      if (video) {
        video.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(currentVideoIndex);
          return newSet;
        });
      }
    }
    setCurrentVideoIndex(null);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeVideo();
    }
  };

  return (
    <div className="flex justify-center items-center">
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={200}
          colors={['#FF69B4', '#FF1493', '#C71585', '#DB7093']}
        />
      )}
      <div className="relative">
        <motion.div
          initial={{ x: -1000, scale: 1 }}
          animate={{
            x: 0,
            scale: 1.2,
            rotate: 360,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            delay: 0.5
          }}
          className="relative"
        >
          <motion.div
            className="relative w-[600px] h-[350px] cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              variants={envelopeVariants}
              initial="visible"
              animate={isOpen ? "fadeOut" : "visible"}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-xl" />
              <div className="absolute left-0 top-0 w-[300px] h-[350px]" style={{
                background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                clipPath: 'polygon(0 0, 0% 100%, 100% 50%)'
              }} />
              <div className="absolute right-0 top-0 w-[300px] h-[350px]" style={{
                background: 'linear-gradient(225deg, #4a5568 0%, #2d3748 100%)',
                clipPath: 'polygon(100% 0, 100% 100%, 0% 50%)'
              }} />
              <motion.div
                className="absolute top-0 left-0 w-full z-50 h-[350px]"
                variants={topFlapVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                style={{
                  background: 'linear-gradient(to bottom, #4a5568 0%, #2d3748 100%)',
                  clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                  transformStyle: 'preserve-3d',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-lg" />
              <div className="absolute inset-0 border border-gray-600/30 rounded-lg pointer-events-none" />
            </motion.div>

            <motion.div
              variants={letterVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              className="flex justify-center items-center w-full" 
            >
              <motion.div
                className="z-20 bg-gradient-to-r from-orange-400 via-red-400 to-red-500 text-white w-[420px] h-[520px] flex justify-center items-center"
                variants={topCardVariants}
                initial="closed"
                animate={rotateCard ? "open" : "closed"}
                style={{ transformOrigin: "left center" }}
                onClick={handleCardClick}
              >
                {
                  rotateCard
                  ? <h1 className="text-4xl font-bold text-black">
                      
                    </h1>
                  : 
                  <>
                    <div className="flex flex-col">
                      <h1 className="text-4xl font-bold text-black">
                        Happy birthday!
                      </h1>

                      <AnimatedBirthdayCake />
                    </div>
                  </>
                }
                
              </motion.div>

              <motion.div
                className="z-1 border-l-2 overflow-hidden border-orange-800 bg-gradient-to-r from-orange-400 via-red-400 to-red-500 w-[420px] h-[520px] absolute flex flex-col items-center justify-center p-4"
              >
                  <p className="text-white text-sm font-light">Click the video</p>
                  <div className="grid grid-cols-2 gap-4 w-full h-full overflow-y-auto p-2">
                    {videos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        className="relative p-2 rounded-md shadow-lg cursor-pointer bg-white hover:shadow-lg transition-shadow duration-300"
                        whileHover={{
                          scale: 1.05,
                          rotateX: 10, // Adjust to control the tilt effect
                          rotateY: 10,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 20,
                        }}
                        onClick={() => setCurrentVideoIndex(index)}
                      >
                        <div className="relative w-full pb-[100%] rounded-lg overflow-hidden">
                          <video
                            ref={(el: HTMLVideoElement | null) => {
                              videoRefs.current[index] = el;
                            }}
                            src={video.url}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {/* <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVideoToggle(index);
                            }}
                            className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors duration-200"
                          >
                            {playingVideos.has(index) ? <Pause size={16} /> : <Play size={16} />}
                          </button> */}
                        </div>
                        <p className="font-light italic text-xs text-center mt-2 text-gray-700">{video.title}</p>
                      </motion.div>
                    ))}
                  </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {currentVideoIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 flex items-center justify-center z-50"
                onClick={handleClickOutside}
              >
                <motion.div
                  ref={modalRef}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl w-full m-4 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeVideo}
                    className="absolute -top-3 -right-3 bg-black hover:bg-gray-700 text-white p-2 rounded-full z-10 transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                    <video
                      ref={(el: HTMLVideoElement | null) => {
                        if (el && currentVideoIndex !== null) {
                          videoRefs.current[currentVideoIndex] = el;
                        }
                      }}
                      src={videos[currentVideoIndex].url}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                    />
                  </div>
                  
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">
                    {videos[currentVideoIndex].title}
                  </h3>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm"
          >
            {isOpen ? "" : "Click to open"}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}