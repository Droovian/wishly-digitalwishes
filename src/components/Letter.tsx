// Letter.tsx
import { InvitationDetail } from "@/lib/data";
import { motion } from "framer-motion";

interface LetterProps {
  invitation: InvitationDetail;
  isOpen: boolean;
}

const Letter: React.FC<LetterProps> = ({ invitation, isOpen }) => {
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
              </motion.div>
  );
};

export default Letter;
