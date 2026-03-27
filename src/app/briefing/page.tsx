"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

interface Prioridades {
  facilidad: number;
  velocidad: number;
  diseno: number;
  escalabilidad: number;
  seguridad: number;
  precio: number;
}

export default function BriefingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => { setMounted(true); }, []);

  const [tipo, setTipo] = useState<string[]>([]);
  const [tipoOtro, setTipoOtro] = useState("");
  const [plataforma, setPlataforma] = useState<string[]>([]);
  const [funciones, setFunciones] = useState<string[]>([]);
  const [funcionesOtro, setFuncionesOtro] = useState("");
  const [usuarios, setUsuarios] = useState("");
  const [roles, setRoles] = useState("");
  const [integraciones, setIntegraciones] = useState<string[]>([]);
  const [integracionesOtro, setIntegracionesOtro] = useState("");
  const [plazo, setPlazo] = useState("");
  const [fechaIdeal, setFechaIdeal] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [prioridades, setPrioridades] = useState<Prioridades>({
    facilidad: 3, velocidad: 3, diseno: 3,
    escalabilidad: 3, seguridad: 3, precio: 3,
  });
  const [negocio, setNegocio] = useState("");
  const [referencia, setReferencia] = useState("");
  const [contacto, setContacto] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setContactError] = useState(false);

  const toggleArray = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const handleSubmit = async () => {
    if (!contacto.trim()) {
      setContactError(true);
      setTimeout(() => setContactError(false), 2000);
      document.getElementById("contacto-input")?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo, tipoOtro, plataforma, funciones, funcionesOtro,
          usuarios, roles, integraciones, integracionesOtro,
          plazo, fechaIdeal, presupuesto, prioridades,
          negocio, referencia, contacto,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Shared styles
  const cardBase = isDark
    ? "bg-slate-900/40 border-slate-800"
    : "bg-white border-slate-200";
  const cardSelected = "border-primary bg-primary/10 text-primary";
  const cardUnselected = isDark
    ? "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300";
  const inputBase = isDark
    ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary"
    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-primary";
  const labelBase = `block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`;
  const dividerLabel = `text-xs font-semibold uppercase tracking-widest mb-3 mt-6 ${isDark ? "text-slate-500" : "text-slate-400"}`;

  const CheckCard = ({
    checked, onToggle, label, sub, radio,
  }: {
    checked: boolean; onToggle: () => void;
    label: string; sub?: string; radio?: boolean;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full px-4 py-3 rounded-lg border text-sm font-medium text-left transition-all ${checked ? cardSelected : cardUnselected}`}
    >
      <span className="flex items-start gap-2">
        <span className={`mt-0.5 flex-shrink-0 inline-flex items-center justify-center ${radio ? "rounded-full" : "rounded-sm"} border w-4 h-4 transition-all ${checked ? "border-primary bg-primary/20" : isDark ? "border-slate-600" : "border-slate-300"}`}>
          {checked && !radio && (
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="currentColor">
              <path d="M1.5 5l2.5 2.5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {checked && radio && <span className="block w-2 h-2 bg-current rounded-full" />}
        </span>
        <span>
          <span className="block leading-snug">{label}</span>
          {sub && <span className={`block text-xs mt-0.5 font-normal ${checked ? "opacity-70" : isDark ? "text-slate-500" : "text-slate-400"}`}>{sub}</span>}
        </span>
      </span>
    </button>
  );

  const SectionHeader = ({ num, title, sub }: { num: string; title: string; sub: string }) => (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="font-mono text-xs font-semibold" style={{ color: isDark ? "#64ffda" : "#0d9488" }}>{num}</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className={`text-sm ml-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{sub}</p>
    </div>
  );

  const sectionClass = `py-10 px-6 md:px-10 rounded-2xl border mb-6 ${cardBase}`;
  const textFieldClass = `w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors text-sm ${inputBase}`;

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
          <span className="text-sm font-medium">Volver</span>
        </a>
      </div>

      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse, rgba(100,255,218,0.15) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(13,148,136,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
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
            Briefing de Proyecto · Software a Medida
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Cuéntame sobre{" "}
            <span style={{ color: isDark ? "#64ffda" : "#0d9488" }}>
              tu proyecto
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg max-w-xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Este formulario me ayuda a entender exactamente lo que necesitas para ofrecerte una propuesta
            <strong className={isDark ? " text-white" : " text-slate-900"}> clara, precisa y ajustada a tu presupuesto.</strong>
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 pb-24">

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-20 rounded-2xl border ${cardBase}`}
          >
            <CheckCircle
              className="w-16 h-16 mx-auto mb-6"
              style={{ color: isDark ? "#64ffda" : "#0d9488" }}
            />
            <h3 className="text-2xl font-bold mb-3">¡Recibido con éxito!</h3>
            <p className={`max-w-sm mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Gracias por completar el briefing. Te contactaré en{" "}
              <strong className={isDark ? "text-white" : "text-slate-900"}>menos de 24 horas</strong>{" "}
              con una propuesta a medida.
            </p>
            <a
              href="/"
              className={`inline-block mt-8 px-6 py-3 rounded-lg font-medium text-sm transition-colors ${isDark
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              ← Volver al inicio
            </a>
          </motion.div>
        ) : (
          <>
            {/* ── 01: Tipo de Software ── */}
            <div className={sectionClass}>
              <SectionHeader num="01" title="Tipo de software" sub="¿Qué tipo de solución necesitas? Puedes elegir varias." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { value: "gestion-talleres", label: "Gestión de talleres", sub: "Control de órdenes, clientes, mecánicos y trabajos" },
                  { value: "crm", label: "CRM / Gestión de clientes", sub: "Seguimiento de contactos, historial y comunicaciones" },
                  { value: "inventario", label: "Inventario y almacén", sub: "Control de repuestos, stock y entradas/salidas" },
                  { value: "facturacion", label: "Facturación / Presupuestos", sub: "Generación de facturas, cotizaciones y cobros" },
                  { value: "agenda", label: "Agenda y citas", sub: "Reservas, calendario y recordatorios automáticos" },
                  { value: "reportes", label: "Reportes y estadísticas", sub: "Dashboard, KPIs y análisis del negocio" },
                ].map((item) => (
                  <CheckCard
                    key={item.value}
                    checked={tipo.includes(item.value)}
                    onToggle={() => toggleArray(tipo, setTipo, item.value)}
                    label={item.label}
                    sub={item.sub}
                  />
                ))}
              </div>
              <div className="mt-4">
                <label className={labelBase}>Otro tipo de software</label>
                <input
                  type="text"
                  className={textFieldClass}
                  placeholder="Describe brevemente qué tipo de software necesitas…"
                  value={tipoOtro}
                  onChange={(e) => setTipoOtro(e.target.value)}
                />
              </div>
            </div>

            {/* ── 02: Plataforma ── */}
            <div className={sectionClass}>
              <SectionHeader num="02" title="Plataforma" sub="¿Dónde necesitas que funcione tu software?" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { value: "web", label: "Web", sub: "Desde el navegador" },
                  { value: "mobile", label: "Mobile (App)", sub: "iOS y/o Android" },
                  { value: "desktop", label: "Desktop", sub: "Windows o Mac" },
                  { value: "ambos", label: "Web + Mobile", sub: "Multiplataforma" },
                ].map((item) => (
                  <CheckCard
                    key={item.value}
                    checked={plataforma.includes(item.value)}
                    onToggle={() => toggleArray(plataforma, setPlataforma, item.value)}
                    label={item.label}
                    sub={item.sub}
                  />
                ))}
              </div>
            </div>

            {/* ── 03: Funciones ── */}
            <div className={sectionClass}>
              <SectionHeader num="03" title="Funciones clave" sub="Marca todas las funcionalidades que deseas incluir" />

              <p className={dividerLabel}>Gestión operativa</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { value: "ordenes-trabajo", label: "Órdenes de trabajo" },
                  { value: "gestion-clientes", label: "Gestión de clientes" },
                  { value: "gestion-vehiculos", label: "Gestión de vehículos" },
                  { value: "asignacion-tecnicos", label: "Asignación de técnicos" },
                  { value: "control-repuestos", label: "Control de repuestos" },
                  { value: "historial-servicio", label: "Historial de servicio" },
                ].map((item) => (
                  <CheckCard key={item.value} checked={funciones.includes(item.value)}
                    onToggle={() => toggleArray(funciones, setFunciones, item.value)} label={item.label} />
                ))}
              </div>

              <p className={dividerLabel}>Comunicación y atención</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { value: "notificaciones-sms", label: "Notificaciones por SMS / Email" },
                  { value: "whatsapp", label: "Integración WhatsApp" },
                  { value: "portal-cliente", label: "Portal del cliente" },
                  { value: "citas-online", label: "Reserva de citas online" },
                ].map((item) => (
                  <CheckCard key={item.value} checked={funciones.includes(item.value)}
                    onToggle={() => toggleArray(funciones, setFunciones, item.value)} label={item.label} />
                ))}
              </div>

              <p className={dividerLabel}>Finanzas y reportes</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { value: "presupuestos", label: "Presupuestos automáticos" },
                  { value: "facturacion-electronica", label: "Facturación electrónica" },
                  { value: "caja-pagos", label: "Caja / Registro de pagos" },
                  { value: "reportes-dashboard", label: "Dashboard y reportes" },
                ].map((item) => (
                  <CheckCard key={item.value} checked={funciones.includes(item.value)}
                    onToggle={() => toggleArray(funciones, setFunciones, item.value)} label={item.label} />
                ))}
              </div>

              <div className="mt-4">
                <label className={labelBase}>Otras funciones que necesitas</label>
                <textarea
                  className={textFieldClass}
                  style={{ minHeight: 80, resize: "vertical" }}
                  placeholder="Escribe aquí las funciones adicionales que no están en la lista…"
                  value={funcionesOtro}
                  onChange={(e) => setFuncionesOtro(e.target.value)}
                />
              </div>
            </div>

            {/* ── 04: Usuarios ── */}
            <div className={sectionClass}>
              <SectionHeader num="04" title="Usuarios y accesos" sub="¿Cuántas personas usarán el sistema y con qué roles?" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { value: "1-2", label: "1 – 2 usuarios", sub: "Solo yo o con un socio" },
                  { value: "3-10", label: "3 – 10 usuarios", sub: "Equipo pequeño" },
                  { value: "10-50", label: "10 – 50 usuarios", sub: "Empresa mediana" },
                  { value: "50+", label: "Más de 50", sub: "Empresa grande" },
                ].map((item) => (
                  <CheckCard key={item.value} checked={usuarios === item.value}
                    onToggle={() => setUsuarios(item.value)} label={item.label} sub={item.sub} radio />
                ))}
              </div>
              <div className="mt-4">
                <label className={labelBase}>Roles necesarios (recepcionista, mecánico, administrador, etc.)</label>
                <input
                  type="text"
                  className={textFieldClass}
                  placeholder="Ej: Administrador, Mecánico, Recepcionista, Cliente…"
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                />
              </div>
            </div>

            {/* ── 05: Integraciones ── */}
            <div className={sectionClass}>
              <SectionHeader num="05" title="Integraciones" sub="¿El software necesita conectarse con otras herramientas?" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { value: "pasarela-pagos", label: "Pasarela de pagos", sub: "Stripe, PayPal, Mercado Pago…" },
                  { value: "contabilidad", label: "Software contable", sub: "QuickBooks, Contasol, SAGE…" },
                  { value: "google", label: "Google Workspace", sub: "Calendar, Drive, Gmail…" },
                  { value: "whatsapp-api", label: "WhatsApp Business API", sub: "Mensajes automáticos" },
                  { value: "ecommerce", label: "Tienda online", sub: "WooCommerce, Shopify…" },
                  { value: "ninguna", label: "Sin integraciones", sub: "Sistema independiente" },
                ].map((item) => (
                  <CheckCard key={item.value} checked={integraciones.includes(item.value)}
                    onToggle={() => toggleArray(integraciones, setIntegraciones, item.value)} label={item.label} sub={item.sub} />
                ))}
              </div>
              <div className="mt-4">
                <label className={labelBase}>Otras integraciones</label>
                <input
                  type="text"
                  className={textFieldClass}
                  placeholder="Indica qué herramientas usas actualmente…"
                  value={integracionesOtro}
                  onChange={(e) => setIntegracionesOtro(e.target.value)}
                />
              </div>
            </div>

            {/* ── 06: Plazo ── */}
            <div className={sectionClass}>
              <SectionHeader num="06" title="Plazo estimado" sub="¿Cuándo necesitas tener el software funcionando?" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { value: "urgente", label: "🔥 Urgente", sub: "Menos de 1 mes" },
                  { value: "1-3-meses", label: "📅 1 a 3 meses", sub: "Con algo de margen" },
                  { value: "3-6-meses", label: "📆 3 a 6 meses", sub: "Planificación mediana" },
                  { value: "flexible", label: "🔍 Flexible", sub: "Lo importante es hacerlo bien" },
                ].map((item) => (
                  <CheckCard key={item.value} checked={plazo === item.value}
                    onToggle={() => setPlazo(item.value)} label={item.label} sub={item.sub} radio />
                ))}
              </div>
              <div className="mt-4">
                <label className={labelBase}>Fecha ideal de entrega (opcional)</label>
                <input
                  type="text"
                  className={textFieldClass}
                  placeholder="Ej: Antes de junio 2026, para la temporada alta…"
                  value={fechaIdeal}
                  onChange={(e) => setFechaIdeal(e.target.value)}
                />
              </div>
            </div>

            {/* ── 07: Presupuesto ── */}
            <div className={sectionClass}>
              <SectionHeader num="07" title="Rango de presupuesto" sub="¿Con cuánto cuentas para este proyecto?" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { value: "300", label: "Hasta $300", sub: "Solución básica o MVP" },
                  { value: "500", label: "$300 – $500", sub: "Funcional y completo" },
                  { value: "1000", label: "$500 – $1,000", sub: "Robusto con integraciones" },
                  { value: "2000", label: "$1,000 – $2,000", sub: "Sistema avanzado y escalable" },
                  { value: "2000+", label: "Más de $2,000", sub: "Proyecto de largo alcance" },
                  { value: "no-definido", label: "Sin definir", sub: "Quiero recibir una propuesta primero" },
                ].map((item) => (
                  <CheckCard key={item.value} checked={presupuesto === item.value}
                    onToggle={() => setPresupuesto(item.value)} label={item.label} sub={item.sub} radio />
                ))}
              </div>
            </div>

            {/* ── 08: Prioridades ── */}
            <div className={sectionClass}>
              <SectionHeader num="08" title="Prioridades del proyecto" sub="Desliza para indicar qué tan importante es cada aspecto (1 = poco, 5 = muy importante)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {([
                  { key: "facilidad", label: "Facilidad de uso" },
                  { key: "velocidad", label: "Velocidad de entrega" },
                  { key: "diseno", label: "Diseño visual" },
                  { key: "escalabilidad", label: "Escalabilidad futura" },
                  { key: "seguridad", label: "Seguridad de datos" },
                  { key: "precio", label: "Precio ajustado" },
                ] as { key: keyof Prioridades; label: string }[]).map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{label}</span>
                      <span
                        className="text-xs font-mono font-semibold tabular-nums px-2 py-0.5 rounded"
                        style={{
                          background: isDark ? "rgba(100,255,218,0.1)" : "rgba(13,148,136,0.1)",
                          color: isDark ? "#64ffda" : "#0d9488",
                        }}
                      >
                        {prioridades[key]} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={prioridades[key]}
                      onChange={(e) => setPrioridades((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                      className="w-full h-1 rounded cursor-pointer accent-primary"
                      style={{ accentColor: isDark ? "#64ffda" : "#0d9488" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── 09: Contexto ── */}
            <div className={sectionClass}>
              <SectionHeader num="09" title="Contexto adicional" sub="Cuéntame todo lo que consideres importante" />
              <div className="space-y-4">
                <div>
                  <label className={labelBase}>¿Cómo funciona tu negocio actualmente?</label>
                  <textarea
                    className={textFieldClass}
                    style={{ minHeight: 100, resize: "vertical" }}
                    placeholder="Describe brevemente qué haces, cómo gestionas los procesos hoy y qué problema quieres resolver…"
                    value={negocio}
                    onChange={(e) => setNegocio(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelBase}>¿Tienes alguna referencia o software que te gusta?</label>
                  <input
                    type="text"
                    className={textFieldClass}
                    placeholder="Ej: Me gusta cómo funciona X, o el diseño de Y…"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelBase}>
                    Nombre y correo / WhatsApp de contacto{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contacto-input"
                    type="text"
                    className={`${textFieldClass} ${contactError ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="Tu nombre · correo@ejemplo.com · +1 000 000 0000"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                  />
                  {contactError && (
                    <p className="text-red-400 text-xs mt-1">El campo de contacto es obligatorio.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <p className={`text-xs text-center ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                🔒 Tu información es confidencial y solo se usará para preparar tu propuesta.
              </p>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-5 font-bold rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 text-lg shadow-lg hover:shadow-xl"
                style={{
                  background: submitting
                    ? "#64748b"
                    : "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  color: "#fff",
                  boxShadow: submitting ? "none" : "0 8px 32px rgba(245,158,11,0.35)",
                }}
              >
                <Send className={`w-5 h-5 ${submitting ? "animate-pulse" : ""}`} />
                {submitting ? "Enviando…" : "Enviar briefing"}
              </button>
              <p className={`text-xs text-center ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                Me comprometo a responderte en menos de 24 horas con una propuesta inicial.<br />
                <strong className={isDark ? "text-slate-500" : "text-slate-500"}>reinaldotineo.online</strong>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className={`py-8 text-center border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <p className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
          © 2025 Reinaldo Tineo · Desarrollo de Software a Medida
        </p>
      </div>
    </div>
  );
}
