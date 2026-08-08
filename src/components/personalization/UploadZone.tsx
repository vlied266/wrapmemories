"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A mock drag-and-drop upload zone. No file is actually read or sent
 * anywhere — dropping (or clicking) simply triggers the simulated
 * transformation in the parent section. Wire this up to a real upload +
 * generation API later.
 */
export function UploadZone({
  onTrigger,
  isProcessing,
}: {
  onTrigger: () => void;
  isProcessing: boolean;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <button
      type="button"
      disabled={isProcessing}
      onClick={onTrigger}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onTrigger();
      }}
      aria-label="Upload your favourite photo (demo — no file is actually uploaded)"
      className={cn(
        "group relative flex w-full flex-col items-center justify-center gap-4 rounded-[1.75rem] border-2 border-dashed px-6 py-16 text-center transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4",
        dragOver ? "border-coral bg-coral/5" : "border-charcoal/25 hover:border-charcoal/45",
        isProcessing && "cursor-progress opacity-70",
      )}
    >
      <motion.span
        animate={dragOver ? { scale: 1.1, rotate: -4 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal/5 text-charcoal/60"
        aria-hidden
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 16V4M12 4 7 9M12 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.span>

      <span className="font-display text-xl text-charcoal sm:text-2xl">
        {isProcessing ? "Wrapping your memory…" : "Drop your favourite photo here"}
      </span>
      <span className="text-sm text-charcoal/50">or click to try it with a sample photo</span>
    </button>
  );
}
