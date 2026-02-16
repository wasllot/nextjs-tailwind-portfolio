"use client";

import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "./LanguageContext";

export default function Sidebar() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState("about");

  const sections = useMemo(() => [
    { id: "about", label: language === "en" ? "About" : "Sobre Mí" },
    { id: "experience", label: language === "en" ? "Experience" : "Experiencia" },
    { id: "projects", label: language === "en" ? "Projects" : "Proyectos" },
    { id: "writing", label: language === "en" ? "Writing" : "Escritos" },
  ], [language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="md:fixed md:left-0 md:top-0 md:h-screen md:w-1/2 w-full relative flex flex-col justify-center bg-background/95 backdrop-blur-sm z-30 transition-colors duration-300 border-r border-white/5">
      <div className="pl-6 pr-6 pt-20 pb-8 md:pl-16 md:pr-8 md:pt-0 md:pb-0 lg:pl-24">
        {/* Decorative line */}
        <div className="w-20 h-1 bg-primary mb-10"></div>

        {/* Hero greeting */}
        <div className="mb-4">
          <p className="font-mono text-primary text-sm mb-4">{t("hero.greeting")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Reinaldo <span className="text-primary">Tineo.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-secondary text-xl lg:text-2xl mb-10">
          Full Stack Developer & Software Architect
        </p>

        {/* Navigation - Hidden on mobile as we have the sticky header */}
        <nav className="mb-12 hidden md:block">
          <ul className="space-y-5">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`inline-flex items-center text-xl lg:text-2xl transition-all duration-300 ${activeSection === section.id
                    ? "text-primary"
                    : "text-secondary hover:text-foreground"
                    }`}
                >
                  <span className={`font-mono text-sm mr-4 ${activeSection === section.id ? "text-primary" : "text-secondary/50"}`}>
                    0{index + 1}.
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-8">
          {[
            { name: "GitHub", href: "https://github.com/", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
            { name: "LinkedIn", href: "https://linkedin.com/in/reinaldotineo", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
            { name: "WhatsApp", href: "https://wa.me/584121883268", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
            { name: "Email", href: "mailto:rei.vzl@gmail.com", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label={link.name}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d={link.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
