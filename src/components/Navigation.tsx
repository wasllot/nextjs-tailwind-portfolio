"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Switchers from "./Switchers";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "next-themes";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = !mounted || !theme || theme === "dark" ? "/logo-light.webp" : "/logo.webp";

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-40 border-b border-secondary/10 md:hidden">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">
          <Image
            src={logoSrc}
            alt="Reinaldo Tineo - Full Stack Developer Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />

          <div className="flex items-center gap-4">
            <Switchers />
            <button
              className="text-foreground p-1"
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
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background z-30 px-6 py-8">
          <ul className="flex flex-col gap-6 text-xl font-mono">
            <li><a href="#about" className="text-primary" onClick={() => setIsOpen(false)}>{t("nav.about")}</a></li>
            <li><a href="#experience" className="text-primary" onClick={() => setIsOpen(false)}>{t("nav.experience")}</a></li>
            <li><a href="#projects" className="text-primary" onClick={() => setIsOpen(false)}>{t("nav.projects")}</a></li>
            <li><a href="#writing" className="text-primary" onClick={() => setIsOpen(false)}>{t("writing.title")}</a></li>
          </ul>
          <div className="mt-10">
            <a
              href="/consulta-tecnica"
              className="animate-suspension inline-flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-white shadow-lg hover:brightness-110 transition-all"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                boxShadow: "0 4px 18px rgba(245,158,11,0.35)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              🚀 Consulta técnica gratis
            </a>
          </div>
        </div>
      )}
    </>
  );
}
