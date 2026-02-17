"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";

const projects = [
  {
    id: 1,
    slug: "microservices-core-rag",
    title: "SaaS Microservices Core & RAG API",
    titleEn: "SaaS Microservices Core & RAG API",
    descriptionKey: "project-microservices",
    technologies: ["Laravel 11", "FastAPI", "Docker", "Traefik", "pgvector", "Redis", "Google Gemini"],
    link: "",
    external: false,
  },
  {
    id: 2,
    slug: "jobhunter-ai",
    title: "JobHunter AI - Automatización de Búsqueda de Empleo",
    titleEn: "JobHunter AI - Automated Job Search",
    descriptionKey: "project-1",
    technologies: ["Electron", "Next.js", "Python", "FastAPI", "Gemini AI"],
    link: "",
    external: false,
  },
  {
    id: 3,
    slug: "biolims",
    title: "BioLIMS - Sistema de Gestión de Laboratorio Offline-First",
    titleEn: "BioLIMS - Offline-First Laboratory Management System",
    descriptionKey: "project-3",
    technologies: ["Django REST Framework", "React", "Dexie.js", "PostgreSQL", "Zustand", "Docker"],
    link: "",
    external: false,
  },
  {
    id: 4,
    slug: "ecosistema-dlds",
    title: "Ecosistema DLDS - Middleware Event-Driven",
    titleEn: "DLDS Ecosystem - Event-Driven Middleware",
    descriptionKey: "project-2",
    technologies: ["Laravel", "Redis", "PrestaShop", "Webhooks", "MySQL", "Docker"],
    link: "https://www.dlds.cl",
    external: true,
  },
];

const projectDescriptions = {
  en: {
    "project-microservices": "Distributed backend architecture and polyglot microservices system that orchestrates AI (RAG), Web Scraping and Computer Vision services. This engine powers the intelligent chat and search of this portfolio.",
    "project-1": "Desktop application for automated job search using AI. Hybrid architecture with Electron, Next.js, Python/FastAPI and Gemini AI for intelligent filtering.",
    "project-2": "Event-driven middleware ecosystem connecting a wholesale distributor with multiple retail stores. Real-time inventory synchronization, automated order replication and drop-shipping flow.",
    "project-3": "Comprehensive laboratory management system designed with an Offline-First strategy. Modular backend architecture based on simplified DDD to handle complex business logic and robust bidirectional synchronization.",
  },
  es: {
    "project-microservices": "Arquitectura de backend distribuida y políglota que orquesta servicios de IA (RAG), Web Scraping y Visión Computacional. Este sistema es el motor que alimenta el chat inteligente y la búsqueda de este portafolio.",
    "project-1": "Aplicación de escritorio para búsqueda de empleo automatizada con IA. Arquitectura híbrida con Electron, Next.js, Python/FastAPI y Gemini AI para filtrado inteligente.",
    "project-2": "Ecosistema de middleware basado en eventos que conecta un mayorista con múltiples tiendas retail. Sincronización de inventario en tiempo real, replicación automatizada de pedidos y flujo de drop-shipping.",
    "project-3": "Plataforma integral para laboratorios clínicos diseñada con una estrategia Offline-First. Arquitectura backend modular basada en DDD simplificado para manejar lógica de negocio compleja y sincronización bidireccional robusta.",
  },
};

export default function Projects() {
  const { language } = useLanguage();

  return (
    <section id="projects" className="min-h-screen py-24 px-6">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 flex items-center text-2xl font-bold text-foreground">
            <span className="section-number mr-2">03.</span>
            {language === "en" ? "Some Things I've Built" : "Algunas Cosas Que He Construido"}
          </h2>
          <ol className="space-y-12">
            {projects.map((project, index) => (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <h3 className="text-xl font-semibold text-foreground project-link">
                  <Link href={`/projects/${project.slug}`}>
                    {language === "en" ? project.titleEn : project.title}
                  </Link>
                </h3>
                <p className="mt-3 text-secondary leading-relaxed">{projectDescriptions[language][project.descriptionKey as keyof typeof projectDescriptions.en]}</p>
                <ul className="mt-3 flex flex-wrap gap-3 font-mono text-xs text-secondary">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
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
