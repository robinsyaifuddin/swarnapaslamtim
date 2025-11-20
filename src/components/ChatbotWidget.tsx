import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OFFLINE_FAQ = [
  {
    keywords: ["destinasi", "wisata", "tempat wisata"],
    answer:
      "Beberapa destinasi populer di Lampung Timur antara lain: Taman Nasional Way Kambas, Pantai Kerang Mas, Danau Kemuning, dan kawasan pesisir Labuhan Maringgai. Di Swarnapas kamu bisa melihat detail destinasi, foto, dan informasi rute.",
  },
  {
    keywords: ["umkm", "produk unggulan", "oleh-oleh"],
    answer:
      "UMKM unggulan Lampung Timur meliputi kerajinan tapis, kopi robusta Way Kambas, madu hutan, olahan ikan dan hasil laut, serta aneka camilan seperti keripik singkong dan kemplang. Coba lihat menu UMKM di Swarnapas untuk daftar lengkapnya.",
  },
  {
    keywords: ["agenda", "event", "acara", "kegiatan"],
    answer:
      "Agenda wisata Lampung Timur biasanya meliputi festival budaya, kegiatan di kawasan Way Kambas, dan event promosi UMKM lokal. Kamu bisa membuka menu Agenda di Swarnapas untuk melihat jadwal terbaru.",
  },
  {
    keywords: ["cara booking", "cara pesan", "cara memesan", "booking paket"],
    answer:
      "Untuk melakukan booking paket wisata atau produk UMKM, kamu bisa memilih destinasi atau produk terlebih dahulu, lalu ikuti tombol pemesanan/booking yang tersedia. Jika masih ragu, gunakan menu Kontak di Swarnapas untuk menghubungi admin.",
  },
];

const generateOfflineAnswer = (prompt: string): string => {
  const lower = prompt.toLowerCase();

  for (const item of OFFLINE_FAQ) {
    if (item.keywords.some((keyword) => lower.includes(keyword))) {
      return item.answer;
    }
  }

  return (
    "Saat ini asisten berjalan dalam mode offline tanpa koneksi ke model AI eksternal. " +
    "Namun kamu tetap bisa menanyakan seputar wisata, UMKM, dan potensi Lampung Timur. " +
    "Coba tulis pertanyaan yang lebih spesifik, misalnya destinasi yang ingin dikunjungi atau jenis produk UMKM yang kamu cari."
  );
};

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
          "Maaf, saya kesulitan mengambil jawaban saat ini. Silakan cek koneksi internet dan pengaturan API key jika menggunakan layanan AI eksternal, lalu coba lagi beberapa saat.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      console.error("GPT proxy error", error);
    } finally {
      setIsThinking(false);
    }
  };

  const fetchAiResponse = async (prompt: string) => {
    let enhancedPrompt = prompt;

    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      enhancedPrompt = `Konteks halaman saat ini di situs Swarnapas: "${path}". Gunakan konteks ini jika relevan saat menjawab.\n\nPertanyaan pengguna: ${prompt}`;
    }

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Chatbot API error", errorBody);
        return generateOfflineAnswer(prompt);
      }

      const data = await response.json();
      const text = data?.answer;
      if (typeof text !== "string" || !text.trim()) {
        return generateOfflineAnswer(prompt);
      }

      return text.trim();
    } catch (error) {
      console.error("Chatbot API request failed", error);
      return generateOfflineAnswer(prompt);
    }
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
