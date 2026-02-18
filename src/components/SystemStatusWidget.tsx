"use client";

import { useState, useEffect, useRef } from "react";
import { Database, Server, Cpu, Globe, AlertCircle, RefreshCw, ChevronUp, HardDrive } from "lucide-react";
import { useTheme } from "next-themes";

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
    status: string;
    ip_address: string;
  };
}

const API_URL = "/api/system-status";
const POLLING_INTERVAL = 30000;

function getStatusColor(status: string) {
  return status === "up" ? "bg-emerald-500" : "bg-red-500";
}

function getStatusTextColor(status: string, isDark: boolean) {
  return status === "up"
    ? isDark ? "text-emerald-400" : "text-emerald-600"
    : isDark ? "text-red-400" : "text-red-600";
}

function getStatusBgColor(status: string, isDark: boolean) {
  return status === "up"
    ? isDark ? "bg-emerald-500/10" : "bg-emerald-50"
    : isDark ? "bg-red-500/10" : "bg-red-50";
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
  isDark,
}: {
  serviceKey: keyof typeof serviceConfig;
  service: ServiceHealth;
  language: "en" | "es";
  isDark: boolean;
}) {
  const Icon = serviceConfig[serviceKey].icon;
  const name = language === "en" ? serviceConfig[serviceKey].nameEn : serviceConfig[serviceKey].name;

  return (
    <div className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors group ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${getStatusBgColor(service.status, isDark)} transition-colors`}>
          <Icon className={`w-4 h-4 ${getStatusTextColor(service.status, isDark)}`} />
        </div>
        <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{name}</span>
      </div>
      <div className="flex items-center gap-3">
        {service.latency_ms && (
          <span className={`text-xs font-mono ml-auto tabular-nums ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {service.latency_ms}ms
          </span>
        )}
        <div className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusColor(service.status)} duration-1000`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${getStatusColor(service.status)}`}></span>
        </div>
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
  const [mounted, setMounted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const labels = {
    header: language === "es" ? "Estado del Sistema" : "System Health",
    loading: language === "es" ? "Cargando..." : "Loading...",
    error: language === "es" ? "Error al conectar" : "Connection error",
    operational: language === "es" ? "Todo Normal" : "All Systems Normal",
    degraded: language === "es" ? "Sistema Degradado" : "Systems Degraded",
    button: language === "es" ? "Estado" : "Status",
    system: language === "es" ? "Sistema" : "System",
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

  if (!mounted) {
    return null;
  }

  const globalStatus = data?.global_status === "healthy" ? "up" : "down";
  const globalStatusColor = getStatusColor(globalStatus);

  return (
    <div ref={widgetRef} className="relative z-40">
      <div
        className={`
          absolute left-0 right-0 mx-2 md:mx-0 md:left-auto md:right-auto md:w-72 
          top-full mb-2
          md:top-auto md:bottom-full md:mb-4
          h-[50vh] md:h-auto
          transform transition-all duration-300 ease-out origin-top md:origin-bottom
          ${isExpanded
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-95 pointer-events-none md:translate-y-4"
          }
        `}
      >
        <div className={`backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800 shadow-black/50' 
            : 'bg-white/90 border-slate-200'
        }`}>
          {/* Header */}
          <div className={`px-4 py-3 border-b flex justify-between items-center ${
            isDark 
              ? 'border-slate-800/50 bg-slate-800/30' 
              : 'border-slate-100 bg-slate-50/50'
          }`}>
            <span className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${globalStatusColor}`} />
              {labels.header}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {data ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
              </span>
              <button
                onClick={fetchStatus}
                className={`p-1.5 rounded-md transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-700/50 text-slate-400 hover:text-slate-300' 
                    : 'hover:bg-slate-200 text-slate-400 hover:text-slate-600'
                }`}
                title="Refresh"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-2 space-y-1">
            {loading && !data ? (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{labels.loading}</span>
              </div>
            ) : error ? (
              <div className={`flex flex-col items-center justify-center p-6 gap-2 ${
                isDark ? 'text-red-400' : 'text-red-500'
              }`}>
                <AlertCircle className="w-8 h-8 opacity-80" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            ) : (
              Object.entries(data?.services || {}).map(([key, service]) => (
                <ServiceItem
                  key={key}
                  serviceKey={key as keyof typeof serviceConfig}
                  service={service as ServiceHealth}
                  language={language}
                  isDark={isDark}
                />
              ))
            )}
          </div>

          {/* Footer Info */}
          {data?.droplet && (
            <div className={`px-4 py-2.5 border-t flex items-center justify-between ${
              isDark 
                ? 'bg-slate-800/30 border-slate-800/50' 
                : 'bg-slate-50/80 border-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {data.droplet.name}
                </span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                isDark 
                  ? 'bg-slate-700 text-slate-400' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {data.droplet.region}
              </span>
            </div>
          )}

          {/* Overall Status Footer */}
          <div className={`
             px-4 py-2 text-xs font-medium text-center
             ${data?.global_status === 'healthy'
              ? isDark 
                ? 'bg-emerald-900/20 text-emerald-400' 
                : 'bg-emerald-50 text-emerald-600'
              : isDark 
                ? 'bg-red-900/20 text-red-400' 
                : 'bg-red-50 text-red-600'}
           `}>
            {data?.global_status === 'healthy' ? labels.operational : labels.degraded}
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          flex items-center justify-between gap-3 px-4 py-2.5 rounded-full 
          backdrop-blur-md shadow-lg
          transition-all duration-300 group
          ${isDark 
            ? 'bg-slate-900/80 border-slate-700 shadow-black/50 hover:bg-slate-900' 
            : 'bg-white/80 border-slate-200 shadow-slate-200/50 hover:bg-white'
          }
          ${isDark ? 'hover:shadow-black/50' : ''}
          hover:shadow-xl hover:scale-[1.02]
        `}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${globalStatusColor} duration-1000`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${globalStatusColor}`}></span>
          </div>
          <span className={`text-xs font-semibold transition-colors ${
            isDark 
              ? 'text-slate-200 group-hover:text-white' 
              : 'text-slate-600 group-hover:text-slate-900'
          }`}>
            {labels.system}
          </span>
        </div>
        <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
