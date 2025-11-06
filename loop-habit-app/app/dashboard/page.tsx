"use client";

import HabitCard from "../components/HabitCard";
import ReflectionForm from "../components/ReflectionForm";
import InsightCard from "../components/InsightCard";
import Link from "next/link";
import { useLocalStorage } from "../lib/useLocalStorage";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCoin from "../components/AnimatedCoin";

type Habit = { name: string; streakDays: number };

const DEFAULT_HABITS: Habit[] = [
  { name: "Morning Run", streakDays: 6 },
  { name: "Read 20 Minutes", streakDays: 14 },
  { name: "Mindful Journaling", streakDays: 4 },
];

export default function DashboardPage() {
  const [coins, setCoins] = useLocalStorage<number>("loop.coins", 100);
  const [habits, setHabits] = useLocalStorage<Habit[]>("loop.habits", DEFAULT_HABITS);
  const [currentStreak, setCurrentStreak] = useLocalStorage<number>("loop.currentStreak", 1);
  const [lastPhotoUrl, setLastPhotoUrl] = useState<string | undefined>();

  const metrics = useMemo(() => {
    const maxStreak = Math.max(...habits.map((h) => h.streakDays));
    return { weeklyCompletion: 82, currentStreak: Math.max(currentStreak, maxStreak), totalCoins: coins };
  }, [habits, coins, currentStreak]);

  function handleReflected({ hadPhoto, photoUrl }: { hadPhoto: boolean; photoUrl?: string }) {
    // Increment all habit streaks (mock logic)
    setHabits(habits.map((h) => ({ ...h, streakDays: h.streakDays + 1 })));
    setCurrentStreak((s) => s + 1);
    if (hadPhoto) {
      setCoins((c) => c + 10);
      if (photoUrl) setLastPhotoUrl(photoUrl);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Your Dashboard</h1>
          <p className="mt-2 text-gray-700">Build better habits through gentle reflection.</p>
        </div>
        {/* <div className="rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-3 border border-amber-200/50 shadow-sm">
          <AnimatedCoin coins={coins} />
        </div> */}
      </motion.div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {habits.map((h, i) => (
          <HabitCard key={h.name} name={h.name} streakDays={h.streakDays} index={i} />
        ))}
      </section>

      <section className="mt-8">
        <ReflectionForm onReflected={handleReflected} />
        {lastPhotoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-xs text-gray-600 bg-white/40 backdrop-blur-sm rounded-lg px-3 py-2 inline-block"
          >
            Last photo saved locally (mock): <span className="underline">{lastPhotoUrl}</span>
          </motion.div>
        )}
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <InsightCard
          title="Weekly Momentum"
          description="You showed up most on Tue/Thu. Protect those slots for quick wins."
          index={0}
        />
        <InsightCard
          title="Pattern Insight"
          description="Shorter sessions worked best on busy days. Aim for 10-minute minimums."
          index={1}
        />
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-2xl border border-white/40 bg-gradient-to-r from-blue-100/80 via-cyan-100/80 to-green-100/80 backdrop-blur-md p-6 shadow-lg"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/rewards"
            className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-blue-600 transition-colors"
          >
            Go to Rewards →
          </Link>
          <a
            href="#"
            className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 hover:from-blue-700 hover:via-cyan-700 hover:to-green-700 transition-all"
          >
            Upgrade to Premium for double rewards and advanced insights →
          </a>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 grid gap-4 sm:grid-cols-3"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg"
        >
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Weekly Reflection Completion</div>
          <div className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            {metrics.weeklyCompletion}%
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg"
        >
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Current Streak</div>
          <div className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            {metrics.currentStreak} 🔥
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg"
        >
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Coins</div>
          <div className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">
            {metrics.totalCoins} 💰
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}


