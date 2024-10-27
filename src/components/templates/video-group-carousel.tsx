'use client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { OrbitControls, PerspectiveCamera, useTexture, Shadow, Text } from '@react-three/drei'
import * as THREE from 'three'

interface BookProps extends Omit<ThreeElements['group'], 'args'> {
  isOpen: boolean
}

const Book: React.FC<BookProps> = ({ isOpen, ...props }) => {
  const group = useRef<THREE.Group>(null)
  
  // Changed the rotation logic here - when isOpen is true, rotate to open position
  const { rotation } = useSpring({
    // When isOpen is true, rotate to Math.PI - 0.3 (open position)
    // When isOpen is false, rotate back to 0 (closed position)
    rotation: !isOpen ? Math.PI - 0.3 : 0,
    config: { mass: 1, tension: 50, friction: 20 }
  })

  return (
    <animated.group ref={group} {...props}>
      {/* Left half of the book (static) */}
      <mesh position={[-0.5, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.5, 0.01]} />
        <meshStandardMaterial
          color="#E3FDFD"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Right half of the book (animated) */}
      <animated.group rotation-y={rotation}>
        <mesh position={[0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1.5, 0.01]} />
          <meshStandardMaterial
            color="#E3FDFD"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </animated.group>

      {/* Book spine */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.01, 1.5, 0.03]} />
        <meshStandardMaterial
          color="#5C5C5C"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Shadow */}
      <Shadow
        position-y={-0.79}
        scale={[2, 2, 1]}
        color="black"
        opacity={0.3}
      />
    </animated.group>
  )
}

export default function SimpleBookCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-200 to-white">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 6} 
        />
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Book isOpen={isOpen} position={[0, 0, 0]} />
        <mesh rotation-x={-Math.PI / 2} position-y={-0.8} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </Canvas>
      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Button text now correctly reflects the current state */}
        {isOpen ? 'Close Book' : 'Open Book'}
      </button>
    </div>
  )
}