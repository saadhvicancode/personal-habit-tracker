"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedCoinProps = {
  coins: number;
  className?: string;
};

export default function AnimatedCoin({ coins, className = "" }: AnimatedCoinProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCoins, setPrevCoins] = useState(coins);

  useEffect(() => {
    if (coins > prevCoins) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevCoins(coins);
  }, [coins, prevCoins]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl"
      >
        💰
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={coins}
          initial={{ scale: 0.5, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-semibold text-gray-900 text-base"
        >
          Coins: {coins}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

