import ProjectDetailClient from "./ProjectDetailClient";
import { projects } from "./data";
import { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  
  if (!project) {
    return {
      title: "Proyecto No Encontrado",
    };
  }

  const title = project.titleEn;
  const description = project.descriptionEn;

  return {
    title: title,
    description: description,
    keywords: [
      ...project.technologies,
      "Full Stack Developer",
      "Software Architect",
      "Project Portfolio",
      "Laravel",
      "Python",
      "React",
      "Vue.js",
    ],
    openGraph: {
      title: `${title} | Reinaldo Tineo Portfolio`,
      description: description,
      url: `https://reinaldotineo.online/projects/${slug}`,
      type: "article",
      publishedTime: project.year,
      authors: ["Reinaldo Tineo"],
      images: project.image ? [
        {
          url: project.image,
          width: 1200,
          height: 600,
          alt: `${title} - Project Screenshot`,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Reinaldo Tineo`,
      description: description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default function ProjectPage() {
  return <ProjectDetailClient />;
}
