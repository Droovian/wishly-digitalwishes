'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cake, PartyPopper, Music, GlassWater } from "lucide-react";
import { addToRsvpList } from "@/appwrite/appwrite";
import { InvitationDetail } from "@/lib/data";

interface PartyInviteProps {
  invitation:InvitationDetail;
  isOpen: boolean;
  inviteId: string;
}

const AnimatedPartyIcon = () => (
  <motion.div
    className="relative w-32 h-32 mx-auto"
    initial="hidden"
    animate="visible"
  >
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
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [name, setName] = useState("");

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } },
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)", transition: { type: "spring", damping: 10, stiffness: 100 } },
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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, type: "spring", stiffness: 200, damping: 10 },
    }),
    hover: { rotate: 360, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-purple-400 to-pink-500">
      <div className="flex-1 flex justify-center items-center p-8">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <AnimatedPartyIcon />
          <motion.h2 className="text-3xl font-bold text-white text-center mt-4">Party Invite</motion.h2>
          <div className="flex justify-center space-x-4 mt-4">
            {[Cake, Music, GlassWater].map((Icon, index) => (
              <motion.div key={index} variants={iconVariants} custom={index} whileHover="hover">
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 p-8 bg-white flex flex-col justify-center">
        <div className="text-center space-y-4">
          <motion.h2 className="text-3xl font-bold text-gray-800">You're Invited!</motion.h2>
          <motion.div className="text-lg text-gray-600">{invitation.customMessage}</motion.div>
          <motion.div className="text-gray-700">
            <p className="font-semibold">{formattedEventDate}</p>
            <p>{formattedEventTime}</p>
            <a
                href={`https://www.google.com/maps/place/${encodeURIComponent(invitation.location)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
              {invitation.location}
              </a>
          </motion.div>

          {!isRsvpSubmitted ? (
            <motion.form onSubmit={handleRsvp} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="name" className="text-lg">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">RSVP Now</Button>
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
    </div>
  );
}