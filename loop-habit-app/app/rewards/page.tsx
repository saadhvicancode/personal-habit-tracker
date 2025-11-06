"use client";

import { useLocalStorage } from "../lib/useLocalStorage";
import { motion } from "framer-motion";
import AnimatedCoin from "../components/AnimatedCoin";

type Reward = { title: string; cost: number; description?: string; emoji?: string };

const REWARDS: Reward[] = [
  { title: "1 Month Premium Access", cost: 200, description: "Unlock deeper insights for a month.", emoji: "⭐" },
  { title: "Health Brand Voucher", cost: 400, description: "Spend on wellness essentials.", emoji: "💊" },
  { title: "Personal Habit Coach ", cost: 500, description: "One session with a coach.", emoji: "🎓" },
];

export default function RewardsPage() {
  const [coins, setCoins] = useLocalStorage<number>("loop.coins", 100);

  function redeem(reward: Reward) {
    if (coins < reward.cost) return;
    setCoins(coins - reward.cost);
    alert(`Redeemed: ${reward.title}! (Mock)`);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 min-h-[calc(100vh-100px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Rewards 🎁</h1>
        {/* <div className="rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-3 border border-amber-200/50 shadow-sm"> */}
          {/* <AnimatedCoin coins={coins} /> */}
        {/* </div> */}
      </motion.div>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-6xl mx-auto">

        {REWARDS.map((r, i) => {
          const canRedeem = coins >= r.cost;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`rounded-2xl border ${
                canRedeem
                  ? "border-white/40 bg-white/60 backdrop-blur-md shadow-lg hover:shadow-xl"
                  : "border-gray-300/40 bg-gray-100/60 backdrop-blur-md shadow-md opacity-75"
              } p-6 transition-all w-full`}
            >
              <div className="text-4xl mb-3">{r.emoji}</div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">{r.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💰</span>
                <span className="text-lg font-semibold text-gray-700">{r.cost} coins</span>
              </div>
              {r.description && (
                <p className="mt-2 text-sm text-gray-600 mb-4">{r.description}</p>
              )}
              <motion.button
                onClick={() => redeem(r)}
                disabled={!canRedeem}
                whileHover={canRedeem ? { scale: 1.05 } : {}}
                whileTap={canRedeem ? { scale: 0.95 } : {}}
                className={`w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all ${
                  canRedeem
                    ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {canRedeem ? "Redeem Now 🎉" : "Not Enough Coins"}
              </motion.button>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}


