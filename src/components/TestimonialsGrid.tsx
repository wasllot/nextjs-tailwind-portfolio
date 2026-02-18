"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  contentEn: string;
  stack: string;
  roleEn: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Oscar López",
    role: "Backend Software Developer",
    roleEn: "Backend Software Developer",
    company: "Delight Distribuidores Chile",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=OscarL",
    content: "Conozco a Reinaldo desde su auge hace 6 años. Trabajamos codo a codo en proyectos como DLDS y Astrogrowshop, donde siempre aportó un valor técnico enorme. Su calidad es tal que, al retirarme, no tuve dudas en dejarlo como encargado. Es un desarrollador en quien puedes confiar ciegamente.",
    contentEn: "I've known Reinaldo since his peak 6 years ago. We worked side by side on projects like DLDS and Astrogrowshop, where he always contributed enormous technical value. His quality is such that, when I retired, I had no doubts leaving him in charge. He's a developer you can trust blindly.",
    stack: "Laravel + Prestashop + SQL Server",
  },
  {
    id: 2,
    name: "Arturo Díaz",
    role: "System Engineer",
    roleEn: "System Engineer",
    company: "BioDiagnistico Venezuela",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArturoD",
    content: "Tras años colaborar en múltiples proyectos, puedo decir que Reinaldo es un experto gestionando equipos y 'apagando incendios'. No solo es un excelente desarrollador, sino que tiene una capacidad resolutiva admirable ante situaciones críticas.",
    contentEn: "After years of collaborating on multiple projects, I can say that Reinaldo is an expert at managing teams and 'putting out fires'. He is not only an excellent developer, but also has admirable problem-solving ability in critical situations.",
    stack: "DevOps + System Administration",
  },
  {
    id: 3,
    name: "A. Abarzua",
    role: "Systems Analyst",
    roleEn: "Systems Analyst",
    company: "Delight Distribuidores Chile",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AAbarzua",
    content: "Reinaldo fue un pilar fundamental en la etapa final de mi formación universitaria. Luego tuve la suerte de trabajar con él en el ecosistema DLDS. Es ese tipo de colega que siempre tiene una solución bajo la manga para cualquier problema técnico.",
    contentEn: "Reinaldo was a fundamental pillar in the final stage of my university education. Later I was lucky enough to work with him on the DLDS ecosystem. He's the kind of colleague who always has a solution up his sleeve for any technical problem.",
    stack: "Laravel + React + Django + PostgreSQL",
  },
  {
    id: 4,
    name: "Oscar Cota",
    role: "CEO",
    roleEn: "CEO",
    company: "Cuantica.Agency México",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=OscarC",
    content: "Tener a Reinaldo en el equipo me da total tranquilidad como CEO. Su capacidad para aportar valor y apoyar al resto del equipo es fundamental para el funcionamiento de la agencia.",
    contentEn: "Having Reinaldo on the team gives me total peace of mind as CEO. His ability to contribute value and support the rest of the team is fundamental to the agency's operation.",
    stack: "Full Stack Developer + WordPress + SEO",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TestimonialsGrid({ isDark = true }: { isDark?: boolean }) {
  const { language } = useLanguage();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          variants={itemVariants}
          className={`relative border rounded-2xl p-6 hover:border-slate-700 transition-colors group ${
            isDark 
              ? 'bg-slate-900/50 border-slate-800' 
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full">
              {testimonial.stack}
            </span>
          </div>

          <Quote className="w-8 h-8 text-primary/30 mb-4" />

          <p className={`leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {language === "en" ? testimonial.contentEn : testimonial.content}
          </p>

          <div className="flex items-center gap-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className={`w-12 h-12 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
            />
            <div>
              <h4 className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{testimonial.name}</h4>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {language === "en" ? testimonial.roleEn : testimonial.role} @ {testimonial.company}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
