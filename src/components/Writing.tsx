"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";

const articles = [
  {
    slug: "migrar-monolitos-legacy-arquitecturas-desacopladas",
    year: "2025",
    title: "Estrategias para Migrar Monolitos Legacy a Arquitecturas Desacopladas",
    description: "Una inmersión técnica en cómo descomponer sistemas monolíticos antiguos hacia servicios modulares utilizando Laravel y Python, minimizando la deuda técnica sin detener la operación.",
  },
  {
    slug: "ingenieria-performance-google-lighthouse",
    year: "2026",
    title: "Ingeniería de Performance: Más allá de Google Lighthouse",
    description: "Guía práctica sobre optimización de Core Web Vitals y tiempos de carga. Cómo auditar y refactorizar aplicaciones Vue.js y Next.js para lograr puntuaciones perfectas y mejorar el SEO técnico.",
  },
  {
    slug: "headless-ecommerce-prestashop-frontends-reactivos",
    year: "2025",
    title: "Headless E-commerce: Integrando PrestaShop con Frontends Reactivos",
    description: "Cómo extender la vida útil de un CMS tradicional como PrestaShop utilizándolo solo como API, mientras se entrega una experiencia de usuario moderna y veloz con Vue.js o React.",
  },
  {
    slug: "automatizacion-inteligencia-comercial-python-web-scraping",
    year: "2026",
    title: "Automatización de Inteligencia Comercial con Python y Web Scraping",
    description: "Cómo diseñar scripts de extracción de datos resilientes para monitorear precios, inventarios y tendencias de mercado, transformando datos crudos en dashboards de decisión estratégica.",
  },
];

export default function Writing() {
  const { language } = useLanguage();

  const sectionTitle = language === "en" ? "Some Things I've Written" : "Algunas Cosas Que He Escrito";

  return (
    <section id="writing" className="min-h-screen py-24 px-6">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 flex items-center text-2xl font-bold text-foreground">
            <span className="section-number mr-2">04.</span>
            {sectionTitle}
          </h2>
          <ol className="space-y-8">
            {articles.map((article) => (
              <motion.li
                key={article.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <span className="font-mono text-xs text-primary">{article.year}</span>
                <h3 className="text-lg font-semibold text-foreground project-link mt-1">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-secondary mt-2">{article.description}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
