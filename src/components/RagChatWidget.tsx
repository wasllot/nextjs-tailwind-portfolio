"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "./LanguageContext";

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

export default function RagChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [showSources, setShowSources] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const labels = {
    toggle: language === "es" ? "Chat IA" : "AI Chat",
    placeholder: language === "es" ? "Pregunta sobre mi experiencia..." : "Ask about my experience...",
    send: language === "es" ? "Enviar" : "Send",
    sources: language === "es" ? "Fuentes" : "Sources",
    thinking: language === "es" ? "Pensando..." : "Thinking...",
    error: language === "es" ? "Error al conectar con el chat" : "Error connecting to chat",
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  const toggleSources = (messageId: string) => {
    setShowSources((prev) => ({ ...prev, [messageId]: !prev[messageId] }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors group w-full"
        aria-label={labels.toggle}
      >
        <MessageCircle className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-gray-700 dark:text-slate-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {labels.toggle}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-3 w-80 md:w-96 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {labels.toggle}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
                <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{labels.placeholder}</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-100"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.role === "assistant" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    {msg.role === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                  </div>
                  {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-white/10">
                      <button
                        onClick={() => toggleSources(msg.id)}
                        className="text-xs flex items-center gap-1 text-primary hover:underline"
                      >
                        {showSources[msg.id] ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                        {labels.sources} ({msg.sources.length})
                      </button>
                      {showSources[msg.id] && (
                        <div className="mt-2 space-y-2">
                          {msg.sources.map((source, idx) => (
                            <div
                              key={idx}
                              className="text-xs p-2 rounded bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                            >
                              <p className="line-clamp-3">{source.content}</p>
                              {source.metadata?.url && (
                                <a
                                  href={source.metadata.url as string}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 mt-1 text-primary hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Ver fuente
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-white/10 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Bot className="w-4 h-4 animate-pulse" />
                    {labels.thinking}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-100 dark:border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={labels.placeholder}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
