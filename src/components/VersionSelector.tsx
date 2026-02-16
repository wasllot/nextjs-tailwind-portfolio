"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const versions = [
  { id: "v1", label: "v1", year: "2014", desc: "HTML, CSS, Bootstrap, jQuery" },
  { id: "v2", label: "v2", year: "2016", desc: "Jekyll, Handlebars, SCSS" },
  { id: "v3", label: "v3", year: "2017", desc: "React, Gatsby, Styled Components" },
  { id: "v4", label: "v4", year: "2019", desc: "Gatsby, React, Netlify" },
  { id: "current", label: "Current", year: "2024", desc: "Next.js, Tailwind, TypeScript" },
];

export default function VersionSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 w-72 rounded-lg border border-primary/20 bg-background/95 backdrop-blur-md p-4 shadow-2xl"
          >
            <p className="mb-3 font-mono text-xs text-primary">Reinaldo Tineo</p>
            <div className="flex flex-col gap-2">
              {versions.map((version) => (
                <a
                  key={version.id}
                  href={version.id === "current" ? "/" : `/${version.id}`}
                  className="group flex items-center justify-between rounded-md p-2 transition-colors hover:bg-primary/10"
                >
                  <span className="font-mono text-sm text-foreground group-hover:text-primary">
                    {version.label}
                  </span>
                  <span className="text-xs text-secondary">{version.desc}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-background/80 text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-primary/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </motion.button>
    </div>
  );
}
