import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, Send, Sparkles, X } from "lucide-react";

const suggestions = [
  "What has Kowsik built?",
  "Why hire Kowsik?",
  "Tell me about his internship",
];

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi. Ask me about Kowsik’s projects, skills, or experience.",
    },
  ]);
  const inputRef = useRef(null);
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (open && transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages, pending, open]);

  const send = async (question) => {
    const text = question.trim();
    if (!text || pending || text.length > 500) return;
    const history = messages
      .filter((message) => !message.error)
      .slice(-6)
      .map((message) => ({ role: message.role, content: message.text }));
    setMessages((previous) => [...previous, { role: "user", text }]);
    setInput("");
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
        signal: AbortSignal.timeout(18000),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "The assistant is unavailable.");
      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.answer, sources: data.sources || [] },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error.name === "TimeoutError"
              ? "That took too long. Please try again."
              : error.message,
          error: true,
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={`chat-shell ${open ? "is-open" : ""}`}>
      {open && (
        <section className="chat-panel" aria-label="Kowsik portfolio guide">
          <div className="chat-heading">
            <div className="chat-mark">
              <Sparkles size={17} />
            </div>
            <div>
              <strong>Ask about Kowsik</strong>
              <span>Grounded in portfolio facts</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close portfolio guide"
            >
              <X size={18} />
            </button>
          </div>
          <div
            className="chat-transcript"
            ref={transcriptRef}
            role="log"
            aria-label="Chat messages"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`chat-message ${message.role} ${message.error ? "error" : ""}`}
              >
                <span className="chat-author">
                  {message.role === "user" ? "YOU" : "GUIDE"}
                </span>
                <p>{message.text}</p>
                {message.sources?.length > 0 && (
                  <div className="chat-sources">
                    {message.sources.map((source) => (
                      <a
                        key={source.id}
                        href={source.url}
                        target={
                          source.url.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          source.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {source.title} <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {pending && (
              <div className="chat-message assistant">
                <span className="chat-author">GUIDE</span>
                <p>Thinking…</p>
              </div>
            )}
          </div>
          {messages.length === 1 && (
            <div className="chat-suggestions" aria-label="Suggested questions">
              {suggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => send(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <label className="sr-only" htmlFor="portfolio-question">
              Ask a question about Kowsik
            </label>
            <input
              id="portfolio-question"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setOpen(false);
              }}
              placeholder="Ask about projects or experience…"
              maxLength={500}
              disabled={pending}
            />
            <button
              type="submit"
              aria-label="Send question"
              disabled={pending || !input.trim()}
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}
      <button
        className="chat-launcher"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close portfolio guide" : "Open portfolio guide"}
        aria-expanded={open}
      >
        {open ? <X size={19} /> : <MessageCircle size={19} />}
        <span>{open ? "Close" : "Ask Kowsik AI"}</span>
      </button>
    </div>
  );
}
