"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, X, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "next-themes";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { content: string; metadata: Record<string, unknown> }[];
}

interface ChatResponse {
  answer: string;
  sources: { content: string; metadata: Record<string, unknown> }[];
  conversation_id: string;
}

const API_URL = "https://api.reinaldotineo.online/ai/chat";

const playSendSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch { }
};

const playReceiveSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator1.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator2.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator1.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.1);
    oscillator2.start(audioContext.currentTime + 0.1);
    oscillator2.stop(audioContext.currentTime + 0.2);
  } catch { }
};

export default function RagChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  const labels = {
    toggle: language === "es" ? "Chat IA" : "AI Chat",
    placeholder: language === "es" ? "Pregunta sobre mi experiencia..." : "Ask about my experience...",
    send: language === "es" ? "Enviar" : "Send",
    thinking: language === "es" ? "Pensando..." : "Thinking...",
    error: language === "es" 
      ? "Lo siento, el servicio de chat no está disponible. Reinaldo ya está trabajando para solucionarlo. Mientras tanto, puedes escribirle directamente: https://wa.me/+584121883268" 
      : "Sorry, the chat service is currently unavailable. Reinaldo is already working to fix it. In the meantime, you can message him directly: https://wa.me/+584121883268",
    close: language === "es" ? "Cerrar" : "Close",
    welcomeTitle: language === "es" ? "¡Hola! Soy tu asistente de IA" : "Hi! I'm your AI Assistant",
    welcomeText: language === "es" ? "Estoy entrenado con toda la información profesional de Reinaldo. ¿En qué puedo ayudarte?" : "I'm trained on Reinaldo's professional background. How can I help you?",
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant" && !isLoading) {
      playReceiveSound();
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage.content,
          conversation_id: conversationId,
          max_context_items: 5,
        }),
      });

      if (!response.ok) throw new Error("API Error");

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationId(data.conversation_id);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: labels.error,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        playSendSound();
        sendMessage();
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Toggle Button */}
      <div className={`transition-all duration-300 transform ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className={`p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 group ${
            isDark
              ? 'bg-[#64ffda] text-slate-900 shadow-[#64ffda]/30 hover:shadow-[#64ffda]/50'
              : 'bg-[#0d9488] text-white shadow-teal-600/30 hover:shadow-teal-600/50'
          }`}
          aria-label={labels.toggle}
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
          <span className={`absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 ${isDark ? 'border-slate-900' : 'border-white'}`}></span>
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`
          fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:left-auto 
          md:w-[400px] md:h-[600px] md:max-h-[calc(100vh-8rem)]
          ${isDark ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-xl 
          ${isDark ? 'border-slate-800' : 'border-gray-200'} 
          shadow-2xl md:rounded-2xl 
          flex flex-col overflow-hidden transition-all duration-300 ease-out origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className={`px-4 py-3 border-b ${isDark ? 'border-slate-900 bg-slate-950/50' : 'border-gray-100 bg-white/80'} flex justify-between items-center backdrop-blur-sm sticky top-0 z-10`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-[#64ffda]/10' : 'bg-[#0d9488]/10'}`}>
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-[#64ffda]' : 'text-[#0d9488]'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>
                  {labels.toggle}
                </h3>
                <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${
                  isDark 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {language === "es" ? "BETA" : "BETA"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-500"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-gray-500'} font-medium`}>Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}
            aria-label={labels.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50/50'} scroll-smooth`}>
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300 ${isDark ? 'bg-[#64ffda]/10' : 'bg-[#0d9488]/10'}`}>
                <Bot className={`w-8 h-8 ${isDark ? 'text-[#64ffda]' : 'text-[#0d9488]'}`} />
              </div>
              <h4 className={`text-base font-semibold mb-2 ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>
                {labels.welcomeTitle}
              </h4>
              <p className={`text-sm leading-relaxed max-w-[260px] ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                {labels.welcomeText}
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? isDark 
                      ? "bg-[#64ffda] text-slate-900 rounded-br-none shadow-md"
                      : "bg-[#0d9488] text-white rounded-br-none shadow-md"
                    : isDark
                      ? "bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm"
                      : "bg-white text-gray-700 border border-gray-100 rounded-bl-none shadow-sm"
                  }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-1.5 opacity-60">
                    <Bot className="w-3 h-3" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">AI Assistant</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className={`rounded-2xl rounded-bl-none px-5 py-4 border shadow-sm flex items-center gap-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
                <div className="flex gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-[#64ffda]' : 'bg-[#0d9488]'}`} style={{ animationDelay: '0ms' }} />
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-[#64ffda]' : 'bg-[#0d9488]'}`} style={{ animationDelay: '150ms' }} />
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-[#64ffda]' : 'bg-[#0d9488]'}`} style={{ animationDelay: '300ms' }} />
                </div>
                <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{labels.thinking}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t ${isDark ? 'bg-slate-950 border-slate-900' : 'bg-white border-gray-100'}`}>
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={labels.placeholder}
                className={`w-full pl-4 pr-10 py-3 text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:bg-slate-900 focus:border-[#64ffda]/50'
                    : 'border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#0d9488]/50'
                }`}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={() => {
                playSendSound();
                sendMessage();
              }}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'bg-[#64ffda] text-slate-900 shadow-[#64ffda]/20 hover:bg-[#5ce9cc] hover:shadow-[#64ffda]/40'
                  : 'bg-[#0d9488] text-white shadow-teal-600/20 hover:bg-[#0f766e] hover:shadow-teal-600/40'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className={`text-[10px] ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
              AI powered by Gemini • Reinaldo Tineo Portfolio
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
