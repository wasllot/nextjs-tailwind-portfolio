"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface LogoTickerProps {
  logos: { name: string; src?: string; svg?: string }[];
  isDark?: boolean;
}

export default function LogoTicker({ logos, isDark = true }: LogoTickerProps) {
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div className="relative overflow-hidden py-8">
      <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r z-10 ${
        isDark ? 'from-slate-950 to-transparent' : 'from-white to-transparent'
      }`} />
      <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l z-10 ${
        isDark ? 'from-slate-950 to-transparent' : 'from-white to-transparent'
      }`} />
      
      <motion.div
        className="flex gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className={`flex items-center justify-center min-w-[160px] h-20 transition-all duration-300 ${
              isDark 
                ? 'opacity-100 hover:opacity-100' 
                : 'opacity-90 hover:opacity-100'
            }`}
          >
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                className={`w-44 h-20 object-contain ${isDark ? 'brightness-0 invert' : ''}`}
              />
            ) : (
              <div
                className="w-44 h-20 flex items-center justify-center"
                dangerouslySetInnerHTML={{ 
                  __html: logo.svg?.replace(
                    'text-slate-400',
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  ) || ''
                }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
