"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const experiences = [
  {
    id: 1,
    company: "Delight Distribuidores",
    role: "Full Stack Developer",
    descriptionKey: "exp-1",
    technologies: ["Python/Django", "Laravel", "NestJS", "Vue.js", "Next.js", "PrestaShop", "Docker"],
  },
  {
    id: 2,
    company: "Cuantica.agency",
    role: "Full Stack Developer & Technical SEO Specialist",
    descriptionKey: "exp-2",
    technologies: ["WordPress", "Laravel", "SEO", "WPO", "REST APIs"],
  },
  {
    id: 3,
    company: "Flaya Import C.A",
    role: "Lead Full Stack Developer · Founder",
    descriptionKey: "exp-3",
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
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.role} · <span className="text-primary">{exp.company}</span>
                </h3>
                <p className="text-secondary mt-4 leading-relaxed">{expDescriptions[language][exp.descriptionKey as keyof typeof expDescriptions.en]}</p>
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
