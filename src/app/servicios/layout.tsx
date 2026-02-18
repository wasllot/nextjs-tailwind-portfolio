import { Metadata } from "next";
import ServiciosPage from "./page";

export const metadata: Metadata = {
  title: "Servicios | Reinaldo Tineo",
  description: "Desarrollo de software de alto impacto: SaaS, Microservicios, DevOps, SEO Técnico e Inteligencia Artificial. Construyo sistemas que escalan.",
  keywords: [
    "Desarrollo SaaS",
    "Microservicios",
    "DevOps",
    "AWS",
    "Docker",
    "Kubernetes",
    "SEO Técnico",
    "Inteligencia Artificial",
    "RAG",
    "Full Stack Developer",
    "Freelance",
  ],
  openGraph: {
    title: "Servicios de Desarrollo | Reinaldo Tineo",
    description: "Desarrollo de software de alto impacto: SaaS, Microservicios, DevOps, SEO Técnico e Inteligencia Artificial.",
    url: "https://reinaldotineo.online/servicios",
    type: "website",
  },
};

export default function Servicios() {
  return <ServiciosPage />;
}
