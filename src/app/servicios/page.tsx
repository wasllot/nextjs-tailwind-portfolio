"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LogoTicker from "@/components/LogoTicker";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "next-themes";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";

const logos = [
  { name: "Partner 1", src: "/partners/1_20260218_104208_0000.svg" },
  { name: "Partner 2", src: "/partners/2_20260218_104208_0001.svg" },
  { name: "Partner 3", src: "/partners/3_20260218_104208_0002.svg" },
  { name: "Partner 4", src: "/partners/4_20260218_104208_0003.svg" },
  { name: "Partner 5", src: "/partners/5_20260218_104208_0004.svg" },
  { name: "Partner 6", src: "/partners/6_20260218_104208_0005.svg" },
  { name: "Partner 7", src: "/partners/7_20260218_104209_0006.svg" },
  { name: "Partner 8", src: "/partners/8_20260218_104209_0007.svg" },
  { name: "Partner 9", src: "/partners/9_20260218_104209_0008.svg" },
  { name: "Partner 11", src: "/partners/11_20260218_104209_0010.svg" },
  { name: "Partner 12", src: "/partners/12_20260218_104209_0011.svg" },
  { name: "Partner 13", src: "/partners/13_20260218_104209_0012.svg" },
  { name: "Partner 14", src: "/partners/14_20260218_104209_0013.svg" },
  { name: "Partner 15", src: "/partners/15_20260218_104209_0014.svg" },
  { name: "Partner 16", src: "/partners/16_20260218_104209_0015.svg" },
];

const services = [
  {
    id: "saas",
    title: "SaaS & Microservicios",
    titleEn: "SaaS & Microservices",
    icon: "☁️",
    description: "Arquitecturas distribuidas que escalan infinitamente. Diseñamos sistemas polyglot donde cada servicio usa la mejor tecnología para su propósito específico.",
    descriptionEn: "Distributed architectures that scale infinitely. We design polyglot systems where each service uses the best technology for its specific purpose.",
    features: ["API Gateway", "Event-Driven", "Docker/K8s", "Serverless"],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    titleEn: "DevOps & Cloud",
    icon: "⚙️",
    description: "CI/CD, infraestructura como código, y automatización que elimina errores humanos. Tu deployment es tan confiable como tu código.",
    descriptionEn: "CI/CD, infrastructure as code, and automation that eliminates human errors. Your deployment is as reliable as your code.",
    features: ["AWS/GCP/Azure", "Terraform", "GitHub Actions", "Monitoring"],
  },
  {
    id: "seo",
    title: "SEO Técnico",
    titleEn: "Technical SEO",
    icon: "🔍",
    description: "Core Web Vitals, arquitectura de sitio optimizada, y schema markup. Visibility técnica que complementa tu estrategia de contenido.",
    descriptionEn: "Core Web Vitals, optimized site architecture, and schema markup. Technical visibility that complements your content strategy.",
    features: ["Core Web Vitals", "Schema.org", "Performance", "Accessibility"],
  },
  {
    id: "data",
    title: "Data & IA",
    titleEn: "Data & AI",
    icon: "🤖",
    description: "RAG pipelines, embeddings, y modelos personalizados. Transformo datos en insights accionables y chatbots inteligentes.",
    descriptionEn: "RAG pipelines, embeddings, and custom models. I transform data into actionable insights and intelligent chatbots.",
    features: ["LLM Integration", "Vector DB", "Python/ML", "Automation"],
  },
];

const projectTypes = [
  { value: "saas", label: "SaaS / Web App" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "api", label: "API / Backend" },
  { value: "migration", label: "Migración" },
  { value: "optimization", label: "Optimización" },
  { value: "otro", label: "Otro" },
];

export default function ServiciosPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setSubmitted(true);
    setIsSubmitting(false);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-white'} text-foreground`}>
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <a
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
            isDark 
              ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700' 
              : 'bg-white/80 text-slate-700 hover:bg-slate-100 shadow-lg'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">{language === "en" ? "Back" : "Volver"}</span>
        </a>
      </div>

      {/* Hero Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {language === "en" 
              ? "High Impact Software Engineering" 
              : "Ingeniería de Software de Alto Impacto"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {language === "en"
              ? "I build scalable systems, integrate AI, and create digital experiences that drive business growth."
              : "Construyo sistemas escalables, integro IA y creo experiencias digitales que impulsan el crecimiento del negocio."}
          </motion.p>
        </div>
      </section>

      {/* Logo Ticker */}
      <section className={`py-12 ${isDark ? 'bg-slate-900/50 border-y border-slate-800' : 'bg-slate-50 border-y border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <p className={`text-center text-sm mb-8 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === "en" ? "Trusted by:" : "Confían en mi código:"}
          </p>
          <LogoTicker logos={logos} isDark={isDark} />
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
          >
            {language === "en" ? "Services" : "Servicios"}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-[0_0_40px_rgba(100,255,218,0.1)] ${
                  isDark 
                    ? 'border-slate-800 bg-slate-900/50 hover:border-primary/50' 
                    : 'border-slate-200 bg-white hover:border-primary/50'
                }`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">
                  {language === "en" ? service.titleEn : service.title}
                </h3>
                <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {language === "en" ? service.descriptionEn : service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-24 px-6 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            {language === "en" 
              ? "What my Partners and Colleagues Say" 
              : "Lo que dicen mis Partners y Colegas"}
          </motion.h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {language === "en"
              ? "Real results based on trust and technical quality."
              : "Resultados reales basados en la confianza y la calidad técnica."}
          </p>
          <TestimonialsGrid isDark={isDark} />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              {language === "en" ? "Ready to Scale?" : "¿Listo para escalar?"}
            </h2>
            <p className={`text-center mb-12 ${isDark ? 'text-secondary' : 'text-slate-600'}`}>
              {language === "en"
                ? "Tell me about your project and let's build something great together."
                : "Cuéntame sobre tu proyecto y construyamos algo increíble juntos."}
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center py-16 rounded-2xl border ${
                  isDark 
                    ? 'bg-slate-900/50 border-slate-800' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === "en" ? "Message Sent!" : "¡Mensaje enviado!"}
                </h3>
                <p className={isDark ? 'text-secondary' : 'text-slate-600'}>
                  {language === "en"
                    ? "I'll get back to you within 24 hours."
                    : "Te responderé dentro de 24 horas."}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {language === "en" ? "Name" : "Nombre"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors ${
                        isDark 
                          ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors ${
                        isDark 
                          ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {language === "en" ? "Project Type" : "Tipo de Proyecto"}
                  </label>
                  <select
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors ${
                      isDark 
                        ? 'bg-slate-900 border-slate-800 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="">Selecciona una opción...</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {language === "en" ? "Message" : "Mensaje"}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none ${
                      isDark 
                        ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                    placeholder={language === "en" 
                      ? "Tell me about your project, goals, and timeline..." 
                      : "Cuéntame sobre tu proyecto, objetivos y cronograma..."}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark 
                      ? 'bg-primary text-slate-900 hover:bg-primary/90' 
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  {isSubmitting 
                    ? (language === "en" ? "Sending..." : "Enviando...")
                    : (language === "en" ? "Send Message" : "Enviar Mensaje")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
