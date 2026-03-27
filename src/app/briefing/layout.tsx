import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
    title: "Briefing de Proyecto | Software a Medida",
    description:
        "Cuéntame sobre tu proyecto de software. Este formulario me ayuda a entender exactamente lo que necesitas para ofrecerte una propuesta clara, precisa y ajustada a tu presupuesto.",
    openGraph: {
        title: "Briefing de Proyecto | Reinaldo Tineo",
        description:
            "Completa el briefing de tu proyecto de software a medida. Propuesta personalizada en menos de 24 horas.",
        url: "https://reinaldotineo.online/briefing",
        type: "website",
    },
};

export default function BriefingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <LanguageProvider>{children}</LanguageProvider>;
}
