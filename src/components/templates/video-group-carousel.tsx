'use client';

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Confetti from 'react-confetti';
import { Play, Pause, X, MousePointerClick } from 'lucide-react'
import Cake from '@/public/images/cake-image.jpeg';
import Image from "next/image";
import AnimatedBirthdayCake from "../birthday-cake";
interface Video {
  id: string;
  video: string;
  title: string;
}

interface VideoGroupMessageProps {
  videos: Video[];
  details: any
}

export default function Component({ videos,details }: VideoGroupMessageProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [rotateCard, setRotateCard] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const controls = useAnimation();
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
  const cardMovement = {
    closed: { 
      opacity: 1,
      translateX: "0px",
      transition: { duration: 0.7 },
    },
    open: { 
      opacity: 1,
      translateX: "250px", // Adjust this value to control how far right it moves
      transition: { duration: 1.0, ease: "easeOut" },
    }
  }

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
    controls.start(rotateCard ? "closed" : "open");
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
  const bottomCardVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1, transition: { duration: 0.5 } }
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
              variants={cardMovement}
              >

                              <motion.div
                                className="relative left-5 z-20 border-2 border-black bg-amber-100 w-[420px] h-[520px] overflow-hidden"
                                variants={topCardVariants}
                                initial="closed"
                                animate={controls}
                                style={{ transformOrigin: "left center" }}
                                onClick={handleCardClick}
                                >
                                {rotateCard ? (
                                  <div className="h-full w-full p-8 flex flex-col items-center justify-center" style={{ transform: 'rotateY(180deg)' }}>
                                <p className="text-sm font-bold text-gray-800">
                                  {details?.customMessage}
                                </p>
                              </div>
                                  
                                ) : (
                                  <div className="relative h-full w-full p-8 flex flex-col items-center justify-center">
                                    {/* Subtle decorative line */}
                                    <motion.div 
                                      className="absolute top-6 left-8 right-8 h-px bg-black"
                                      initial={{ scaleX: 0 }}
                                      animate={{ scaleX: 1 }}
                                      transition={{ duration: 1, delay: 0.5 }}
                                    />

                                    {/* Main content */}
                                    <div className="relative flex flex-col items-center space-y-8 mt-3">
                                      <motion.div
                                        className="text-center space-y-3"
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                        >
                                        <h2 className="text-sm font-light tracking-widest mt-2 uppercase">
                                          Dear {details?.name}
                                        </h2>
                                        <h1 className="text-4xl font-serif text-gray-800">
                                        Happy Birthday!
                                        </h1>
                                      </motion.div>

                                      <AnimatedBirthdayCake />

                                      <motion.div
                                        className="absolute bottom-[-17px] flex space-x-5 text-sm"
                                        
                                        animate={{ 
                                          opacity: 1,
                                          y: [0, -10, 0],
                                          scale: [1.1, 1.2, 1.1],
                                        }}
                                        transition={{ 
                                          duration: 1.5,
                                          repeat: Infinity,
                                          repeatType: "loop",
                                          ease: "easeInOut"
                                        }}
                                        >
                                        <MousePointerClick size={40} />
                                      </motion.div>
                                    </div>

                                    {/* Bottom decorative line */}
                                    <motion.div 
                                      className="absolute bottom-6 left-8 right-8 h-px bg-black"
                                      initial={{ scaleX: 0 }}
                                      animate={{ scaleX: 1 }}
                                      transition={{ duration: 1, delay: 0.5 }}
                                      />
                                  </div>
                                )}
                              </motion.div>
             
                            <motion.div
                            className="absolute top-0 z-10 border-2 border-black bg-amber-100 w-[420px] h-[520px] flex flex-col items-center justify-center p-4"
                            variants={bottomCardVariants} // Use the new variants for the bottom card
                            initial="initial"
                            animate="animate" // Ensure it remains static
                            style={{ translateX: "20px" }}
                            >
                            
                                <p className="text-sm font-light">Click the video</p>
                                <div className="grid grid-cols-2 w-full h-full overflow-y-auto">
                                  {videos.map((video, index) => (
                                    <motion.div
                                    key={video.id}
                                    className="relative p-2 rounded-md shadow-lg cursor-pointer bg-white hover:shadow-lg transition-shadow duration-300"
                                    whileHover={{
                                      scale: 1.05,
                                      rotateX: 10,
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
                                          src={video.video}
                                          className="absolute inset-0 w-full h-full object-cover"
                                          />
                                      </div>
                                      <p className="font-light italic text-xs text-center mt-2 text-gray-700">{video.title}</p>
                                    </motion.div>
                                  ))}
                                </div>
                            
                            </motion.div>

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
                      src={videos[currentVideoIndex].video}
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