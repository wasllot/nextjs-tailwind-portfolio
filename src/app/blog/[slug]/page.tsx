import BlogPostClient from "./BlogPostClient";
import { articles } from "./data";
import { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  
  if (!article) {
    return {
      title: "Artículo No Encontrado",
    };
  }

  return {
    title: article.title,
    description: article.summary,
    keywords: [
      ...article.tags,
      "Blog",
      "Full Stack Developer",
      "Software Development",
      "Programming",
    ],
    openGraph: {
      title: `${article.title} | Reinaldo Tineo Blog`,
      description: article.summary,
      url: `https://reinaldotineo.online/blog/${slug}`,
      type: "article",
      publishedTime: article.date,
      authors: ["Reinaldo Tineo"],
      tags: article.tags,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.summary,
    },
  };
}

export default function BlogPost() {
  return <BlogPostClient />;
}
