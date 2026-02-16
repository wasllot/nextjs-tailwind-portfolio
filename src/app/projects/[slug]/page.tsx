"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { notFound } from "next/navigation";

const projects: Record<string, {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  client: string;
  clientEn: string;
  year: string;
  technologies: string[];
  link: string;
  image?: string;
  challenge: string[];
  challengeEn: string[];
  solution: string[];
  solutionEn: string[];
  architecture: string[];
  architectureEn: string[];
  results: string[];
  resultsEn: string[];
}> = {
  "jobhunter-ai": {
    title: "JobHunter AI - Automatización de Búsqueda de Empleo",
    titleEn: "JobHunter AI - Automated Job Search",
    description: "Aplicación de escritorio para búsqueda de empleo automatizada con Inteligencia Artificial. Arquitectura híbrida que combina Electron, Next.js, Python/FastAPI y Gemini AI.",
    descriptionEn: "Desktop application for automated job search with Artificial Intelligence. Hybrid architecture combining Electron, Next.js, Python/FastAPI and Gemini AI.",
    client: "Proyecto Personal",
    clientEn: "Personal Project",
    year: "2024",
    technologies: ["Electron", "Next.js", "Python", "FastAPI", "Gemini AI", "SQLite", "Zustand", "JobSpy", "APScheduler"],
    link: "",
    image: "/job-hunter-seeker.webp",
    challenge: [
      "La búsqueda de empleo moderna es ineficiente: revisar múltiples portales (LinkedIn, Indeed, Glassdoor) manualmente",
      "Filtrar manualmente cientos de ofertas irrelevantes consume horas",
      "Gestionar el estado de cada aplicación en hojas de cálculo desconectadas",
      "El ruido (ofertas no relevantes) supera el 80% del total"
    ],
    challengeEn: [
      "Modern job searching is inefficient: manually checking multiple portals (LinkedIn, Indeed, Glassdoor)",
      "Manually filtering hundreds of irrelevant offers consumes hours",
      "Managing application status in disconnected spreadsheets",
      "Noise (irrelevant offers) exceeds 80% of the total"
    ],
    solution: [
      "Solución unificada y local que automatiza la recolección de ofertas",
      "Centralización de la gestión en una sola aplicación de escritorio",
      "Integración de Google Gemini 1.5 Flash para filtrado inteligente",
      "Análisis automático de cada oferta contra el CV del usuario"
    ],
    solutionEn: [
      "Unified local solution that automates offer collection",
      "Centralized management in a single desktop application",
      "Google Gemini 1.5 Flash integration for intelligent filtering",
      "Automatic analysis of each offer against user CV"
    ],
    architecture: [
      "Frontend: Electron encapsulando Next.js (React) para UI fluida a 60 FPS",
      "Backend: FastAPI (Python) como subproceso oculto gestionado por Electron",
      "Gestión de estado: Zustand/Context en el frontend",
      "Scraping: JobSpy para extracción multi-fuente",
      "Base de datos: SQLite local con SQLAlchemy",
      "Tareas: APScheduler para gestión de colas en segundo plano"
    ],
    architectureEn: [
      "Frontend: Electron encapsulating Next.js (React) for fluid UI at 60 FPS",
      "Backend: FastAPI (Python) as hidden subprocess managed by Electron",
      "State management: Zustand/Context on frontend",
      "Scraping: JobSpy for multi-source extraction",
      "Database: Local SQLite with SQLAlchemy",
      "Tasks: APScheduler for background queue management"
    ],
    results: [
      "Reducción del tiempo de lectura de ofertas en un 80%",
      "Filtrado inteligente que elimina ofertas irrelevantes automáticamente",
      "Interfaz fluida sin bloquear el proceso de scraping",
      "Datos persistentes localmente sin depender de la nube"
    ],
    resultsEn: [
      "80% reduction in offer reading time",
      "Intelligent filtering that automatically eliminates irrelevant offers",
      "Fluid interface without blocking the scraping process",
      "Data persisted locally without depending on the cloud"
    ]
  },
  "ecosistema-dlds": {
    title: "Ecosistema DLDS - Middleware Event-Driven",
    titleEn: "DLDS Ecosystem - Event-Driven Middleware",
    description: "Arquitectura de middleware basada en eventos que conecta un mayorista con múltiples tiendas retail, sincronizando inventario en tiempo real y automatizando el flujo de pedidos.",
    descriptionEn: "Event-driven middleware architecture connecting a wholesale distributor with multiple retail stores, synchronizing inventory in real-time and automating order flow.",
    client: "DLDS Chile",
    clientEn: "DLDS Chile",
    year: "2023-2024",
    technologies: ["Laravel", "Redis", "PrestaShop", "Webhooks", "MySQL", "Docker", "Laravel Horizon", "API REST"],
    link: "https://www.dlds.cl",
    image: "/event-driven-ecommerce-sync.webp",
    challenge: [
      "Modelo híbrido complejo: un mayorista central (DLDS) y múltiples retailers satélite",
      "Desconexión crítica: actualizar stock o precios requería procesos manuales",
      "Riesgo de sobreventa (overselling) por discrepancias de inventario",
      "Discrepancias financieras por falta de sincronización en tiempo real"
    ],
    challengeEn: [
      "Complex hybrid model: one central wholesaler (DLDS) and multiple satellite retailers",
      "Critical disconnection: updating stock or prices required manual processes",
      "Overselling risk due to inventory discrepancies",
      "Financial discrepancies due to lack of real-time synchronization"
    ],
    solution: [
      "Middleware Hub centralizado como orquestador de eventos",
      "Sistema de Webhooks para detección de cambios en tiempo real",
      "Colas de procesamiento con Redis y Laravel Horizon",
      "Workers para distribución asíncrona de actualizaciones"
    ],
    solutionEn: [
      "Centralized Middleware Hub as event orchestrator",
      "Webhook system for real-time change detection",
      "Processing queues with Redis and Laravel Horizon",
      "Workers for asynchronous update distribution"
    ],
    architecture: [
      "Product Sync Flow: Actualización masiva de catálogo, precios y stock desde el Mayorista hacia los Retailers",
      "Order Replication Flow: Cuando un cliente compra en un retailer, el pedido se replica automáticamente en el Mayorista para drop-shipping interno",
      "Producer (Mayorista): Dispara Webhooks al Middleware cuando ocurre un cambio",
      "Middleware Hub: Recibe payloads, los encola en Redis, Workers procesan la lógica",
      "Consumers (Retailers): Reciben actualizaciones vía API REST"
    ],
    architectureEn: [
      "Product Sync Flow: Massive catalog, price and stock updates from Wholesaler to Retailers",
      "Order Replication Flow: When a customer purchases at a retailer, order automatically replicates to Wholesaler for internal drop-shipping",
      "Producer (Wholesaler): Fires Webhooks to Middleware when changes occur",
      "Middleware Hub: Receives payloads, queues them in Redis, Workers process logic",
      "Consumers (Retailers): Receive updates via REST API"
    ],
    results: [
      "Inventario idéntico en todo el ecosistema en milisegundos",
      "Eliminación total del riesgo de sobreventa",
      "Automatización del flujo de drop-shipping interno",
      "Escalabilidad: agregar nuevas tiendas sin modificar el core"
    ],
    resultsEn: [
      "Identical inventory across the ecosystem in milliseconds",
      "Complete elimination of overselling risk",
      "Internal drop-shipping flow automation",
      "Scalability: adding new stores without modifying the core"
    ]
  },
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();

  const project = projects[slug];

  if (!project) {
    notFound();
  }

  const title = language === "en" ? project.titleEn : project.title;
  const description = language === "en" ? project.descriptionEn : project.description;
  const client = language === "en" ? project.clientEn : project.client;
  const challenge = language === "en" ? project.challengeEn : project.challenge;
  const solution = language === "en" ? project.solutionEn : project.solution;
  const architecture = language === "en" ? project.architectureEn : project.architecture;
  const results = language === "en" ? project.resultsEn : project.results;

  return (
    <div className="min-h-screen py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors"
        >
          ← {language === "en" ? "Back to projects" : "Volver a proyectos"}
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-mono text-secondary">
              <span>{project.year}</span>
              <span className="text-primary">•</span>
              <span>{client}</span>
            </div>
          </header>

          {project.image && (
            <div className="relative w-full h-auto mb-8 rounded-lg overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={title}
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          <p className="text-lg text-secondary leading-relaxed mb-10">
            {description}
          </p>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "en" ? "Technologies" : "Tecnologías"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "en" ? "The Challenge" : "El Desafío"}
            </h2>
            <ul className="space-y-3">
              {challenge.map((item, index) => (
                <li key={index} className="flex items-start text-secondary">
                  <span className="text-primary mr-3">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "en" ? "The Solution" : "La Solución"}
            </h2>
            <ul className="space-y-3">
              {solution.map((item, index) => (
                <li key={index} className="flex items-start text-secondary">
                  <span className="text-primary mr-3">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "en" ? "Architecture" : "Arquitectura"}
            </h2>
            <ul className="space-y-3">
              {architecture.map((item, index) => (
                <li key={index} className="flex items-start text-secondary">
                  <span className="text-primary mr-3">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "en" ? "Results" : "Resultados"}
            </h2>
            <ul className="space-y-3">
              {results.map((item, index) => (
                <li key={index} className="flex items-start text-secondary">
                  <span className="text-primary mr-3">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors hover-glow"
              >
                {language === "en" ? "Visit Website" : "Visitar Sitio"}
              </a>
            )}
            <Link
              href="/#projects"
              className="inline-flex items-center px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
            >
              {language === "en" ? "View All Projects" : "Ver Todos los Proyectos"}
            </Link>
          </div>
        </article>

        <footer className="mt-16 pt-8 border-t border-border">
          <Link
            href="/#projects"
            className="inline-flex items-center text-secondary hover:text-primary transition-colors"
          >
            ← {language === "en" ? "Back to all projects" : "Volver a todos los proyectos"}
          </Link>
        </footer>
      </motion.div>
    </div>
  );
}
