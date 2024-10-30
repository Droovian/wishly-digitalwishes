// Letter.tsx
"use client"
import { InvitationDetail } from "@/lib/data";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { addToRsvpList } from "@/appwrite/appwrite";
import { mouseUpEvent, Opacity } from "@tsparticles/engine";
import { PartyPopper, X } from "lucide-react";
import { MouseEventHandler } from "react";
import BirthdayInvite from "./templates/birthday";
import ValentineInvite from "./templates/valentines";
import PartyInvite from "./templates/party";
interface LetterProps {
  invitation: InvitationDetail;
  isOpen: boolean;
  inviteId:string;
  inviteType:string 
}

const InviteComponent = ({ inviteType, invitation, inviteId, isOpen }:LetterProps) => {
  let InviteToRender;

  switch (inviteType) {
    case "date":
      InviteToRender = (
        <ValentineInvite invitation={invitation} isOpen={isOpen} inviteId={inviteId} />
      );
      break;
    case "birthday":
      InviteToRender = (
        <BirthdayInvite invitation={invitation} isOpen={isOpen} inviteId={inviteId} />
      );
      break;
    case "houseparty":
      InviteToRender = (
        <PartyInvite invitation={invitation} isOpen={isOpen} inviteId={inviteId} />
      );
      break;
    default:
      InviteToRender = <div>Invalid invite type</div>; // Optional: handle unexpected types
  }

  return <div>{InviteToRender}</div>;
};

const CardRotation = 15;
const CardScale = 1.07;
const Letter: React.FC<LetterProps> = ({ invitation, isOpen,inviteId,inviteType }) => {
  const xPcnt = useSpring(0,{bounce:0})
  const yPcnt = useSpring(0,{bounce:0})
  const mouseX = useSpring(0,{bounce:0})
  const mouseY = useSpring(0,{bounce:0})
  const rotateX = useTransform(yPcnt,[-0.5,0.5],[`-${CardRotation}deg`,`${CardRotation}deg`])
  const rotateY = useTransform(xPcnt,[-0.5,0.5],[`-${CardRotation}deg`,`${CardRotation}deg`])
  const scale = useSpring(1,{bounce:0})
  const getMousePosition = (e:React.MouseEvent<Element, MouseEvent>) => {
    const {width,height,left,top} = 
    e.currentTarget.getBoundingClientRect();
    const currentMouseX = e.clientX - left
    const currentMouseY = e.clientY - top
    
    
       
    return{
      currentMouseX,
      currentMouseY,
      containerWidth:width,
      containerHeight:height,
    }
  }
  const handleMouse:MouseEventHandler = (e) =>{
      const {currentMouseX,currentMouseY,containerWidth,containerHeight} = getMousePosition(e)
      xPcnt.set(currentMouseX/containerWidth -0.5) 
      yPcnt.set(currentMouseX/containerHeight -0.5)
      mouseX.set(currentMouseX)
      mouseY.set(currentMouseY)

    }

  const handleMouseEnter :MouseEventHandler =(e) => {
    scale.set(CardScale)
  }
  const handleMouseLeave :MouseEventHandler =(e) => {
    scale.set(1)
    xPcnt.set(0)
    yPcnt.set(0)

  }

 
  return (<>
        <div className = "" onMouseMove={handleMouse}>
        <div >         
        <motion.div
          className=""
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: '100%', height: 'calc(100% - 20px)', transformStyle:'preserve-3d',
            rotateX,
            rotateY,
            scale  }} 
          // Maintain letter size
        >
          {/* <ValentineInvite invitation={invitation} isOpen={isOpen} inviteId={inviteId}/> */}
          {/* <BirthdayInvite invitation={invitation} isOpen={isOpen} inviteId={inviteId}/> */}
          {/* <PartyInvite invitation={invitation} isOpen={isOpen} inviteId={inviteId}/> */}
            <div>
            <InviteComponent invitation = {invitation} isOpen= {isOpen} inviteId = {inviteId} inviteType = {inviteType}/>
            </div>
        </motion.div>
      </div>
    </div>
        </>
             
  );
};

export default Letter;
