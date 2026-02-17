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
  title: "Reinaldo Tineo | Full Stack Developer",
  description: "Full Stack Developer specialized in Laravel, Python, TypeScript, Vue.js, and React.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <MouseGlow />
            <LanguageProvider>
            <div className="fixed top-6 right-6 z-50 hidden md:flex">
              <Switchers />
            </div>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3 items-end">
              <RagChatWidget />
            </div>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
