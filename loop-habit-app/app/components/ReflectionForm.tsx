"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "../lib/useLocalStorage";
import ConfettiAnimation from "./ConfettiAnimation";

type Props = {
  onReflected?: (args: { hadPhoto: boolean; photoUrl?: string }) => void;
};

export default function ReflectionForm({ onReflected }: Props) {
  const [text, setText] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasReflectedBefore, setHasReflectedBefore] = useLocalStorage<boolean>(
    "loop.hasReflectedBefore",
    false
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await res.json()) as { message: string };
      setResponse(data.message);
      let photoUrl: string | undefined;
      if (photoFile) {
        photoUrl = URL.createObjectURL(photoFile);
      }
      
      // Check if this is the first reflection
      if (!hasReflectedBefore) {
        setHasReflectedBefore(true);
        setShowConfetti(true);
      }
      
      onReflected?.({ hadPhoto: Boolean(photoFile), photoUrl });
      setText("");
      setPhotoFile(null);
    } catch (err) {
      setResponse("Something went wrong. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-6 shadow-lg"
    >
      <h3 className="text-gray-900 font-semibold text-lg mb-4">Today's Reflection ✨</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How did your habit go today? Share your thoughts..."
          className="w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm p-4 text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 min-h-32 transition-all"
        />
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">📸 Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-cyan-600 file:px-4 file:py-2 file:text-white file:font-medium file:cursor-pointer hover:file:from-blue-600 hover:file:to-cyan-700 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Reflecting...
              </span>
            ) : (
              "Submit Reflection 🚀"
            )}
          </motion.button>
          <span className="text-xs text-gray-600">Your note stays on your device.</span>
        </div>
      </form>
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 text-sm text-gray-800 border border-blue-200/50 shadow-sm"
          >
            <span className="font-medium">💭 Insight:</span> {response}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showConfetti && (
          <ConfettiAnimation onComplete={() => setShowConfetti(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}


