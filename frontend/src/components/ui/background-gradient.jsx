import { motion } from "framer-motion";

export function BackgroundGradient({
  children,
  className = "",
  containerClassName = "",
}) {
  return (
    <div className={`relative ${containerClassName}`}>
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #8B5CF6, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #06B6D4, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #8B5CF6, transparent 50%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className={`absolute inset-0 rounded-2xl opacity-20 ${className}`}
      />
      <div className={`relative ${className}`}>{children}</div>
    </div>
  );
}