"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/LanguageContext";
import { Send, CheckCircle, ArrowLeft, Zap, Shield, Rocket } from "lucide-react";

const roles = [
    { value: "founder", label: "Founder / CEO" },
    { value: "cto", label: "CTO / Architect" },
    { value: "tech-lead", label: "Tech Lead" },
    { value: "dev", label: "Developer" },
    { value: "pm", label: "Product Manager" },
    { value: "otro", label: "Otro" },
];

const projectStages = [
    { value: "idea", label: "💡 Idea / Pre-MVP" },
    { value: "mvp", label: "🚀 MVP lanzado" },
    { value: "crecimiento", label: "📈 En crecimiento" },
    { value: "escala", label: "⚡ Escalando / Optimizando" },
];

const mainChallenges = [
    { value: "velocidad", label: "⚡ Velocidad de desarrollo muy lenta" },
    { value: "escalabilidad", label: "📉 El servidor se cae bajo carga" },
    { value: "integraciones", label: "🔗 Integraciones complejas o rotas" },
    { value: "arquitectura", label: "🏗️ Arquitectura caótica / deuda técnica" },
    { value: "ia", label: "🤖 Necesito integrar IA / automatización" },
    { value: "migracion", label: "🔄 Migración a microservicios" },
    { value: "otro", label: "Otro" },
];

const teamSizes = [
    { value: "solo", label: "Solo / Freelance" },
    { value: "2-5", label: "2 – 5 personas" },
    { value: "6-15", label: "6 – 15 personas" },
    { value: "15+", label: "15+ personas" },
];

const urgencies = [
    { value: "urgente", label: "🔥 Necesito ayuda ya" },
    { value: "semanas", label: "📅 En las próximas semanas" },
    { value: "explorando", label: "🔍 Explorando opciones" },
];

const services = [
    {
        icon: "🗺️",
        title: "Arquitectura de Software",
        desc: "Diseño de sistemas escalables, microservicios, bases de datos optimizadas y revisión de arquitecturas existentes (auditorías).",
    },
    {
        icon: "💻",
        title: "Desarrollo Custom",
        desc: "Construcción de backends robustos, integraciones de IA (RAG), automatizaciones complejas y APIs de alto rendimiento.",
    },
    {
        icon: "⚙️",
        title: "Mantenimiento & Optimización",
        desc: "Refactorización de código legacy, resolución de cuellos de botella (performance), migraciones cloud y DevOps.",
    },
];

const steps = [
    {
        number: "01",
        title: "Agenda la consulta",
        description: "Llena el formulario de 2 minutos. Es gratuito, sin compromiso.",
        icon: Rocket,
    },
    {
        number: "02",
        title: "Diagnóstico técnico",
        description: "Revisamos juntos tu arquitectura, cuellos de botella y riesgos críticos.",
        icon: Zap,
    },
    {
        number: "03",
        title: "Plan de acción claro",
        description: "Recibes recomendaciones concretas que puedes implementar de inmediato.",
        icon: Shield,
    },
];

const profiles = [
    {
        icon: "🏗️",
        title: "Startups con tracción",
        desc: "Tu app funciona pero crece y empieza a fallar. Necesitas un backend sólido antes de escalar marketing.",
    },
    {
        icon: "⚡",
        title: "Equipos sin CTO técnico",
        desc: "Tienes devs buenos pero nadie toma decisiones de arquitectura. Yo me integro como tu Tech Lead externo.",
    },
    {
        icon: "🔄",
        title: "Proyectos con deuda técnica",
        desc: "El código legacy frena cada feature nueva. Trazamos una ruta de migración sin parar producción.",
    },
];

