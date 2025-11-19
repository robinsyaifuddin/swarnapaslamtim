import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const knowledgeShortcuts = [
  "Destinasi populer di Lampung Timur",
  "Produk unggulan UMKM",
  "Agenda wisata terdekat",
  "Cara booking paket wisata",
];

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text:
          "Halo! Saya Asisten AI Swarnapas. Saya siap bantu semua pertanyaan tentang wisata, UMKM, dan potensi Lampung Timur. Ada yang bisa saya bantu?",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (prompt?: string) => {
    const content = (prompt ?? userInput).trim();
    if (!content) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: content,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    await handleAiResponse(content);
  };

  const handleAiResponse = async (prompt: string) => {
    setIsThinking(true);
    try {
      const aiText = await fetchAiResponse(prompt);
      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: aiText,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const fallbackMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text:
          "Maaf, saya kesulitan mengambil jawaban saat ini. Pastikan server proxy GPT (/api/chatbot) aktif dan API key tersimpan aman.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      console.error("GPT proxy error", error);
    } finally {
      setIsThinking(false);
    }
  };

  const fetchAiResponse = async (prompt: string) => {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        context:
          "Anda adalah asisten Lampung Timur. Fokus pada informasi wisata, UMKM, potensi daerah, data Swarnapas, dan pertanyaan seputar platform.",
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Proxy error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    if (!data?.answer) {
      throw new Error("Jawaban GPT tidak ditemukan");
    }
    return data.answer as string;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-3">
      {isOpen && (
        <div
          className="mb-3 w-[95vw] max-w-sm sm:max-w-md bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/40 flex flex-col overflow-hidden animate-in fade-in"
        >
          <header className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary to-primary/80 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-2xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide opacity-80">Asisten AI</p>
                <h3 className="text-lg font-semibold">Swarnapas Copilot</h3>
                <p className="text-xs opacity-80">Fokus Lampung Timur</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </header>

          <div className="px-4 pt-3 pb-2 bg-white border-b">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              Tips: ajukan pertanyaan detail agar jawaban lebih relevan.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {knowledgeShortcuts.map((shortcut) => (
                <button
                  key={shortcut}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                  onClick={() => handleSendMessage(shortcut)}
                >
                  {shortcut}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-h-80 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-white to-slate-50">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border border-slate-200 rounded-bl-none"
                  )}
                >
                  <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                  <span className="block text-[10px] mt-1 opacity-70">{message.timestamp}</span>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="size-2 rounded-full bg-primary animate-bounce" />
                <div className="size-2 rounded-full bg-primary/70 animate-bounce delay-150" />
                <div className="size-2 rounded-full bg-primary/40 animate-bounce delay-300" />
                <span>Asisten sedang berpikir...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="px-4 py-4 bg-white flex items-center gap-2 border-t"
          >
            <input
              type="text"
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Tanyakan apa saja tentang Lampung Timur..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button type="submit" size="icon" disabled={!userInput.trim() || isThinking}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-2xl bg-primary text-white hover:scale-105 transition-transform"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Buka chatbot Swarnapas"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ChatbotWidget;
