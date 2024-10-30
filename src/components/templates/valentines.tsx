"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { InvitationDetail } from "@/lib/data";
import { addToRsvpList } from "@/appwrite/appwrite";

interface ValentineInviteProps {
  invitation: InvitationDetail;
  isOpen: boolean;
  inviteId: string;
}

const CardRotation = 15;
const CardScale = 1.07;
const sheenSize = 300;

export default function ValentineInvite({ invitation, isOpen, inviteId }: ValentineInviteProps) {
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [response, setResponse] = useState<"yes" | "no">("no");

  const xPcnt = useSpring(0, { bounce: 0 });
  const yPcnt = useSpring(0, { bounce: 0 });
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });
  const rotateX = useTransform(yPcnt, [-0.5, 0.5], [`${CardRotation}deg`, `-${CardRotation}deg`]);
  const rotateY = useTransform(xPcnt, [-0.5, 0.5], [`-${CardRotation}deg`, `${CardRotation}deg`]);
  const sheenX = useTransform(() => mouseX.get() - sheenSize / 2);
  const sheenY = useTransform(() => mouseY.get() - sheenSize / 2);
  const scale = useSpring(1, { bounce: 0 });

  const handleMouse = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;
    xPcnt.set(currentMouseX / width - 0.5);
    yPcnt.set(currentMouseY / height - 0.5);
    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter = () => scale.set(CardScale);
  const handleMouseLeave = () => {
    scale.set(1);
    xPcnt.set(0);
    yPcnt.set(0);
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[600px] h-[350px] cursor-pointer">
        <div className="flex h-full rounded-lg overflow-hidden shadow-lg bg-purple-300">
          {/* Left section with animated hearts */}
          <div className="relative flex-1 bg-purple-300">
            <div className="absolute inset-0 flex flex-1 justify-center items-center">
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
            </div>

            <div className="flex flex-col justify-center items-center p-4 h-full">
              <p className="text-sm text-gray-700">Dear {invitation.inviteeName},</p>
              <p className="text-xs text-gray-600 italic">{invitation.customMessage}</p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex-1 p-4 bg-white flex flex-col justify-center items-center">
            <motion.div
              className="relative w-full h-full flex justify-center items-center"
              onMouseMove={handleMouse}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d",
              }}
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
          </div>
        </div>
      </div>
    </div>
  );
}
