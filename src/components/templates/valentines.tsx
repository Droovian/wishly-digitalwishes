"use client";

import { useState } from "react";
import { motion, useSpring, useAnimation, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { InvitationDetail } from "@/lib/data";
import { addToRsvpList } from "@/appwrite/appwrite";

interface ValentineInviteProps {
  invitation: InvitationDetail;
  isOpen: boolean;
  inviteId: string;
}

export default function ValentineInvite({ invitation, isOpen, inviteId }: ValentineInviteProps) {
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [response, setResponse] = useState<"yes" | "no">("no");
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

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) {
      alert("Please select an option to RSVP.");
      return;
    }

    try {
      await addToRsvpList(inviteId, response);
      setIsRsvpSubmitted(true);
      alert(`Thank you for your response.`);
    } catch (error) {
      alert("Error submitting RSVP. Please try again.");
      console.error("RSVP error:", error);
    }
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

  return (
    <motion.div variants={{ closed: { opacity: 1 }, open: { opacity: 1, translateX: "250px" } }}>
      <motion.div
        className="relative z-20 border-2 border-black bg-amber-100 w-[420px] h-[520px] overflow-hidden"
        variants={topCardVariants}
        initial="closed"
        animate={controls}
        style={{ transformOrigin: "left center", translateX: "20px" }}
        onClick={handleCardClick}
      >
        {rotateCard ? (
          <h1 className="text-4xl font-bold text-gray-800"> {/* Content when card is open */}</h1>
        ) : (
          <div className="relative h-full w-full p-8 flex flex-col items-center justify-center">
            <motion.div 
              className="absolute top-6 left-8 right-8 h-px bg-black"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <div className="relative flex flex-col items-center space-y-8 mt-3">
              <motion.div
                className="relative flex-1 bg-purple-300"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="absolute inset-0 flex flex-1 justify-center items-center"
                  animate={{
                    rotateY: 0,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ transformOrigin: "left center" }}
                >
                  <div className="relative h-full w-full p-4 flex flex-col items-center justify-center">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-red-200"
                        initial={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          scale: Math.random() * 0.3 + 0.7,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: Math.random() * 3 + 2,
                          ease: "easeInOut",
                        }}
                      >
                        <Heart />
                      </motion.div>
                    ))}
                    <p className="text-sm text-gray-700">Dear {invitation.inviteeName},</p>
                    <p className="text-xs text-gray-600 italic">{invitation.customMessage}</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
      
      <motion.div
        className="absolute top-0 left-0 z-10 border-2 border-black bg-amber-100 w-[420px] h-[520px] flex flex-col items-center justify-center p-4"
        variants={bottomCardVariants}
        initial="initial"
        animate="animate"
        style={{ translateX: "20px" }}
      >
        <div className="text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-red-600">Be My Valentine</h2>
          <div className="pt-2 text-gray-700 text-sm">
            <p>{formattedEventDate}</p>
            <p>{formattedEventTime}</p>
            <a
              href={`https://www.google.com/maps/place/${encodeURIComponent(invitation.location)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {invitation.location}
            </a>
            <p>From: {invitation.hostName}</p>
          </div>

          <AnimatePresence>
            {!isRsvpSubmitted ? (
              <motion.div
                className="mt-4 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="flex justify-center space-x-4 text-sm">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-red-500 h-4 w-4"
                      name="rsvp"
                      value="yes"
                      onChange={() => setResponse("yes")}
                    />
                    <span className="ml-2 text-red-600">Yes, I'd love to!</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-gray-500 h-4 w-4"
                      name="rsvp"
                      value="no"
                      onChange={() => setResponse("no")}
                    />
                    <span className="ml-2 text-gray-600">No, I can't make it</span>
                  </label>
                </div>
                <button
                  onClick={handleRsvp}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-full transition duration-300 w-1/2 text-sm"
                >
                  Send RSVP
                </button>
              </motion.div>
            ) : (
              <motion.p
                className="text-green-600 font-semibold mt-2 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                Thank you for your RSVP!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
