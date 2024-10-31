'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

function DateBackground() {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number }[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (0-100%)
      size: Math.random() * 20 + 10 // Random size (10-30px)
    }))
    setHearts(initialHearts)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-pink-50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 to-purple-100/80" />
      
      {/* Animated hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/30"
          initial={{
            x: `${heart.x}vw`,
            y: '100vh',
            scale: heart.size / 20,
          }}
          animate={{
            y: '-20vh',
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: 'linear',
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

const colors1 = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7', '#55E6C1']

function PartyBackground() {
  const [discoLights, setDiscoLights] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([])

  useEffect(() => {
    // Create initial disco lights
    const initialLights = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (0-100%)
      y: Math.random() * 100, // Random y position (0-100%)
      size: Math.random() * 100 + 50, // Random size (50-150px)
      color: colors1[Math.floor(Math.random() * colors1.length)]
    }))
    setDiscoLights(initialLights)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-900">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
      
      {/* Disco lights */}
      {discoLights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute rounded-full"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: light.size,
            height: light.size,
            backgroundColor: light.color,
          }}
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glitter effect */}
      <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="a"%3E%3CfeTurbulence type="fractalNoise" baseFrequency=".005" numOctaves="2" /%3E%3CfeDisplacementMap in="SourceGraphic" scale="30" /%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23a)" opacity=".1" /%3E%3C/svg%3E")', backgroundSize: 'cover' }} />
    </div>
  )
}
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7', '#55E6C1']

function BirthdayBackground() {
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([])
  
  const balloons = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)]
  })), [])

  const poppers = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10
  })), [])

  useEffect(() => {
    const popperInterval = setInterval(() => {
      const popperIndex = Math.floor(Math.random() * poppers.length)
      const newConfettiFromPopper = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        x: poppers[popperIndex].x,
        y: poppers[popperIndex].y,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      setConfetti(prev => [...prev.slice(-40), ...newConfettiFromPopper])
    }, 2000)

    return () => clearInterval(popperInterval)
  }, [poppers])

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">      
    </div>
  )
}

interface BackgroundProps {
  inviteType: string; // Assuming inviteType is a string
}

export function Background({ inviteType }: BackgroundProps) {
  let InviteToRender;

  switch (inviteType) {
      case "date":
          InviteToRender = <DateBackground />;
          break;
      case "birthday":
          InviteToRender = <BirthdayBackground />;
          break;
      case "houseparty":
          InviteToRender = <PartyBackground />;
          break;
      default:
          InviteToRender = <div>Invalid invite type</div>; // Handle unexpected types
  }

  return <>{InviteToRender}</>; // Return the rendered component
}