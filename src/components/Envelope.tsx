'use client';
import { InvitationDetail } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";
import Confetti from 'react-confetti';
import { custom } from "zod";
import drawShapes from "../components/templates/confetticonfig"; // Combined import
const Envelope: React.FC<{ invitation: InvitationDetail }> = ({ invitation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
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
      translateZ: 0, // No translation when closed
    },
    open: { 
      rotateX: -180,
      y: 0,
      originY: 0,
      translateZ: 10, // Add depth when opening
      transition: {
        duration: 1.0,
        ease: "easeOut"
      }
    }
  };
  const InviteData : InvitationDetail = {
    hostName :  invitation.hostName,
    inviteeName : invitation.inviteeName,
    eventDate : invitation.eventDate,
    eventTime : invitation.eventTime,
    customMessage : invitation.customMessage,
    location: invitation.location,
    template : invitation.template
  }
  const letterVariants = {
    closed: { 
      y: 0,
      opacity: 0,
      scale: 0.8,
      z: -1 // Ensure the card is behind the flap when closed
    },
    open: { 
      y: -160,
      opacity: 1,
      scale: 1,
      z: 1, // Bring the card to the front when open
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setShowConfetti(true);
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
       drawShape={shapeMap.heart} // Use the selected shape
       colors={['#FF69B4', '#FF1493', '#C71585', '#DB7093']} />}
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
        {/* Main Envelope Container */}
        <motion.div
          className="relative w-[600px] h-[350px] cursor-pointer"
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
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
              opacity: isOpen ? 0 : 1 // Fade out the top flap
            }}
          />

          {/* Letter Content */}
          <motion.div
            className="absolute top-0 z-20 left-[50px] right-[50px] bg-white rounded-lg p-8 shadow-lg"
            variants={letterVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">You're Invited!</h2>
              <p className="text-lg text-gray-600">
                {InviteData.customMessage}
              </p>
              <div className="pt-4">
                <p className="text-gray-700">
                  {InviteData.eventDate}<br />
                  {InviteData.eventTime}<br />
                  {InviteData.location}
                </p>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-500 italic">
                  Please RSVP by December 1st
                </p>
              </div>
            </div>
          </motion.div>

          {/* Envelope shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-lg" />
          
          {/* Border for realism */}
          <div className="absolute inset-0 border border-gray-600/30 rounded-lg pointer-events-none" />
        </motion.div>

        {/* Interaction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm"
        >
          {isOpen ? "Click to close" : "Click to open"}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Envelope