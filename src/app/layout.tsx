import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/LanguageContext";
import Switchers from "@/components/Switchers";
import MouseGlow from "@/components/MouseGlow";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} antialiased bg-background text-foreground`}>
        <MouseGlow />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Switchers />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
