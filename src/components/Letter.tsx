// Letter.tsx
"use client"
import { InvitationDetail } from "@/lib/data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { addToRsvpList } from "@/appwrite/appwrite";

interface LetterProps {
  invitation: InvitationDetail;
  isOpen: boolean;
  inviteId:string
}


const Letter: React.FC<LetterProps> = ({ invitation, isOpen,inviteId }) => {

  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState<boolean>(false)
  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    };
  const [name1, setName] = useState("")
  const letterVariants = {
    closed: {
      y: 0,
      opacity: 0,
      scale: 0.8,
      z: -1,
    },
    open: {
      y: -180,
      opacity: 1,
      scale: 1.2, // Increase scale for a larger area
      z: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!name1.trim()) {
      alert("Please enter your name to RSVP.");
      return;
    }

    try {
      await addToRsvpList(inviteId, name1);
      setIsRsvpSubmitted(true);
      alert(`Thank you for your RSVP, ${name1}!`);
    } catch (error) {
      alert("Error submitting RSVP. Please try again.");
      console.error("RSVP error:", error);
    }
  };
  return (
    <motion.div
                className="bg-white rounded-lg p-10 shadow-lg"
                style={{ width: '100%', height: 'calc(100% - 20px)' }} // Maintain letter size
              >
                <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">You're Invited!</h2>
                <p className="text-lg text-gray-600">{invitation.customMessage}</p>
                <div className="pt-4 text-gray-700">
                  <p>{invitation.eventDate}</p>
                  <p>{invitation.eventTime}</p>
                  <p>{invitation.location}</p>
                </div>
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 italic">Please RSVP by December 1st</p>
                  </div>
                </div>
                {!isRsvpSubmitted ? (
                <form onSubmit={handleRsvp} onClick={handleFormClick} className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name1}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <Button type="submit">RSVP</Button>
                </form>
              ) : (
                <p className="text-green-600 font-semibold mt-4">Thank you for your RSVP!</p>
              )}
              </motion.div>
  );
};

export default Letter;