export default function ConsultaTecnicaPage() {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const isDark = mounted ? theme === "dark" : true;

    useEffect(() => {
        setMounted(true);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        projectStage: "",
        mainChallenge: "",
        teamSize: "",
        urgency: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
        else if (formData.name.length < 2) newErrors.name = "El nombre es muy corto";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) newErrors.email = "El email es requerido";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Formato de email inválido";

        if (!formData.role) newErrors.role = "Selecciona tu rol";
        if (!formData.projectStage) newErrors.projectStage = "Selecciona la etapa del proyecto";
        if (!formData.mainChallenge) newErrors.mainChallenge = "Selecciona tu desafío principal";
        if (!formData.teamSize) newErrors.teamSize = "Selecciona el tamaño del equipo";
        if (!formData.urgency) newErrors.urgency = "Selecciona tu urgencia";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setGeneralError("Por favor completa todos los campos requeridos correctamente.");

            // Auto-scroll to the first error after a short delay
            setTimeout(() => {
                const firstErrorElement = document.querySelector('.border-red-500');
                if (firstErrorElement) {
                    firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 50);

            return false;
        }

        setGeneralError("");
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await fetch("/api/consulta-tecnica", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setSubmitted(true);
            setGeneralError("");
        } catch (error) {
            console.error("Form submission error:", error);
            setGeneralError("Hubo un error al enviar tu consulta. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = (field: string) =>
        `w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors ${errors[field]
            ? "border-red-500 focus:border-red-500"
            : isDark
                ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
        }`;

    const labelClass = `block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`;

    return (
        <div className={`min-h-screen ${isDark ? "bg-slate-950" : "bg-white"} text-foreground`}>
            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <a
                    href="/"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${isDark
                        ? "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                        : "bg-white/80 text-slate-700 hover:bg-slate-100 shadow-lg"
                        }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">{t("consulta.back")}</span>
                </a>
            </div>

            {/* ─── HERO ─── */}
            <section className="relative py-32 px-6 overflow-hidden">
                {/* Background glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
                    style={{
                        background: isDark
                            ? "radial-gradient(ellipse, rgba(100,255,218,0.15) 0%, transparent 70%)"
                            : "radial-gradient(ellipse, rgba(13,148,136,0.1) 0%, transparent 70%)",
                    }}
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border font-mono text-xs font-semibold tracking-wider uppercase"
                        style={{
                            background: isDark ? "rgba(100,255,218,0.08)" : "rgba(13,148,136,0.08)",
                            borderColor: isDark ? "rgba(100,255,218,0.25)" : "rgba(13,148,136,0.25)",
                            color: isDark ? "#64ffda" : "#0d9488",
                        }}
                    >
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        {t("consulta.badge")}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        {language === "es" ? "Prepara tu plataforma " : "Prepare your platform "}
                        <span style={{ color: isDark ? "#64ffda" : "#0d9488" }}>
                            {language === "es" ? "para el siguiente nivel" : "for the next level"}
                        </span>{" "}
                        {language === "es" ? "de crecimiento." : "of growth."}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        {language === "es" ? (
                            <>
                                Soy especialista en <strong className={isDark ? "text-white" : "text-slate-900"}>Arquitectura de Software & Microservicios</strong>. Me integro a tu equipo como un recurso invisible para resolver la ingeniería pesada — sin fricción, sin curva de aprendizaje.
                            </>
                        ) : (
                            <>
                                I'm a specialist in <strong className={isDark ? "text-white" : "text-slate-900"}>Software Architecture & Microservices</strong>. I integrate into your team as an invisible resource to solve heavy engineering — without friction, without a learning curve.
                            </>
                        )}
                    </motion.p>

                    {/* Value props */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        {[
                            language === "es" ? "✅ Recupera la velocidad de desarrollo" : "✅ Recover development speed",
                            language === "es" ? "✅ Lanza sin miedo a que el servidor se caiga" : "✅ Launch without fear of server crashes",
                            language === "es" ? "✅ Backend robusto y escalable" : "✅ Robust and scalable backend",
                        ].map((prop) => (
                            <span
                                key={prop}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${isDark
                                    ? "bg-slate-800/60 text-slate-300 border border-slate-700"
                                    : "bg-slate-50 text-slate-700 border border-slate-200"
                                    }`}
                            >
                                {prop}
                            </span>
                        ))}
                    </motion.div>

                    <motion.a
                        href="#formulario"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="inline-block px-10 py-5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0"
                        style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                            color: "#fff",
                            boxShadow: "0 8px 32px rgba(245,158,11,0.35)",
                        }}
                    >
                        {language === "es" ? "👉 Agenda tu consulta gratuita" : "👉 Schedule your free consultation"}
                    </motion.a>
                </div>
            </section>

            {/* ─── SERVICIOS OFRECIDOS ─── */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿En qué te puedo ayudar?</h2>
                        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Mi enfoque es 100% técnico. Aporto infraestructura, código y estrategia a tu proyecto.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((srv, i) => (
                            <motion.div
                                key={srv.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-8 rounded-2xl border transition-all duration-300 ${isDark
                                    ? "bg-slate-900/40 border-slate-800 hover:bg-slate-900/80"
                                    : "bg-white border-slate-200 hover:shadow-md"
                                    }`}
                            >
                                <div className="text-4xl mb-6">{srv.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{srv.title}</h3>
                                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {srv.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className={`py-24 px-6 ${isDark ? "bg-slate-900/40 border-y border-slate-800" : "bg-slate-50 border-y border-slate-200"}`}>
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4 text-center"
                    >
                        {t("consulta.howItWorks")}
                    </motion.h2>
                    <p className={`text-center mb-16 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {t("consulta.howItWorksSub")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { number: "01", title: t("consulta.step1.title"), description: t("consulta.step1.desc"), icon: Rocket },
                            { number: "02", title: t("consulta.step2.title"), description: t("consulta.step2.desc"), icon: Zap },
                            { number: "03", title: t("consulta.step3.title"), description: t("consulta.step3.desc"), icon: Shield },
                        ].map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`relative p-8 rounded-2xl border text-center ${isDark
                                    ? "bg-slate-900/60 border-slate-800"
                                    : "bg-white border-slate-200"
                                    }`}
                            >
                                <div
                                    className="text-5xl font-black mb-4 font-mono"
                                    style={{ color: isDark ? "rgba(100,255,218,0.15)" : "rgba(13,148,136,0.12)" }}
                                >
                                    {step.number}
                                </div>
                                <step.icon
                                    className="w-8 h-8 mx-auto mb-4"
                                    style={{ color: isDark ? "#64ffda" : "#0d9488" }}
                                />
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FOR WHOM ─── */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4 text-center"
                    >
                        {t("consulta.forWhom")}
                    </motion.h2>
                    <p className={`text-center mb-16 max-w-xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {t("consulta.forWhomSub")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: "🏗️", title: t("consulta.profile1.title"), desc: t("consulta.profile1.desc") },
                            { icon: "⚡", title: t("consulta.profile2.title"), desc: t("consulta.profile2.desc") },
                            { icon: "🔄", title: t("consulta.profile3.title"), desc: t("consulta.profile3.desc") },
                        ].map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-[0_0_40px_rgba(100,255,218,0.08)] ${isDark
                                    ? "bg-slate-900/50 border-slate-800 hover:border-primary/40"
                                    : "bg-white border-slate-200 hover:border-primary/40"
                                    }`}
                            >
                                <div className="text-4xl mb-4">{p.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {p.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FORM ─── */}
            <section
                id="formulario"
                className={`py-24 px-6 ${isDark ? "bg-slate-900/40 border-t border-slate-800" : "bg-slate-50 border-t border-slate-200"}`}
            >
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                            {t("consulta.form.title")}
                        </h2>
                        <p className={`text-center mb-12 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            {t("consulta.form.subtitle")}
                        </p>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`text-center py-16 rounded-2xl border ${isDark
                                    ? "bg-slate-900/50 border-slate-800"
                                    : "bg-white border-slate-200"
                                    }`}
                            >
                                <CheckCircle
                                    className="w-16 h-16 mx-auto mb-6"
                                    style={{ color: isDark ? "#64ffda" : "#0d9488" }}
                                />
                                <h3 className="text-2xl font-bold mb-3">{t("consulta.form.success")}</h3>
                                <p className={`max-w-sm mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {language === "es" ? (
                                        <>
                                            Recibí tu solicitud. Te contactaré en{" "}
                                            <strong className={isDark ? "text-white" : "text-slate-900"}>
                                                menos de 24 horas
                                            </strong>{" "}
                                            para coordinar la sesión.
                                        </>
                                    ) : (
                                        <>
                                            I received your request. I'll contact you in{" "}
                                            <strong className={isDark ? "text-white" : "text-slate-900"}>
                                                less than 24 hours
                                            </strong>{" "}
                                            to schedule the session.
                                        </>
                                    )}
                                </p>
                                <a
                                    href="/"
                                    className={`inline-block mt-8 px-6 py-3 rounded-lg font-medium text-sm transition-colors ${isDark
                                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                >
                                    {t("consulta.backHome")}
                                </a>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* General Error Alert */}
                                {generalError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 mb-6 border border-red-500/50 bg-red-500/10 rounded-xl flex items-start gap-3 text-red-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        <p className="text-sm font-medium">{generalError}</p>
                                    </motion.div>
                                )}

                                {/* Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>{t("consulta.form.name")}</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            placeholder={language === "es" ? "Ej: Carlos Rodríguez" : "Ex: John Smith"}
                                            onChange={(e) => {
                                                setFormData({ ...formData, name: e.target.value });
                                                if (errors.name) setErrors({ ...errors, name: "" });
                                            }}
                                            className={inputClass("name")}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t("consulta.form.email")}</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            placeholder={language === "es" ? "carlos@empresa.com" : "john@company.com"}
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                                if (errors.email) setErrors({ ...errors, email: "" });
                                            }}
                                            className={inputClass("email")}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Role */}
                                <div>
                                    <label className={labelClass}>{t("consulta.form.role")}</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => {
                                            setFormData({ ...formData, role: e.target.value });
                                            if (errors.role) setErrors({ ...errors, role: "" });
                                        }}
                                        className={inputClass("role")}
                                    >
                                        <option value="">{t("consulta.form.rolePlaceholder")}</option>
                                        {roles.map((r) => (
                                            <option key={r.value} value={r.value}>
                                                {r.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                                </div>

                                {/* Project Stage */}
                                <div>
                                    <label className={labelClass}>{t("consulta.form.projectStage")}</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {projectStages.map((stage) => (
                                            <button
                                                key={stage.value}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, projectStage: stage.value });
                                                    if (errors.projectStage) setErrors({ ...errors, projectStage: "" });
                                                }}
                                                className={`px-4 py-3 rounded-lg border text-sm font-medium text-left transition-all ${formData.projectStage === stage.value
                                                    ? `border-primary bg-primary/10 ${isDark ? "text-primary" : "text-primary"}`
                                                    : isDark
                                                        ? "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                                    }`}
                                            >
                                                {stage.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.projectStage && (
                                        <p className="text-red-500 text-xs mt-1">{errors.projectStage}</p>
                                    )}
                                </div>

                                {/* Main Challenge */}
                                <div>
                                    <label className={labelClass}>{t("consulta.form.mainChallenge")}</label>
                                    <select
                                        value={formData.mainChallenge}
                                        onChange={(e) => {
                                            setFormData({ ...formData, mainChallenge: e.target.value });
                                            if (errors.mainChallenge) setErrors({ ...errors, mainChallenge: "" });
                                        }}
                                        className={inputClass("mainChallenge")}
                                    >
                                        <option value="">{t("consulta.form.mainChallengePlaceholder")}</option>
                                        {mainChallenges.map((c) => (
                                            <option key={c.value} value={c.value}>
                                                {c.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.mainChallenge && (
                                        <p className="text-red-500 text-xs mt-1">{errors.mainChallenge}</p>
                                    )}
                                </div>

                                {/* Team Size */}
                                <div>
                                    <label className={labelClass}>{t("consulta.form.teamSize")}</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {teamSizes.map((ts) => (
                                            <button
                                                key={ts.value}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, teamSize: ts.value });
                                                    if (errors.teamSize) setErrors({ ...errors, teamSize: "" });
                                                }}
                                                className={`px-3 py-3 rounded-lg border text-sm font-medium text-center transition-all ${formData.teamSize === ts.value
                                                    ? `border-primary bg-primary/10 ${isDark ? "text-primary" : "text-primary"}`
                                                    : isDark
                                                        ? "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                                    }`}
                                            >
                                                {ts.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.teamSize && (
                                        <p className="text-red-500 text-xs mt-1">{errors.teamSize}</p>
                                    )}
                                </div>

                                {/* Urgency */}
                                <div>
                                    <label className={labelClass}>{t("consulta.form.urgency")}</label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {urgencies.map((u) => (
                                            <button
                                                key={u.value}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, urgency: u.value });
                                                    if (errors.urgency) setErrors({ ...errors, urgency: "" });
                                                }}
                                                className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium text-center transition-all ${formData.urgency === u.value
                                                    ? `border-primary bg-primary/10 ${isDark ? "text-primary" : "text-primary"}`
                                                    : isDark
                                                        ? "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                                    }`}
                                            >
                                                {u.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.urgency && (
                                        <p className="text-red-500 text-xs mt-1">{errors.urgency}</p>
                                    )}
                                </div>

                                {/* Privacy note */}
                                <p className={`text-xs text-center ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                    🔒 {t("consulta.form.privacy")}
                                </p>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 font-bold rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 text-lg shadow-lg hover:shadow-xl"
                                    style={{
                                        background: isSubmitting
                                            ? "#64748b"
                                            : "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                                        color: "#fff",
                                        boxShadow: isSubmitting ? "none" : "0 8px 32px rgba(245,158,11,0.35)",
                                    }}
                                >
                                    <Send className={`w-5 h-5 ${isSubmitting ? "animate-pulse" : ""}`} />
                                    {isSubmitting ? t("consulta.form.submitting") : t("consulta.form.submit")}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ─── FOOTER STRIP ─── */}
            <div className={`py-8 text-center border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                <p className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    © {new Date().getFullYear()} Reinaldo Tineo · Arquitectura de Software & Microservicios
                </p>
            </div>
        </div>
    );
}
