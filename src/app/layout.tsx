import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/LanguageContext";
import Switchers from "@/components/Switchers";
import MouseGlow from "@/components/MouseGlow";
import RagChatWidget from "@/components/RagChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reinaldotineo.online"),
  title: {
    default: "Reinaldo Tineo | Full Stack Developer & Software Architect",
    template: "%s | Reinaldo Tineo",
  },
  description: "Full Stack Developer & Software Architect especializado en Laravel, Python, TypeScript, Vue.js y React. Construyo arquitecturas de microservicios, sistemas de IA y soluciones escalables.",
  keywords: [
    "Full Stack Developer",
    "Software Architect",
    "Laravel Developer",
    "Python Developer",
    "TypeScript Developer",
    "Vue.js Developer",
    "React Developer",
    "Microservices Architecture",
    "AI Integration",
    "RAG API",
    "Backend Developer",
    "Freelance Developer",
    "Remote Developer",
    "Venezuela",
  ],
  authors: [{ name: "Reinaldo Tineo", url: "https://reinaldotineo.online" }],
  creator: "Reinaldo Tineo",
  publisher: "Reinaldo Tineo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://reinaldotineo.online",
    siteName: "Reinaldo Tineo Portfolio",
    title: "Reinaldo Tineo | Full Stack Developer & Software Architect",
    description: "Full Stack Developer & Software Architect especializado en Laravel, Python, TypeScript, Vue.js y React. Construyo arquitecturas de microservicios, sistemas de IA y soluciones escalables.",
  },
  twitter: {
    card: "summary",
    title: "Reinaldo Tineo | Full Stack Developer & Software Architect",
    description: "Full Stack Developer & Software Architect especializado en Laravel, Python, TypeScript, Vue.js y React.",
    creator: "@reinaldotineo",
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          src="https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          async
          defer
        />
      </head>
      <body className={`${inter.variable} ${mono.variable} antialiased bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-slate-900 focus:rounded-lg focus:font-medium"
          >
            Saltar al contenido
          </a>
          <MouseGlow />
          <LanguageProvider>
            <div className="fixed top-6 right-6 z-50 hidden md:flex">
              <Switchers />
            </div>
            <div className="fixed bottom-12 right-6 z-40 flex flex-col-reverse gap-3 items-end">
              <RagChatWidget />
            </div>
            <main id="main-content">
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
