import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedTooltip({ items = [] }) {
  const [hovered, setHovered] = useState(null);

  if (!items || items.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {items.slice(0, 3).map((item, index) => (
        <div
          key={item.id || index}
          className="relative"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-xs text-white">
            {item.name?.[0] || "?"}
          </div>
          <AnimatePresence>
            {hovered === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-2 py-1 text-xs text-white"
              >
                {item.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}