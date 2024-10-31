'use client';
import { motion } from "framer-motion";

const AnimatedBirthdayCake = () => {

  const candlePositions = [
    { x: 100, delay: 0 },
    { x: 120, delay: 0.1 },
    { x: 140, delay: 0.2 },
    { x: 160, delay: 0.3 },
    { x: 180, delay: 0.4 }
  ];

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
      <defs>
        <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffff00" />
          <stop offset="100%" stopColor="#ff9900" />
        </radialGradient>
        <linearGradient id="cakeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="frostingGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      <motion.ellipse
        cx="150"
        cy="250"
        rx="120"
        ry="20"
        fill="#f3f4f6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.g
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <rect x="50" y="180" width="200" height="60" fill="url(#cakeGradient)" rx="10" />

        <rect x="70" y="140" width="160" height="50" fill="url(#cakeGradient)" rx="8" />
  
        <rect x="90" y="100" width="120" height="50" fill="url(#cakeGradient)" rx="6" />
      </motion.g>

      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <path
          d="M50,180 Q75,170 100,180 Q125,170 150,180 Q175,170 200,180 Q225,170 250,180"
          stroke="url(#frostingGradient)"
          strokeWidth="10"
          fill="none"
        />

        <path
          d="M70,140 Q95,130 120,140 Q145,130 170,140 Q195,130 230,140"
          stroke="url(#frostingGradient)"
          strokeWidth="8"
          fill="none"
        />

        <path
          d="M90,100 Q115,90 150,100 Q185,90 210,100"
          stroke="url(#frostingGradient)"
          strokeWidth="6"
          fill="none"
        />
      </motion.g>

      {Array.from({ length: 30 }).map((_, i) => (
        <motion.circle
          key={`sprinkle-${i}`}
          // Adjusted x range to stay within cake bounds
          cx={90 + Math.random() * 120}
          // Adjusted y range to stay within cake layers
          cy={120 + Math.random() * 100}
          r="2"
          fill={['#60a5fa', '#34d399', '#f472b6', '#fbbf24'][Math.floor(Math.random() * 4)]}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + Math.random() * 0.5 }}
        />
      ))}

      {/* Candles and flames - repositioned to be on top of the cake */}
      {candlePositions.map((pos, i) => (
        <motion.g
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 + pos.delay }}
        >
          {/* Candle */}
          <rect x={pos.x} y="80" width="4" height="30" fill="#60a5fa" />
          
          {/* Flame */}
          <motion.path
            d={`M${pos.x + 2} 80 Q${pos.x + 4} 70 ${pos.x + 6} 80 Q${pos.x + 8} 90 ${pos.x + 2} 95 Q${pos.x - 4} 90 ${pos.x - 2} 80 Q${pos.x} 70 ${pos.x + 2} 80`}
            fill="url(#flameGradient)"
            animate={{
              scale: [1, 1.2, 1],
              y: [0, -2, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 0.8 + i * 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Flame glow effect */}
          <motion.circle
            cx={pos.x + 2}
            cy="80"
            r="6"
            fill="url(#flameGradient)"
            opacity="0.3"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 1 + i * 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
};

export default AnimatedBirthdayCake;