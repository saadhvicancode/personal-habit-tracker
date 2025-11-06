"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ConfettiAnimation({ onComplete }: { onComplete?: () => void }) {
  const [particles] = useState(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      delay: Math.random() * 0.5,
      color: ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"][
        Math.floor(Math.random() * 6)
      ],
    }));
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}%`,
            rotate: 0,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            y: `${particle.y + 110}%`,
            rotate: 360,
            scale: [0, 1, 0.8, 0],
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: particle.delay,
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            width: 12,
            height: 12,
            backgroundColor: particle.color,
            borderRadius: "50%",
            boxShadow: `0 0 8px ${particle.color}`,
          }}
        />
      ))}
      {/* Sparkle effect */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
            repeat: 1,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: "0 0 12px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
      {/* Celebration message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-6 shadow-2xl border border-white/40">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-5xl text-center mb-2"
          >
            🎉
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">
            First Reflection!
          </h3>
          <p className="text-sm text-gray-600 text-center">
            You're on your way to building better habits ✨
          </p>
        </div>
      </motion.div>
    </div>
  );
}

