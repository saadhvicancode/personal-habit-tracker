"use client";

import { motion } from "framer-motion";

type InsightCardProps = {
  title: string;
  description: string;
  index?: number;
};

export default function InsightCard({ title, description, index = 0 }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg transition-all hover:shadow-xl hover:bg-white/70"
    >
      <h4 className="font-semibold text-gray-900 text-lg mb-2">{title}</h4>
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}


