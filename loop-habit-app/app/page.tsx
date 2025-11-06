"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-16 min-h-[calc(100vh-80px)] flex items-center">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-md p-6 sm:p-12 shadow-2xl w-full"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 mb-4"
        >
          Loop
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-xl sm:text-2xl font-semibold text-gray-800"
        >
          Build better habits through reflection, not just streaks.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 sm:mt-6 text-gray-700 max-w-2xl leading-relaxed text-sm sm:text-base"
        >
          Each day, write a short note about how your habit went. Loop turns your
          reflections into gentle insights to help you stay consistent and kind to yourself.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-10"
        >
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
            >
              Start Reflecting 
            </motion.div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/40"
        >
          {/* <div className="text-center">
            <div className="text-3xl mb-2">✨</div>
            <div className="text-sm font-medium text-gray-700">Gentle Reflection</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💡</div>
            <div className="text-sm font-medium text-gray-700">AI Insights</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm font-medium text-gray-700">Habit Building</div>
          </div> */}
        </motion.div>
      </motion.section>
    </main>
  );
}
