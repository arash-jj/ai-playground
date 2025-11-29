"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Bot } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function HFChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: String(Date.now()), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "API error");
      }

      const data = await res.json();
      const botMsg: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        text: data.output ?? "(no response)",
      };
      setMessages((m) => [...m, botMsg]);
    } catch (err: any) {
      const errMsg: Message = {
        id: String(Date.now() + 2),
        role: "assistant",
        text: `Error: ${err.message ?? String(err)}`,
      };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-gray-900 to-black text-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-linear-to-tr from-gray-800/60 to-gray-800/40 backdrop-blur-md rounded-3xl shadow-2xl ring-1 ring-white/6 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-tr from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">HF Chat Playground</h1>
              <p className="text-xs text-gray-400">Ask anything — responses via Hugging Face Inference API</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">Next.js 16 · Tailwind · HF API</div>
        </header>

        <main className="h-[70vh] md:h-[72vh] p-6 flex flex-col">
          <div className="flex-1 overflow-auto space-y-4 pb-4">
            <div className="space-y-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`max-w-[85%] ${
                    m.role === "user" ? "ml-auto bg-blue-600 text-white rounded-2xl px-4 py-3" : "mr-auto bg-gray-700 text-gray-100 rounded-2xl px-4 py-3"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</div>
                </motion.div>
              ))}
              {loading && (
                <div className="mr-auto bg-gray-700 text-gray-100 rounded-2xl px-4 py-3 inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> <span className="text-sm text-gray-200">Thinking…</span>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!loading) sendMessage();
            }}
            className="mt-4"
          >
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message — press Enter to send, Shift+Enter for newline"
                className="flex-1 min-h-12 max-h-40 resize-none p-3 rounded-2xl bg-gray-800 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl px-4 py-3"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
