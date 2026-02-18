"use client";

import { useState, createContext, useContext, useEffect, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultContext: LanguageContextType = {
  language: "es",
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

const translations = {
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "hero.greeting": "Hi, my name is",
    "hero.title": "Reinaldo Tineo.",
    "hero.subtitle": "I build high-performance digital experiences.",
    "hero.description": "I help companies and startups scale their technical presence through clean code, data strategies, and advanced web optimization.",
    "hero.ctahire": "Hire me",
    "hero.cta": "Check out my work",
    "about.title": "About Me",
    "about.p1": "Hello! I've been in this industry for over 8 years, and I've learned that the difference between a web application and a great digital product lies in the architecture.",
    "about.p2": "My evolution as a developer has gone from 'making it work' to 'making it scale'. Today, my work focuses on building solid foundations: clean code, maintainable design patterns, and extreme performance optimization (WPO and Technical SEO).",
    "about.p3": "I've worked remotely for international companies and led technical projects, which has taught me how to manage backend complexity without neglecting the frontend user experience.",
    "about.p4": "Currently, I integrate Artificial Intelligence workflows and automation into my daily development to maximize efficiency and reduce technical debt.",
    "about.technologies": "My Stack & Approach:",
    "about.focus.1.title": "01. Architecture & Strategy",
    "about.focus.1.subtitle": "Decoupled & Scalable Systems",
    "about.focus.1.desc": "My focus is robustness. I specialize in Headless architectures and migrating monolithic systems to modular services. I design decoupled solutions that allow the backend (Laravel/Django/NestJS) to scale independently of the frontend, ensuring business growth without technical debt.",
    "about.focus.2.title": "02. Core Development",
    "about.focus.2.subtitle": "Technical Versatility (Polyglot)",
    "about.focus.2.desc": "I don't marry a single technology; I use the best tool for each problem. I develop reactive interfaces with Next.js/React and Vue.js, backed by solid RESTful APIs in Python or PHP. My code prioritizes security and strict typing with TypeScript.",
    "about.focus.3.title": "03. Ops & Data Engineering",
    "about.focus.3.subtitle": "Infrastructure & Automation",
    "about.focus.3.desc": "I standardize environments with Docker to eliminate 'it works on my machine'. I also integrate data engineering via Web Scraping scripts and advanced SQL query optimization, transforming raw data into actionable business intelligence.",
    "about.focus.4.title": "04. Quality & WPO",
    "about.focus.4.subtitle": "Performance as a Priority",
    "about.focus.4.desc": "Speed is a feature. I conduct deep Core Web Vitals audits and load optimization (WPO) to guarantee maximum indexability. My workflows include CI/CD with GitHub Actions and automated testing (Pytest/PHPUnit) for bulletproof deployments.",
    "experience.title": "Where I've Worked",
    "experience.present": "Present",
    "projects.title": "Some Things I've Built",
    "writing.title": "Some Things I've Written",
    "footer.designed": "Designed & Built by",
    "footer.built": "Built with",
  },
  es: {
    "nav.about": "Sobre Mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "hero.greeting": "Hola, mi nombre es",
    "hero.title": "Reinaldo Tineo.",
    "hero.subtitle": "Construyo experiencias digitales de alto rendimiento.",
    "hero.description": "Ayudo a empresas y startups a escalar su presencia técnica mediante código limpio, estrategias de datos y optimización web avanzada.",
    "hero.ctahire": "Contrátame",
    "hero.cta": "Ver mi trabajo",
    "about.title": "Sobre Mí",
    "about.p1": "Hola. Llevo más de 8 años en esto y he aprendido que la diferencia entre una aplicación web y un gran producto digital está en la arquitectura.",
    "about.p2": "Mi evolución como desarrollador ha ido desde 'hacer que funcione' hasta 'hacer que escale'. Hoy, mi trabajo se centra en construir bases sólidas: código limpio, patrones de diseño mantenibles y una optimización extrema del rendimiento (WPO y Technical SEO).",
    "about.p3": "He trabajado en remoto para empresas internacionales y liderado proyectos técnicos, lo que me ha enseñado a gestionar la complejidad del backend sin descuidar la experiencia del usuario en el frontend.",
    "about.p4": "Actualmente, integro flujos de Inteligencia Artificial y automatización en mi desarrollo diario para maximizar la eficiencia y reducir la deuda técnica.",
    "about.technologies": "Mi Stack y Enfoque:",
    "about.focus.1.title": "01. Arquitectura & Estrategia",
    "about.focus.1.subtitle": "Sistemas Desacoplados y Escalables",
    "about.focus.1.desc": "Mi enfoque es la robustez. Me especializo en arquitecturas Headless y en la migración de sistemas monolíticos hacia servicios modulares. Diseño soluciones desacopladas que permiten escalar el backend (Laravel/Django/NestJS) independientemente del frontend, asegurando que el negocio crezca sin deuda técnica.",
    "about.focus.2.title": "02. Core Development",
    "about.focus.2.subtitle": "Versatilidad Técnica (Políglota)",
    "about.focus.2.desc": "No me caso con una sola tecnología; uso la mejor herramienta para cada problema. Desarrollo interfaces reactivas con Next.js/React y Vue.js, respaldadas por APIs RESTful sólidas en Python o PHP. Mi código prioriza la seguridad y la tipificación estricta con TypeScript.",
    "about.focus.3.title": "03. Ops & Ingeniería de Datos",
    "about.focus.3.subtitle": "Infraestructura y Automatización",
    "about.focus.3.desc": "Estandarizo entornos con Docker para eliminar el 'en mi máquina funciona'. Además, integro ingeniería de datos mediante scripts de Web Scraping y optimización avanzada de consultas SQL, transformando datos brutos en inteligencia de negocio procesable.",
    "about.focus.4.title": "04. Calidad & WPO",
    "about.focus.4.subtitle": "Performance como Prioridad",
    "about.focus.4.desc": "La velocidad es una feature. Realizo auditorías profundas de Core Web Vitals y optimización de carga (WPO) para garantizar la máxima indexabilidad. Mis flujos incluyen CI/CD con GitHub Actions y testing automatizado (Pytest/PHPUnit) para despliegues a prueba de balas.",
    "experience.title": "Donde He Trabajado",
    "experience.present": "Actual",
    "projects.title": "Algunas Cosas Que He Construido",
    "writing.title": "Algunas Cosas Que He Escrito",
    "footer.designed": "Diseñado y Construido por",
    "footer.built": "Construido con",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved) setLanguage(saved);
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    const lang = mounted ? language : "es";
    return translations[lang][key as keyof typeof translations.en] || key;
  };

  const value = {
    language: mounted ? language : "es",
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
