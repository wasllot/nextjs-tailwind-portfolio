"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function About() {
  const { t } = useLanguage();

  /* technologies array removed */

  return (
    <section id="about" className="min-h-screen py-24 px-6">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 flex items-center text-2xl font-bold text-foreground">
            <span className="section-number mr-2">01.</span>
            {t("about.title")}
          </h2>
          <div className="text-secondary text-lg leading-relaxed">
            <p className="mb-6">{t("about.p1")}</p>
            <p className="mb-6">{t("about.p2")}</p>
            <p className="mb-6">{t("about.p3")}</p>
            <p className="mb-12">{t("about.p4")}</p>

            <h3 className="text-2xl font-bold text-foreground mb-8">{t("about.technologies")}</h3>

            <div className="grid grid-cols-1 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="relative pl-6 border-l-2 border-secondary/20 hover:border-primary transition-colors duration-300">
                  <h4 className="text-xl font-bold text-primary mb-1">
                    {t(`about.focus.${num}.title`)}
                  </h4>
                  <p className="text-foreground font-mono text-sm mb-3">
                    {t(`about.focus.${num}.subtitle`)}
                  </p>
                  <p className="text-secondary text-base">
                    {t(`about.focus.${num}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
