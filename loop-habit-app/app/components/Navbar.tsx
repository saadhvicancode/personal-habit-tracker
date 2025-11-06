"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "../lib/useLocalStorage";
import AnimatedCoin from "./AnimatedCoin";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [coins] = useLocalStorage<number>("loop.coins", 100);

  const linkBase =
    "text-gray-700 hover:text-gray-900 transition-all px-3 py-2 rounded-lg hover:bg-white/50 font-medium";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full border-b border-white/30 bg-white/60 backdrop-blur-md sticky top-0 z-30 shadow-sm"
    >
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 text-xl tracking-wide">
          Loop
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`${linkBase} ${pathname === "/" ? "text-gray-900 bg-white/70" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`${linkBase} ${pathname?.startsWith("/dashboard") ? "text-gray-900 bg-white/70" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            href="/rewards"
            className={`${linkBase} ${pathname?.startsWith("/rewards") ? "text-gray-900 bg-white/70" : ""}`}
          >
            Rewards
          </Link>
        </nav>
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 border border-amber-200/50 shadow-sm">
          <AnimatedCoin coins={coins} />
        </div>
      </div>
    </motion.header>
  );
}


