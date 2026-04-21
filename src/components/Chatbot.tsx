import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { HiX, HiPaperAirplane } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import mohamedImg from "@/assets/mohamed.png";

type Msg = { role: "user" | "assistant"; content: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const CHAT_URL = `${SUPABASE_URL}/functions/v1/chat`;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [dragged, setDragged] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Mohamed Khaled's Smart Assistant. Ask me anything — about Mohamed's work, or general questions. How can I help?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    let acc = "";
    let started = false;
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages((p) => {
        if (!started) {
          started = true;
          return [...p, { role: "assistant", content: acc }];
        }
        return p.map((m, i) => (i === p.length - 1 ? { ...m, content: acc } : m));
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          messages: history.filter((_, i) => !(i === 0 && history[0].role === "assistant")),
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        setMessages((p) => [...p, { role: "assistant", content: `⚠️ ${err.error || "Something went wrong."}` }]);
        setLoading(false);
        return;
      }
      if (!resp.body) throw new Error("No body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) upsert(delta);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages((p) => [...p, { role: "assistant", content: "⚠️ Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full-screen drag area (invisible) */}
      <div ref={constraintsRef} className="pointer-events-none fixed inset-0 z-40" />

      {/* Draggable launcher cluster */}
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0}
        onDragStart={() => { setDragged(true); setShowTip(false); }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        style={{ touchAction: "none" }}
      >
        {/* Tooltip ticket */}
        <AnimatePresence>
          {showTip && !open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              className="relative max-w-[240px] rounded-2xl bg-gradient-to-br from-emerald to-cyan p-[1px] shadow-xl"
            >
              <div className="rounded-2xl bg-background/95 px-4 py-2.5 backdrop-blur-md">
                <div className="flex items-start gap-2">
                  <p className="text-sm leading-snug text-foreground">
                    Hi, I'm <span className="font-semibold">Mohamed Khaled's Smart Assistant</span>, how can I help you?
                  </p>
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); setShowTip(false); }}
                    className="-mr-1 -mt-1 rounded p-0.5 text-muted-foreground hover:text-foreground"
                    aria-label="Dismiss"
                  >
                    <HiX className="h-3.5 w-3.5" />
                  </button>
                </div>
                {/* arrow */}
                <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-background/95 border-b border-r border-glass-border" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag handle wraps the avatar so it's both draggable and clickable */}
        <div
          onPointerDown={(e) => {
            setDragged(false);
            dragControls.start(e);
          }}
          className="relative cursor-grab active:cursor-grabbing"
        >
          {/* Pulse ring */}
          {!open && (
            <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-emerald/30" />
          )}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={open ? {} : { y: [0, -6, 0] }}
            transition={open ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            onClick={(e) => {
              if (dragged) { e.preventDefault(); return; }
              setOpen((o) => !o);
              setShowTip(false);
            }}
            className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-emerald/60 shadow-[0_8px_30px_-5px] shadow-emerald/40 ring-4 ring-background/60"
            aria-label={open ? "Close chat" : "Open Smart Assistant"}
          >
            {open ? (
              <span className="grid h-full w-full place-items-center bg-background">
                <HiX className="h-6 w-6 text-foreground" />
              </span>
            ) : (
              <img src={mohamedImg} alt="Mohamed" className="h-full w-full object-cover" draggable={false} />
            )}
            {/* online indicator */}
            {!open && (
              <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald" />
            )}
          </motion.button>
        </div>

        {/* Chat panel anchored to launcher */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 22 }}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-[400px] h-[560px] glass-strong rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              style={{ cursor: "default" }}
            >
              <div className="px-5 py-4 border-b border-glass-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-emerald/50">
                  <img src={mohamedImg} alt="Mohamed" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Smart Assistant</div>
                  <div className="text-xs text-emerald flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                    Online · Ask me anything
                  </div>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "glass text-foreground"
                      }`}
                    >
                      <div className="prose prose-sm prose-invert max-w-none [&>p]:my-1 [&>ul]:my-1">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl px-4 py-3 flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-glass-border">
                <form
                  onSubmit={(e) => { e.preventDefault(); send(); }}
                  className="flex gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 bg-secondary/50 border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald/50"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald to-cyan text-background flex items-center justify-center disabled:opacity-40 hover:scale-105 transition"
                  >
                    <HiPaperAirplane className="w-4 h-4 rotate-90" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
