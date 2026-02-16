"use client";

import { useState, useEffect } from "react";
import { Activity, Database, Server, Cpu, Globe, AlertCircle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface ServiceHealth {
  status: "operational" | "degraded" | "down";
  latency?: string;
  type?: string;
  meta?: string;
}

interface SystemStatusResponse {
  global_status: "operational" | "degraded" | "down";
  timestamp: string;
  services: {
    database: ServiceHealth;
    redis: ServiceHealth;
    ai_engine: ServiceHealth;
    scraper_engine: ServiceHealth;
  };
}

const POLLING_INTERVAL = 30000;

function getStatusColor(status: ServiceHealth["status"]) {
  switch (status) {
    case "operational":
      return "bg-emerald-500";
    case "degraded":
      return "bg-amber-500";
    case "down":
      return "bg-red-500";
    default:
      return "bg-slate-500";
  }
}

function getStatusTextColor(status: ServiceHealth["status"]) {
  switch (status) {
    case "operational":
      return "text-emerald-400";
    case "degraded":
      return "text-amber-400";
    case "down":
      return "text-red-400";
    default:
      return "text-slate-400";
  }
}

function getStatusLabel(status: ServiceHealth["status"], language: "en" | "es") {
  switch (status) {
    case "operational":
      return language === "en" ? "Operational" : "Operativo";
    case "degraded":
      return language === "en" ? "Degraded" : "Degradado";
    case "down":
      return language === "en" ? "Down" : "Caído";
    default:
      return language === "en" ? "Unknown" : "Desconocido";
  }
}

function getGlobalStatusLabel(status: SystemStatusResponse["global_status"], language: "en" | "es") {
  switch (status) {
    case "operational":
      return language === "en" ? "All systems operational" : "Todos los servicios operativos";
    case "degraded":
      return language === "en" ? "Some services degraded" : "Algunos servicios degradados";
    case "down":
      return language === "en" ? "System offline" : "Sistema fuera de línea";
    default:
      return language === "en" ? "Unknown status" : "Estado desconocido";
  }
}

const serviceConfig = {
  database: {
    name: "Database",
    nameEn: "Database",
    icon: Database,
    tooltip: "",
    tooltipEn: "",
  },
  redis: {
    name: "Redis Cache",
    nameEn: "Redis Cache",
    icon: Server,
    tooltip: "",
    tooltipEn: "",
  },
  ai_engine: {
    name: "AI Engine",
    nameEn: "AI Engine",
    icon: Cpu,
    tooltip: "Gemini & pgVector",
    tooltipEn: "Gemini & pgVector",
  },
  scraper_engine: {
    name: "Scraper",
    nameEn: "Scraper",
    icon: Globe,
    tooltip: "JobSpy + Custom",
    tooltipEn: "JobSpy + Custom",
  },
};

function ServiceItem({
  serviceKey,
  service,
  language,
}: {
  serviceKey: keyof typeof serviceConfig;
  service: ServiceHealth;
  language: "en" | "es";
}) {
  const Icon = serviceConfig[serviceKey].icon;
  const name = language === "en" ? serviceConfig[serviceKey].nameEn : serviceConfig[serviceKey].name;
  const tooltip = language === "en" ? serviceConfig[serviceKey].tooltipEn : serviceConfig[serviceKey].tooltip;
  const isOperational = service.status === "operational";

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-md ${isOperational ? "bg-emerald-500/20" : service.status === "degraded" ? "bg-amber-500/20" : "bg-red-500/20"}`}>
          <Icon className={`w-3.5 h-3.5 ${getStatusTextColor(service.status)}`} />
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-slate-200">{name}</span>
          {tooltip && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {tooltip}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {service.latency && (
          <span className="text-xs font-mono text-slate-500">{service.latency}</span>
        )}
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${getStatusColor(service.status)} ${
              isOperational ? "animate-pulse" : ""
            }`}
          />
          <span className={`text-xs ${getStatusTextColor(service.status)}`}>
            {getStatusLabel(service.status, language)}
          </span>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="p-3 space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-white/10 animate-pulse" />
            <div className="w-20 h-3 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="w-16 h-3 bg-white/10 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default function SystemStatusWidget() {
  const [data, setData] = useState<SystemStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/system-status");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch {
      setError("Unable to load status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as "en" | "es" | null;
    if (storedLang) setLanguage(storedLang);
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const globalStatusColor = getStatusColor(data?.global_status || "operational");
  const globalTextColor = getStatusTextColor(data?.global_status || "operational");
  const globalLabel = data ? getGlobalStatusLabel(data.global_status, language) : (language === "en" ? "Loading..." : "Cargando...");

  return (
    <div className="w-full max-w-xs md:max-w-sm">
      {/* Minimized Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:border-slate-600/50 transition-all group"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Activity className="w-4 h-4 text-cyan-400" />
            {!loading && data?.global_status === "operational" && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${loading ? "bg-slate-500" : globalStatusColor} ${
                !loading && data?.global_status === "operational" ? "animate-pulse" : ""
              }`}
            />
            <span className="text-sm font-medium text-slate-200">
              {loading ? (language === "en" ? "Loading..." : "Cargando...") : globalLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!loading && data && (
            <span className="text-[10px] text-slate-500 font-mono">
              {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50 overflow-hidden">
          {loading ? (
            <LoadingSkeleton />
          ) : error || !data ? (
            <div className="p-3">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-xs text-red-300">{error || "Error loading status"}</span>
                <button
                  onClick={fetchStatus}
                  className="ml-auto p-1 rounded hover:bg-white/10 transition-colors"
                >
                  <RefreshCw className="w-3 h-3 text-red-400" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-2 border-b border-slate-700/50 flex justify-end">
                <button
                  onClick={fetchStatus}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  title={language === "en" ? "Refresh" : "Actualizar"}
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400 hover:text-slate-200" />
                </button>
              </div>
              <div className="p-2 space-y-0.5">
                {Object.entries(data.services).map(([key, service]) => (
                  <ServiceItem
                    key={key}
                    serviceKey={key as keyof typeof serviceConfig}
                    service={service}
                    language={language}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
