import { motion } from "framer-motion";

export function HoverBorderGradient({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative cursor-pointer ${className}`}
    >
      <motion.div
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-30 blur-sm"
      />
      <div className="relative rounded-full border border-white/10 bg-black/30 px-3 py-1 text-white/80 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  );
}