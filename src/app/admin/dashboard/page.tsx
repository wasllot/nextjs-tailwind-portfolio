"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Message {
  name: string;
  email: string;
  projectType: string;
  message: string;
  timestamp: string;
}

interface Consultation {
  name: string;
  email: string;
  role: string;
  projectStage: string;
  mainChallenge: string;
  teamSize: string;
  urgency: string;
  timestamp: string;
  source?: string;
}

const urgencyColors: Record<string, string> = {
  urgente: "bg-red-500/20 text-red-400 border-red-500/30",
  semanas: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  explorando: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const urgencyLabels: Record<string, string> = {
  urgente: "🔥 Urgente",
  semanas: "📅 Próximas semanas",
  explorando: "🔍 Explorando",
};

const stageLabels: Record<string, string> = {
  idea: "💡 Idea/Pre-MVP",
  mvp: "🚀 MVP lanzado",
  crecimiento: "📈 Crecimiento",
  escala: "⚡ Escalando",
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [activeTab, setActiveTab] = useState<"messages" | "consultations">("messages");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/login");
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }
      fetchData();
    } catch {
      router.push("/admin/login");
    }
  };

  const fetchData = async () => {
    try {
      const [messagesRes, consultationsRes] = await Promise.all([
        fetch("/api/messages"),
        fetch("/api/consulta-tecnica"),
      ]);

      const messagesData = await messagesRes.json();
      const consultationsData = await consultationsRes.json();

      if (messagesRes.ok) setMessages(messagesData.messages || []);
      if (consultationsRes.ok) setConsultations(consultationsData.consultations || []);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "messages"
                ? "border-teal-400 text-teal-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
          >
            ✉️ Mensajes de contacto{" "}
            <span className="ml-1 px-2 py-0.5 bg-gray-700 rounded-full text-xs">
              {messages.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "consultations"
                ? "border-orange-400 text-orange-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
          >
            🚀 Consultas Técnicas{" "}
            <span className="ml-1 px-2 py-0.5 bg-gray-700 rounded-full text-xs">
              {consultations.length}
            </span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === "messages" && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              Contact Messages ({messages.length})
            </h2>
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center py-12">No messages yet</div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{msg.name}</h3>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-blue-400 hover:underline text-sm"
                        >
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-gray-400 text-sm">{formatDate(msg.timestamp)}</span>
                    </div>
                    <div className="mb-3">
                      <span className="text-gray-400 text-sm">Project: </span>
                      <span className="text-white text-sm">{msg.projectType}</span>
                    </div>
                    <div className="bg-gray-700/50 rounded p-4">
                      <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Consultations Tab */}
        {activeTab === "consultations" && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              Consultas Técnicas Gratuitas ({consultations.length})
            </h2>
            {consultations.length === 0 ? (
              <div className="text-gray-400 text-center py-12">
                No hay consultas agendadas aún.
              </div>
            ) : (
              <div className="space-y-4">
                {[...consultations].reverse().map((c, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-6"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                        <a
                          href={`mailto:${c.email}`}
                          className="text-orange-400 hover:underline text-sm"
                        >
                          {c.email}
                        </a>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-gray-400 text-xs">{formatDate(c.timestamp)}</span>
                        {c.urgency && (
                          <span
                            className={`px-2 py-1 text-xs rounded-md border font-medium ${urgencyColors[c.urgency] || "bg-gray-700 text-gray-400"
                              }`}
                          >
                            {urgencyLabels[c.urgency] || c.urgency}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Fields grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-gray-700/40 rounded-lg p-3">
                        <p className="text-gray-500 text-xs mb-1">Rol</p>
                        <p className="text-white text-sm capitalize">{c.role}</p>
                      </div>
                      <div className="bg-gray-700/40 rounded-lg p-3">
                        <p className="text-gray-500 text-xs mb-1">Etapa</p>
                        <p className="text-white text-sm">
                          {stageLabels[c.projectStage] || c.projectStage}
                        </p>
                      </div>
                      <div className="bg-gray-700/40 rounded-lg p-3">
                        <p className="text-gray-500 text-xs mb-1">Equipo</p>
                        <p className="text-white text-sm">{c.teamSize}</p>
                      </div>
                      <div className="bg-gray-700/40 rounded-lg p-3">
                        <p className="text-gray-500 text-xs mb-1">Desafío</p>
                        <p className="text-white text-sm capitalize">{c.mainChallenge}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
