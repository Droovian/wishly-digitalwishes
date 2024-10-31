import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, PartyPopper, Music } from "lucide-react";
import { InvitationDetail } from "@/lib/data";
import { addToRsvpList } from "@/appwrite/appwrite";

interface BirthdayInviteProps {
  invitation: InvitationDetail;
  isOpen: boolean;
  inviteId: string;
}

const AnimatedBirthdayCake = () => (
  <svg width="150" height="150" viewBox="0 0 200 200" className="mx-auto">
    <defs>
      <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#ffff00" />
        <stop offset="100%" stopColor="#ff9900" />
      </radialGradient>
    </defs>
    <rect x="40" y="100" width="120" height="80" fill="#f87171" rx="10" />
    <rect x="30" y="140" width="140" height="40" fill="#fbbf24" rx="10" />
    <path d="M40,100 Q70,80 100,100 Q130,80 160,100" stroke="#f472b6" strokeWidth="10" fill="none" />
    {[60, 100, 140].map((x, i) => (
      <g key={i}>
        <rect x={x} y="70" width="4" height="30" fill="#60a5fa" />
        <motion.path
          d={`M${x + 2} 70 Q${x + 4} 60 ${x + 6} 70 Q${x + 8} 80 ${x + 2} 85 Q${x - 4} 80 ${x - 2} 70 Q${x} 60 ${x + 2} 70`}
          fill="url(#flameGradient)"
          animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
          transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, repeatType: "reverse" }}
        />
      </g>
    ))}
  </svg>
);

export default function BirthdayInvite({ invitation, isOpen, inviteId }: BirthdayInviteProps) {
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
    month: "short",
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
<div className="flex flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl">
        <div className="flex-1 flex justify-center items-center bg-purple-300">
          <motion.div className="" variants={cardVariants} initial="hidden" animate="visible" >
            <AnimatedBirthdayCake />
            <motion.h2 className="text-3xl font-bold text-blue-600 text-center mt-4">Birthday Celebration!</motion.h2>
            <div className="flex justify-center space-x-4 mt-4">
              {[Gift, PartyPopper, Music].map((Icon, index) => (
                <motion.div key={index} variants={iconVariants} custom={index} whileHover="hover">
                  <Icon className="w-8 h-8 text-blue-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex-1 p-4 bg-white flex flex-col justify-center">
          <div className="text-center space-y-4">
            <motion.h2 className="text-3xl font-bold text-gray-800">You're Invited!</motion.h2>
            <motion.div className="text-lg text-gray-600">{invitation.customMessage}</motion.div>
            <motion.div className="text-gray-700">
              <p>{formattedEventDate}</p>
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
              <motion.form onSubmit={handleRsvp} className="mt-4 space-y-2">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <Button type="submit">RSVP</Button>
              </motion.form>
            ) : (
              <motion.div className="mt-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-green-600 font-semibold">Thank you for your RSVP, {name}!</p>
                <PartyPopper className="w-12 h-12 text-blue-500 mx-auto mt-4" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
  );
}
