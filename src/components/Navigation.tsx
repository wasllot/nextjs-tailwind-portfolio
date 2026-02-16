"use client";

import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-40 border-b border-secondary/10 md:hidden">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-mono text-primary font-bold">RT</span>
          <button
            className="text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background z-30 px-6 py-8">
          <ul className="flex flex-col gap-6 text-xl font-mono">
            <li><a href="#about" className="text-primary" onClick={() => setIsOpen(false)}>About</a></li>
            <li><a href="#experience" className="text-primary" onClick={() => setIsOpen(false)}>Experience</a></li>
            <li><a href="#projects" className="text-primary" onClick={() => setIsOpen(false)}>Projects</a></li>
            <li><a href="#writing" className="text-primary" onClick={() => setIsOpen(false)}>Writing</a></li>
          </ul>
        </div>
      )}
    </>
  );
}
