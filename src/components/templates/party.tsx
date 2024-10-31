'use client';

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cake, PartyPopper, Music, GlassWater } from "lucide-react";
import { addToRsvpList } from "@/appwrite/appwrite";
import { InvitationDetail } from "@/lib/data";

interface PartyInviteProps {
  invitation: InvitationDetail;
  isOpen: boolean;
  inviteId: string;
}

const AnimatedPartyIcon = () => (
  <motion.div className="relative w-32 h-32 mx-auto" initial="hidden" animate="visible">
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.5 }}
    >
      <PartyPopper className="w-full h-full text-purple-500" />
    </motion.div>
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      variants={{
        hidden: { opacity: 0, rotate: -180 },
        visible: { opacity: 1, rotate: 0 },
      }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <GlassWater className="w-1/2 h-1/2 text-pink-500" />
    </motion.div>
  </motion.div>
);

export default function PartyInvite({ invitation, isOpen, inviteId }: PartyInviteProps) {
  const [rotateCard, setRotateCard] = useState<boolean>(false);
  const controls = useAnimation();
  const [name, setName] = useState("");
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);

  const handleCardClick = () => {
    setRotateCard(!rotateCard);
    controls.start(rotateCard ? "closed" : "open");
  };

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
    },
  };

  const bottomCardVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  const formattedEventDate = new Date(invitation.eventDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedEventTime = new Date(invitation.eventTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
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

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name to RSVP.");
      return;
    }

    try {
      await addToRsvpList(inviteId, name);
      setIsRsvpSubmitted(true);
      alert(`Thank you for your RSVP, ${name}!`);
    } catch (error) {
      alert("Error submitting RSVP. Please try again.");
      console.error("RSVP error:", error);
    }
  };

  return (
    <motion.div className="flex flex-col items-center justify-center"
      variants={cardMovement}>
      <motion.div
        className="relative z-20 border-2 border-black bg-gradient-to-br from-purple-400 to-pink-500 w-[420px] h-[520px] overflow-hidden"
        variants={topCardVariants}
        initial="closed"
        animate={controls}
        onClick={handleCardClick}
        style={{ transformOrigin: "left center", translateX: "20px" }}
      >
        {rotateCard ? (
          <h1 className="text-4xl font-bold text-gray-800"> {/* Add content for when the card is open */}</h1>
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
              <motion.div className="text-center space-y-3" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <h2 className="text-4xl font-serif text-white">Join the Party!</h2>
                <h2 className="text-4xl font-bold text-white">{invitation.hostName}'s Celebration</h2>
              </motion.div>

              <AnimatedPartyIcon />

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
                  ease: "easeInOut",
                }}
              />
            </div>

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
        className="absolute top-0 z-10 border-2 border-black bg-white w-[420px] h-[520px] flex flex-col items-center justify-center p-4"
        variants={bottomCardVariants}
        initial="initial"
        animate="animate"
        style={{ translateX: "20px" }}
      >
        <div className="gap-4 overflow-y-auto p-2">
          <div className="text-center space-y-4">
            <motion.h2 className="text-3xl font-bold text-gray-800">You're Invited!</motion.h2>
            <motion.div className="text-lg text-gray-600">{invitation.customMessage}</motion.div>
            <motion.div className="text-gray-700">
              <p className="font-semibold">{formattedEventDate}</p>
              <p>{formattedEventTime}</p>
              <a href={`https://www.google.com/maps/place/${encodeURIComponent(invitation.location)}`} rel="noopener noreferrer" target="_blank">
                {invitation.location}
              </a>
            </motion.div>

            {!isRsvpSubmitted ? (
              <motion.form onSubmit={handleRsvp} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="name" className="text-lg">
                    Your Name
                  </Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required className="mt-1" />
                </div>
                <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  RSVP Now
                </Button>
              </motion.form>
            ) : (
              <motion.div className="mt-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-green-600 font-semibold text-xl">Thank you for your RSVP, {name}!</p>
                <p className="text-gray-600 mt-2">We can't wait to see you at the party!</p>
                <PartyPopper className="w-16 h-16 text-purple-500 mx-auto mt-4" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
