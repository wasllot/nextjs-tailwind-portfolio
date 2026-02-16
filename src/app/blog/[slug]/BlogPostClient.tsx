"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { notFound } from "next/navigation";
import { articles } from "./data";

export default function BlogPostClient() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();

  const article = articles[slug];

  if (!article) {
    notFound();
  }

  const title = language === "en" ? article.titleEn : article.title;
  const content = language === "en" ? article.contentEn : article.content;

  return (
    <div className="min-h-screen py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Link
          href="/#writing"
          className="inline-flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors"
        >
          ← {language === "en" ? "Back to articles" : "Volver a artículos"}
        </Link>

        <article>
          <header className="mb-8">
            <span className="font-mono text-sm text-primary">{article.date}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              {title}
            </h1>
          </header>

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        <footer className="mt-16 pt-8 border-t border-border">
          <Link
            href="/#writing"
            className="inline-flex items-center text-secondary hover:text-primary transition-colors"
          >
            ← {language === "en" ? "Back to all articles" : "Volver a todos los artículos"}
          </Link>
        </footer>
      </motion.div>
    </div>
  );
}
