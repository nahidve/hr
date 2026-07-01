import { motion } from "framer-motion";

export function MovingBorder({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          background: [
            "linear-gradient(45deg, #e2e8f0, #ffffff, #e2e8f0)",
            "linear-gradient(225deg, #e2e8f0, #ffffff, #e2e8f0)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[1px] rounded-xl opacity-30 blur-[1px]"
      />
      <div className="relative rounded-xl bg-white">{children}</div>
    </div>
  );
}