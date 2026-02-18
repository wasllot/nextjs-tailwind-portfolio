"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const experiences = [
  {
    id: 1,
    company: "Delight Distribuidores",
    role: "Full Stack Developer",
    period: "2021 - Actual",
    descriptionKey: "exp-1",
    achievements: ["+4 años de colaboración continua", "Middleware de sincronización e-commerce", "Sistema de inventarios multi-plataforma"],
    technologies: ["Python/Django", "Laravel", "NestJS", "Vue.js", "Next.js", "PrestaShop", "Docker"],
  },
  {
    id: 2,
    company: "Cuantica.agency",
    role: "Full Stack Developer & Technical SEO Specialist",
    period: "2022 - Actual",
    descriptionKey: "exp-2",
    achievements: ["Colaboración a largo plazo", "Core Web Vitals optimizados", "WPO para múltiples clientes"],
    technologies: ["WordPress", "Laravel", "SEO", "WPO", "REST APIs"],
  },
  {
    id: 3,
    company: "Flaya Import C.A",
    role: "Lead Full Stack Developer · Founder",
    period: "2018 - 2021",
    descriptionKey: "exp-3",
    achievements: ["Gestión de equipo de 4 desarrolladores", "E-commerce 360°", "Sistema completo de ventas y operaciones"],
    technologies: ["Laravel", "Vue.js", "MySQL", "Server Administration"],
  },
];

const expDescriptions = {
  en: {
    "exp-1": "Backend Development & Migrations: Led migrations from monolithic systems to modular microservices using Python/Django, Laravel, and NestJS. E-commerce: PrestaShop specialist with REST API integrations. Infrastructure: Docker containerization. Frontend: Vue.js and Next.js with technical SEO implementation. Data Engineering: Web scraping solutions for business intelligence.",
    "exp-2": "Performance Engineering (WPO): Core Web Vitals optimization and technical SEO audits. Advanced WordPress development. Custom Laravel solutions for complex business requirements.",
    "exp-3": "Project Leadership: Directed complete software development lifecycle, managing a team of 4 developers. Full Stack Development. 360° Digital Strategy including e-commerce, marketing, and operations.",
  },
  es: {
    "exp-1": "Desarrollo Backend y Migraciones: Lideré migraciones de sistemas monolíticos a microservicios modulares usando Python/Django, Laravel y NestJS. E-commerce: Especialista en PrestaShop con integraciones API REST. Infraestructura: Contenedores Docker. Frontend: Vue.js y Next.js con implementación de SEO técnico. Data Engineering: Soluciones de web scraping para inteligencia de negocio.",
    "exp-2": "Ingeniería de Performance (WPO): Optimización de Core Web Vitals y auditorías de SEO técnico. Desarrollo WordPress avanzado. Soluciones personalizadas con Laravel para requisitos de negocio complejos.",
    "exp-3": "Liderazgo de Proyectos: Dirigí el ciclo completo de desarrollo de software, gestionando un equipo de 4 desarrolladores. Desarrollo Full Stack. Estrategia Digital 360° incluyendo e-commerce, marketing y operaciones.",
  },
};

export default function Experience() {
  const { language } = useLanguage();

  return (
    <section id="experience" className="min-h-screen py-24 px-6">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 flex items-center text-2xl font-bold text-foreground">
            <span className="section-number mr-2">02.</span>
            {language === "en" ? "Where I've Worked" : "Donde He Trabajado"}
          </h2>
          <ol className="space-y-12">
            {experiences.map((exp) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.role} · <span className="text-primary">{exp.company}</span>
                  </h3>
                  <span className="text-sm text-secondary font-mono">{exp.period}</span>
                </div>
                <p className="text-secondary mt-2 leading-relaxed">{expDescriptions[language][exp.descriptionKey as keyof typeof expDescriptions.en]}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.achievements.map((achievement, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded">
                      {achievement}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {exp.technologies.map((tech) => (
                    <li key={tech} className="font-mono text-xs text-secondary">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
