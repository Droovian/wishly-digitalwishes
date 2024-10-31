"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useAnimation, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Clock, MapPin, User } from "lucide-react";
import { InvitationDetail } from "@/lib/data";
import { addToRsvpList } from "@/appwrite/appwrite";

interface ValentineInviteProps {
  invitation: InvitationDetail;
  isOpen: boolean;
  inviteId: string;
}

export default function ValentineInvite({ invitation, isOpen, inviteId }: ValentineInviteProps) {
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [response, setResponse] = useState<"yes" | "no" | null>(null);
  const scale = useSpring(1, { bounce: 0 });
  const [rotateCard, setRotateCard] = useState<boolean>(false);
  const controls = useAnimation();

  const topCardVariants = {
    closed: { 
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.7 },
    },
    open: { 
      rotateY: -180,
      opacity: 1,
      transition: { duration: 1.0, ease: "easeOut" },
    }
  };

  const handleCardClick = () => {
    setRotateCard(!rotateCard);
    controls.start(rotateCard ? "closed" : "open");
  };

  const bottomCardVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1, transition: { duration: 0.5 } }
  };

  const formattedEventDate = new Date(invitation.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedEventTime = new Date(invitation.eventTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleResponse = async (choice: "yes" | "no") => {
    setResponse(choice);
    setIsRsvpSubmitted(true);
  };

  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
            initial={{
              top: "100%",
              left: `${Math.random() * 100}%`,
              scale: 0,
            }}
            animate={{
              top: "-10%",
              scale: [0, 1, 0],
              transition: {
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              },
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div variants={{ closed: { opacity: 1 }, open: { opacity: 1, translateX: "250px" } }}>
      <motion.div
        className="relative z-20 border-4 border-pink-300 bg-gradient-to-br from-pink-100 to-red-100 w-[420px] h-[520px] overflow-hidden shadow-lg"
        variants={topCardVariants}
        initial="closed"
        animate={controls}
        style={{ transformOrigin: "left center", translateX: "20px" }}
        onClick={handleCardClick}
      >
        {rotateCard ? (
          <div className="h-full w-full p-8 flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-pink-100"
          style={{ transform: 'rotateY(180deg)' }}>
            <AnimatePresence>
              {response === null ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <h1 className="text-4xl font-bold text-red-600 mb-6">Will You Be My Valentine?</h1>
                  <div className="flex space-x-4">
                    <button 
                      className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                      onClick={() => handleResponse("yes")}
                    >
                      Yes
                    </button>
                    <button 
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-300"
                      onClick={() => handleResponse("no")}
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold mb-4 text-red-600">
                    {response === "yes" ? "Yay! Can't wait to see you!" : "🥺"}
                  </h2>
                  <p className="text-xl text-gray-700">
                    {response === "yes" ? "Thank you for accepting!" : ""}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative h-full w-full p-8 flex flex-col items-center justify-center">
            <motion.div 
              className="absolute top-6 left-8 right-8 h-px bg-pink-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <div className="relative flex flex-col items-center space-y-8 mt-3">
              <motion.div
                className="relative flex-1 bg-transparent w-full h-full"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="inset-0 flex flex-1 justify-center items-center"
                  animate={{
                    rotateY: 0,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ transformOrigin: "left center" }}
                >
                  <div className="relative h-full w-full flex flex-col items-center justify-center">
                    <p className="text-2xl font-serif text-red-600 mb-4">Dear {invitation.inviteeName},</p>
                    <p className="text-lg text-gray-700 italic text-center">Here's something special for you...</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div 
              className="absolute bottom-6 left-8 right-8 h-px bg-pink-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        )}
      </motion.div>
      
      <motion.div
        className="absolute top-0 left-0 z-10 border-4 border-pink-300 bg-gradient-to-br from-red-100 to-pink-100 w-[420px] h-[520px] flex flex-col p-8 shadow-lg"
        variants={bottomCardVariants}
        initial="initial"
        animate="animate"
        style={{ translateX: "20px" }}
      >
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" fill="currentColor" />
          <p className="text-lg text-gray-700 mb-6">{invitation.customMessage}</p>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2 text-red-400" />
              <p className="text-sm">{formattedEventDate}</p>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2 text-red-400" />
              <p className="text-sm">{formattedEventTime}</p>
            </div>
          </div>
          <div className="absolute flex bottom-5 left-5">
            <MapPin className="w-5 h-5 mr-2 text-red-400" />
            <a
              href={`https://www.google.com/maps/place/${encodeURIComponent(invitation.location)}`}
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-red-600 hover:underline"
            >
              {invitation.location}
            </a>
          </div>
          <div className="absolute flex bottom-5 right-5">
            <User className="w-5 h-5 mr-2 text-red-400" />
            <p className="text-sm text-red-600">From: {invitation.hostName}</p>
          </div>
        </div>
      </motion.div>
      
      {response === "yes" && <Confetti />}
      
      {response === "no" && (
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  );
}