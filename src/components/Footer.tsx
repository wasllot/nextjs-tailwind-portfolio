"use client";

import { useLanguage } from "./LanguageContext";
import SystemStatusWidget from "./SystemStatusWidget";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-6 border-t border-secondary/10">
      <div className="flex flex-col items-center gap-6">
        <SystemStatusWidget />
        <div className="text-center">
          <p className="font-mono text-sm text-secondary">
            {t("footer.designed")} Reinaldo Tineo
          </p>
          <p className="font-mono mt-2 text-xs text-secondary/60">
            {t("footer.built")} <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Next.js</a> & <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Tailwind CSS</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
