"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h2 className="mb-8 text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl leading-tight">
          {t("hero.subtitle")}
        </h2>
        <p className="mb-10 text-lg text-secondary/80 sm:text-xl max-w-2xl leading-relaxed">
          {t("hero.description")}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-block border border-primary bg-primary/10 px-8 py-4 font-mono text-primary btn-hover hover-glow rounded-sm"
          >
            {t("hero.cta")}
          </a>
          <a
            href="/servicios"
            className="inline-block border border-secondary/50 px-8 py-4 font-mono text-secondary btn-hover hover:border-primary hover:text-primary transition-colors duration-300 rounded-sm"
          >
            {t("hero.ctahire")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
