"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "@/store/shop";

export function Toast() {
  const toast = useShop((s) => s.toast);
  const show = useShop((s) => s.showToast);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => show(null), 2200);
    return () => clearTimeout(t);
  }, [toast, show]);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center">
      <AnimatePresence>
        {toast && (
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="rounded-full bg-midnight px-5 py-2.5 text-sm text-pearl shadow-lg">{toast}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
