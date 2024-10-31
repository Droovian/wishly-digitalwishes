import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { InvitationDetail } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cake, PartyPopper, Music, GlassWater } from "lucide-react";
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
    }
  };

  const bottomCardVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1, transition: { duration: 0.5 } }
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

  return (
    <>
    <motion.div
    variants={cardMovement}
    >
      <motion.div
        className="relative z-20 border-2 border-black bg-amber-100 w-[420px] h-[520px] overflow-hidden"
        variants={topCardVariants}
        initial="closed"
        animate={controls}
        style={{ transformOrigin: "left center", translateX: "20px" }} // Adjusted to move to the right
        onClick={handleCardClick}
      >
        {/* Book Open/Close Content */}
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
              <motion.div
                className="text-center space-y-3"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                >
                
                <h2 className="text-4xl font-serif text-gray-800">
                  You are Invited to 
                </h2>
                <h2 className="text-4xl"> {invitation.hostName}  Birthday Party</h2>
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
        className="absolute top-0 left-0 z-10 border-2 border-black bg-amber-100 w-[420px] h-[520px] flex flex-col items-center justify-center p-4"
        variants={bottomCardVariants} // Use the new variants for the bottom card
        initial="initial"
        animate="animate" // Ensure it remains static
        style={{ translateX: "20px" }} // Adjusted to move to the right
        >
       
        <div className=" gap-4 overflow-y-auto p-2">
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
              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-600 text-white">RSVP Now</Button>
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
    </>
  );
}
