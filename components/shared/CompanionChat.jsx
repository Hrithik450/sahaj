"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, SendHorizontal } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { COMPANION_PROMPTS } from "@/lib/companion";
import { speak } from "@/lib/voice";

function MessageBubble({ role, content, live = false }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[92%] rounded-xl border-2 border-[var(--ink)] px-4 py-3 text-sm leading-relaxed sm:max-w-[80%] sm:text-base ${
          isUser
            ? "bg-[var(--blue)] text-white"
            : "bg-white text-[var(--ink)]"
        }`}
        aria-live={live ? "polite" : undefined}
      >
        <p className="caption mb-1 text-[0.65rem] font-bold uppercase tracking-widest opacity-80">
          {isUser ? "You" : "Sahaj"}
        </p>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

export function CompanionChat({ domain = "gov" }) {
  const { prefs } = useAccessability();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("");
  const listRef = useRef(null);

  const prompts = COMPANION_PROMPTS[domain] || COMPANION_PROMPTS.gov;

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, streamingText]);

  async function sendMessage(rawText = input) {
    const text = rawText.trim();
    if (!text || loading) return;

    setInput("");
    setError("");
    setStreamingText("");
    setLoading(true);

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          domain,
          language: prefs.language,
          need: prefs.need,
          history: messages,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Chat request failed.");
      }

      setSource(response.headers.get("X-Sahaj-Source") || "");

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response stream available.");
      }

      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantText += decoder.decode(value, { stream: true });
        setStreamingText(assistantText);
      }

      setMessages([...nextMessages, { role: "assistant", content: assistantText }]);
      setStreamingText("");

      if (prefs.voiceEnabled && assistantText) {
        speak(assistantText, { language: prefs.language });
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5">
      <div>
        <p className="caption mb-3 text-sm font-semibold">Try a question</p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              disabled={loading}
              className="btn-ink bg-white px-3 py-1.5 text-left text-xs sm:text-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={listRef}
        className="grid max-h-[22rem] gap-3 overflow-y-auto rounded-xl border-2 border-[var(--ink)] bg-[var(--cream)] p-4"
        aria-label="Companion chat messages"
      >
        {messages.length === 0 && !streamingText && (
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Ask a plain-language question. Sahaj replies in short steps you can
            read and hear.
          </p>
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={`${message.role}-${index}`}
            role={message.role}
            content={message.content}
          />
        ))}

        {streamingText && (
          <MessageBubble role="assistant" content={streamingText} live />
        )}
      </div>

      <form
        className="grid gap-3 sm:grid-cols-[1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <label className="grid gap-2">
          <span className="caption text-sm font-semibold">Your question</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="ink-input"
            placeholder={
              domain === "bank"
                ? "Example: How do I block my card?"
                : "Example: What documents for income certificate?"
            }
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-ink inline-flex items-center justify-center gap-2 self-end px-5 py-2.5 text-sm text-white sm:self-auto"
          style={{ backgroundColor: "var(--blue)" }}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <SendHorizontal className="h-4 w-4" aria-hidden />
          )}
          Send
        </button>
      </form>

      {error && (
        <p className="text-sm font-semibold" style={{ color: "var(--red)" }}>
          {error}
        </p>
      )}

      {source === "fallback" && messages.length > 0 && (
        <p className="caption text-xs">Showing offline demo answers.</p>
      )}
    </div>
  );
}
