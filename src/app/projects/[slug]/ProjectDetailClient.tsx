"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { notFound } from "next/navigation";
import { projects } from "./data";
import { Github } from "lucide-react";

export default function ProjectDetailClient() {
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
              <span>{client}</span>
            </div>
          </header>

          {project.image && (
            <div className="relative w-full h-auto mb-8 rounded-lg overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={`${title} - ${language === "en" ? "Project Architecture and Screenshot" : "Arquitectura y Captura del Proyecto"}`}
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

          <div className="flex gap-4 flex-wrap">
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
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Github className="w-5 h-5" />
                {language === "en" ? "View Code" : "Ver Código"}
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
