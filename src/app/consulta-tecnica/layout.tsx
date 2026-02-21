import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
    title: "Consulta Técnica Gratuita | Arquitectura de Software & Microservicios",
    description:
        "Agenda una consulta técnica gratuita con un especialista en Arquitectura de Software & Microservicios. Python, PHP, JS/TS. Backend robusto y escalable para tu equipo.",
    keywords: [
        "consulta técnica gratuita",
        "arquitectura de software",
        "microservicios",
        "backend escalable",
        "Python developer",
        "PHP developer",
        "TypeScript developer",
        "freelance backend",
    ],
    openGraph: {
        title: "Consulta Técnica Gratuita | Reinaldo Tineo",
        description:
            "Prepara tu plataforma para el siguiente nivel. Agenda una consulta técnica gratuita con especialista en Arquitectura de Software & Microservicios.",
        url: "https://reinaldotineo.online/consulta-tecnica",
        type: "website",
    },
};

export default function ConsultaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <LanguageProvider>{children}</LanguageProvider>;
}
