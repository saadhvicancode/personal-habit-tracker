"use client";

import { motion } from "framer-motion";

type HabitCardProps = {
  name: string;
  streakDays: number;
  targetDays?: number;
  index?: number;
};

const EMOJI_MAP: Record<string, string> = {
  "Morning Run": "💪",
  "Read 20 Minutes": "📚",
  "Mindful Journaling": "💤",
};

export default function HabitCard({ name, streakDays, targetDays = 30, index = 0 }: HabitCardProps) {
  const progress = Math.min(100, Math.round((streakDays / targetDays) * 100));
  // Calculate filled dots based on progress percentage (7 dots total)
  const miniDots = Math.min(7, Math.max(0, Math.round((progress / 100) * 7)));
  const emoji = EMOJI_MAP[name] || "✨";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg transition-all hover:shadow-xl hover:bg-white/70"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-gray-900 font-semibold">{name}</h3>
        </div>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {streakDays} 🔥
        </span>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gray-200/60 backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 shadow-md"
        />
      </div>
      <p className="mt-2 text-xs text-gray-600 font-medium">{progress}% toward {targetDays}-day goal</p>
      <div className="mt-4 flex items-center gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className={`h-2.5 w-2.5 rounded-full ${
              i < miniDots
                ? "bg-gradient-to-br from-blue-400 to-cyan-500 shadow-sm"
                : "bg-gray-300/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}


