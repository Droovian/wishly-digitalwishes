'use client';
import { InvitationDetail } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";
import Confetti from 'react-confetti';
import drawShapes from "../components/templates/confetticonfig"; // Combined import
import Letter from "./Letter";

const Envelope: React.FC<{ invitation: InvitationDetail }> = ({ invitation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false); // State for letter visibility

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

  const shapeMap = {
    heart: drawShapes.drawHeart,
    smiley: drawShapes.drawSmiley,
    balloon: drawShapes.drawBalloon,
    default: drawShapes.drawDefaultShape,
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
  
  const handleClick = () => {
    if (!isOpen) {
      setLetterVisible(true); // Show the letter first
      setIsOpen(true);
      setShowConfetti(true);
      
      // Set a timeout to fade out the envelope after showing the letter
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      {showConfetti && <Confetti
        width={typeof window !== 'undefined' ? window.innerWidth : 300}
        height={typeof window !== 'undefined' ? window.innerHeight : 200}
        recycle={false}
        numberOfPieces={200}
        drawShape={shapeMap.heart} 
        colors={['#FF69B4', '#FF1493', '#C71585', '#DB7093']} />
      }
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
              {/* Base/Bottom of envelope */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-xl" />
              {/* Left Flap */}
              <div className="absolute left-0 top-0 w-[300px] h-[350px]" style={{
                background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                clipPath: 'polygon(0 0, 0% 100%, 100% 50%)'
              }} />
              {/* Right Flap */}
              <div className="absolute right-0 top-0 w-[300px] h-[350px]" style={{
                background: 'linear-gradient(225deg, #4a5568 0%, #2d3748 100%)',
                clipPath: 'polygon(100% 0, 100% 100%, 0% 50%)'
              }} />
              {/* Top Flap */}
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
              {/* Envelope shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-lg" />
              {/* Border for realism */}
              <div className="absolute inset-0 border border-gray-600/30 rounded-lg pointer-events-none" />
            </motion.div>

            {/* Letter Content */}
            <motion.div
              variants={letterVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              className="absolute top-10 left-10 right-10" // Fixed positioning to maintain size
            >
              <Letter invitation={invitation} isOpen = {isOpen} />
            </motion.div>
          </motion.div>

          {/* Interaction hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm"
          >
            {isOpen ? "Envelope opened" : "Click to open"}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default Envelope