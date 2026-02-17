"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Database, Server, Cpu, Globe, AlertCircle, RefreshCw, ChevronUp, HardDrive } from "lucide-react";

interface ServiceHealth {
  status: "up" | "down";
  latency_ms?: number;
  details?: string;
  service_status?: string;
}

interface SystemStatusResponse {
  global_status: "healthy" | "unhealthy";
  timestamp: string;
  total_check_time_ms: number;
  services: {
    database: ServiceHealth;
    redis: ServiceHealth;
    ai_service: ServiceHealth;
    scraper_service: ServiceHealth;
  };
  droplet?: {
    name: string;
    region: string;
    cpu_usage: number;
  };
}

const API_URL = "/api/system-status";
const POLLING_INTERVAL = 30000;

function getStatusColor(status: string) {
  switch (status) {
    case "up":
      return "bg-emerald-500";
    case "down":
      return "bg-red-500";
    default:
      return "bg-slate-500";
  }
}

function getStatusTextColor(status: string) {
  switch (status) {
    case "up":
      return "text-emerald-600 dark:text-emerald-400";
    case "down":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-slate-500";
  }
}

function getStatusBgColor(status: string) {
  switch (status) {
    case "up":
      return "bg-emerald-100 dark:bg-emerald-500/20";
    case "down":
      return "bg-red-100 dark:bg-red-500/20";
    default:
      return "bg-slate-100 dark:bg-slate-500/20";
  }
}

const serviceConfig = {
  database: {
    name: "Base de Datos",
    nameEn: "Database",
    icon: Database,
  },
  redis: {
    name: "Redis Cache",
    nameEn: "Redis Cache",
    icon: Server,
  },
  ai_service: {
    name: "IA Service",
    nameEn: "AI Service",
    icon: Cpu,
  },
  scraper_service: {
    name: "Scraper",
    nameEn: "Scraper",
    icon: Globe,
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

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-md ${getStatusBgColor(service.status)}`}>
          <Icon className={`w-3.5 h-3.5 ${getStatusTextColor(service.status)}`} />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-slate-200">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        {service.latency_ms && (
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 ml-auto tabular-nums">
            {service.latency_ms}ms
          </span>
        )}
        <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)} shadow-sm`} />
      </div>
    </div>
  );
}

export default function SystemStatusWidget() {
  const [data, setData] = useState<SystemStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "es">("es");
  const [isExpanded, setIsExpanded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const labels = {
    header: language === "es" ? "Estado del Sistema" : "System Health",
    loading: language === "es" ? "Cargando..." : "Loading...",
    error: language === "es" ? "Error al conectar" : "Connection error",
    operational: language === "es" ? "Todo Normal" : "All Systems Normal",
    degraded: language === "es" ? "Sistema Degradado" : "Systems Degraded",
    button: language === "es" ? "Estado" : "Status",
    cpu: language === "es" ? "CPU" : "CPU",
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as "en" | "es" | null;
    if (storedLang) setLanguage(storedLang);
    fetchStatus();
    const interval = setInterval(fetchStatus, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const globalStatus = data?.global_status === "healthy" ? "up" : "down";
  const globalStatusColor = getStatusColor(globalStatus);

  return (
    <div ref={widgetRef} className="relative w-full max-w-[220px]">
      {isExpanded && (
        <div className="absolute bottom-full left-0 mb-3 w-72 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden z-50 transform origin-bottom-left transition-all duration-200 ease-out">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {labels.header}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                {data ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
              </span>
              <button
                onClick={fetchStatus}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Refresh"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-2 space-y-1">
            {loading ? (
              <div className="p-4 text-center text-sm text-gray-500">{labels.loading}</div>
            ) : error ? (
              <div className="flex items-center gap-2 p-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            ) : (
              Object.entries(data?.services || {}).map(([key, service]) => (
                <ServiceItem
                  key={key}
                  serviceKey={key as keyof typeof serviceConfig}
                  service={service as ServiceHealth}
                  language={language}
                />
              ))
            )}
          </div>

          {data?.droplet && (
            <div className="px-4 py-2 bg-gray-50/80 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
              <HardDrive className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                {data.droplet.cpu_usage.toFixed(0)}% {labels.cpu}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                • {data.droplet.region}
              </span>
            </div>
          )}

          <div className="px-4 py-2 bg-gray-50/80 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${globalStatusColor} animate-pulse`} />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {data?.global_status === 'healthy' ? labels.operational : labels.degraded}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-full 
          bg-white/60 dark:bg-gray-900/40 backdrop-blur-md 
          border border-gray-200 dark:border-white/10 
          hover:bg-white/80 dark:hover:bg-gray-800/60 
          hover:border-gray-300 dark:hover:border-white/20 
          transition-all duration-300 group shadow-sm`}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${globalStatusColor}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${globalStatusColor}`}></span>
          </div>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {labels.button}
          </span>
        </div>
        <ChevronUp className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
