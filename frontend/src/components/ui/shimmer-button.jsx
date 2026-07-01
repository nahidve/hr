import { motion } from "framer-motion";

export function ShimmerButton({ children, className = "", ...props }) {
  return (
    <button
      className={`relative overflow-hidden bg-slate-900 px-4 py-2 text-sm text-white transition-colors hover:bg-slate-800 disabled:opacity-50 ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </button>
  );
}