import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { LanguageProvider } from "@/components/LanguageContext";

import Background from "@/components/Background";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen text-foreground relative overflow-hidden">
      <Background />
      {/* Left Sidebar - 50% width, fixed */}
      <Sidebar />

      {/* Right Content - 50% width, scrollable */}
      <main className="w-full md:w-1/2 ml-auto">
        <Navigation />
        <div className="pt-16">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Writing />
        </div>
        <Footer />
      </main>
    </div>
  );
}
