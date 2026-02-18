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

  const description = article.content.replace(/<[^>]*>/g, '').slice(0, 160);

  return {
    title: article.title,
    description: description,
    keywords: [
      "Blog",
      "Full Stack Developer",
      "Software Development",
      "Programming",
      "Reinaldo Tineo",
    ],
    openGraph: {
      title: `${article.title} | Reinaldo Tineo Blog`,
      description: description,
      url: `https://reinaldotineo.online/blog/${slug}`,
      type: "article",
      publishedTime: article.date,
      authors: ["Reinaldo Tineo"],
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: description,
    },
  };
}

export default function BlogPost() {
  return <BlogPostClient />;
}
