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
    "consulta.title": "Free Technical Consultation",
    "consulta.subtitle": "Software Architecture & Microservices",
    "consulta.cta": "Schedule your free consultation",
    "consulta.badge": "Free Technical Consultation · No commitment",
    "consulta.hero.title": "Prepare your platform for the next level of growth.",
    "consulta.hero.desc": "I'm a specialist in Software Architecture & Microservices. I integrate into your team as an invisible resource to solve heavy engineering — without friction, without a learning curve.",
    "consulta.hero.prop1": "Recover development speed",
    "consulta.hero.prop2": "Launch without fear of server crashes",
    "consulta.hero.prop3": "Robust and scalable backend",
    "consulta.howItWorks": "How does it work?",
    "consulta.howItWorksSub": "Simple, direct, without bureaucracy.",
    "consulta.step1.title": "Schedule the consultation",
    "consulta.step1.desc": "Fill out the 2-minute form. It's free, no commitment.",
    "consulta.step2.title": "Technical diagnosis",
    "consulta.step2.desc": "We review your architecture, bottlenecks, and critical risks together.",
    "consulta.step3.title": "Clear action plan",
    "consulta.step3.desc": "You receive concrete recommendations you can implement immediately.",
    "consulta.forWhom": "Who is this consultation for?",
    "consulta.forWhomSub": "If you identify with any of these profiles, this consultation is for you.",
    "consulta.profile1.title": "Startups with traction",
    "consulta.profile1.desc": "Your app works but it's growing and starting to fail. You need a solid backend before scaling marketing.",
    "consulta.profile2.title": "Teams without a technical CTO",
    "consulta.profile2.desc": "You have good devs but no one makes architecture decisions. I integrate as your external Tech Lead.",
    "consulta.profile3.title": "Projects with technical debt",
    "consulta.profile3.desc": "Legacy code slows down every new feature. We chart a migration path without stopping production.",
    "consulta.form.title": "Schedule your free consultation",
    "consulta.form.subtitle": "Takes less than 2 minutes. Your answers help me prepare the session so it's 100% useful for you.",
    "consulta.form.name": "Full name",
    "consulta.form.namePlaceholder": "Ex: John Smith",
    "consulta.form.email": "Work email",
    "consulta.form.emailPlaceholder": "john@company.com",
    "consulta.form.role": "What is your role on the team?",
    "consulta.form.rolePlaceholder": "Select your role...",
    "consulta.form.projectStage": "What stage is your project at?",
    "consulta.form.mainChallenge": "What is your main technical challenge?",
    "consulta.form.mainChallengePlaceholder": "Select the challenge...",
    "consulta.form.teamSize": "How big is your technical team?",
    "consulta.form.urgency": "What is your urgency level?",
    "consulta.form.privacy": "Your data is confidential. No spam, ever.",
    "consulta.form.submit": "Schedule my free consultation →",
    "consulta.form.submitting": "Sending...",
    "consulta.form.success": "Consultation scheduled! 🎉",
    "consulta.form.successDesc": "I received your request. I'll contact you in less than 24 hours to coordinate the session.",
    "consulta.back": "Back",
    "consulta.backHome": "← Back to home",
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
    "consulta.title": "Consulta Técnica Gratuita",
    "consulta.subtitle": "Arquitectura de Software & Microservicios",
    "consulta.cta": "Agenda tu consulta gratuita",
    "consulta.badge": "Consulta Técnica Gratuita · Sin compromiso",
    "consulta.hero.title": "Prepara tu plataforma para el siguiente nivel de crecimiento.",
    "consulta.hero.desc": "Soy especialista en Arquitectura de Software & Microservicios. Me integro a tu equipo como un recurso invisible para resolver la ingeniería pesada — sin fricción, sin curva de aprendizaje.",
    "consulta.hero.prop1": "Recupera la velocidad de desarrollo",
    "consulta.hero.prop2": "Lanza sin miedo a que el servidor se caiga",
    "consulta.hero.prop3": "Backend robusto y escalable",
    "consulta.howItWorks": "¿Cómo funciona?",
    "consulta.howItWorksSub": "Simple, directo, sin burocracia.",
    "consulta.step1.title": "Agenda la consulta",
    "consulta.step1.desc": "Llena el formulario de 2 minutos. Es gratuito, sin compromiso.",
    "consulta.step2.title": "Diagnóstico técnico",
    "consulta.step2.desc": "Revisamos juntos tu arquitectura, cuellos de botella y riesgos críticos.",
    "consulta.step3.title": "Plan de acción claro",
    "consulta.step3.desc": "Recibes recomendaciones concretas que puedes implementar de inmediato.",
    "consulta.forWhom": "¿Para quién es esta consulta?",
    "consulta.forWhomSub": "Si te identificas con alguno de estos perfiles, esta consulta es para ti.",
    "consulta.profile1.title": "Startups con tracción",
    "consulta.profile1.desc": "Tu app funciona pero crece y empieza a fallar. Necesitas un backend sólido antes de escalar marketing.",
    "consulta.profile2.title": "Equipos sin CTO técnico",
    "consulta.profile2.desc": "Tienes devs buenos pero nadie toma decisiones de arquitectura. Yo me integro como tu Tech Lead externo.",
    "consulta.profile3.title": "Proyectos con deuda técnica",
    "consulta.profile3.desc": "El código legacy frena cada feature nueva. Trazamos una ruta de migración sin parar producción.",
    "consulta.form.title": "Agenda tu consulta gratuita",
    "consulta.form.subtitle": "Tarda menos de 2 minutos. Las respuestas me ayudan a preparar la sesión para que sea 100% útil para ti.",
    "consulta.form.name": "Nombre completo",
    "consulta.form.namePlaceholder": "Ej: Carlos Rodríguez",
    "consulta.form.email": "Email de trabajo",
    "consulta.form.emailPlaceholder": "carlos@empresa.com",
    "consulta.form.role": "¿Cuál es tu rol en el equipo?",
    "consulta.form.rolePlaceholder": "Selecciona tu rol...",
    "consulta.form.projectStage": "¿En qué etapa está tu proyecto?",
    "consulta.form.mainChallenge": "¿Cuál es tu principal desafío técnico?",
    "consulta.form.mainChallengePlaceholder": "Selecciona el desafío...",
    "consulta.form.teamSize": "¿De qué tamaño es tu equipo técnico?",
    "consulta.form.urgency": "¿Cuál es tu nivel de urgencia?",
    "consulta.form.privacy": "Tus datos son confidenciales. No spam, nunca.",
    "consulta.form.submit": "Agendar mi consulta gratuita →",
    "consulta.form.submitting": "Enviando...",
    "consulta.form.success": "¡Consulta agendada! 🎉",
    "consulta.form.successDesc": "Recibí tu solicitud. Te contactaré en menos de 24 horas para coordinar la sesión.",
    "consulta.back": "Volver",
    "consulta.backHome": "← Volver al inicio",
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
