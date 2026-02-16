import ProjectDetailClient from "./ProjectDetailClient";
import { projects } from "./data";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export default function ProjectPage() {
  return <ProjectDetailClient />;
}
