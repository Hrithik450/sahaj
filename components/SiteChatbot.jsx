"use client";

import { useState } from "react";
import { Loader2, MessageCircle, SendHorizontal, X } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/utils";

const UI = {
  open: {
    en: "Open help chat",
    hi: "सहायता चैट खोलें",
    kn: "ಸಹಾಯ ಚಾಟ್ ತೆರೆಯಿರಿ",
  },
  close: {
    en: "Close help chat",
    hi: "सहायता चैट बंद करें",
    kn: "ಸಹಾಯ ಚಾಟ್ ಮುಚ್ಚಿ",
  },
  title: { en: "Sahaj help", hi: "सहज सहायता", kn: "ಸಹಜ ಸಹಾಯ" },
  subtitle: {
    en: "Ask about this site",
    hi: "इस साइट के बारे में पूछें",
    kn: "ಈ ಸೈಟ್ ಬಗ್ಗೆ ಕೇಳಿ",
  },
  welcome: {
    en: "Hi! Ask how to use Sahaj government tools, banking help, voice, languages, or sign-in.",
    hi: "नमस्ते! सहज कैसे इस्तेमाल करें सरकारी सुविधाएँ, बैंकिंग, आवाज़, भाषा या साइन इन  पूछें।",
    kn: "ನಮಸ್ಕಾರ! ಸಹಜ ಬಳಸುವುದು ಹೇಗೆ  ಸರ್ಕಾರಿ ಸಾಧನಗಳು, ಬ್ಯಾಂಕಿಂಗ್, ಧ್ವನಿ, ಭಾಷೆ ಅಥವಾ ಸೈನ್ ಇನ್  ಕೇಳಿ.",
  },
  placeholder: {
    en: "Your question…",
    hi: "आपका सवाल…",
    kn: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ…",
  },
  send: { en: "Send", hi: "भेजें", kn: "ಕಳುಹಿಸಿ" },
  failed: {
    en: "Could not send. Try again.",
    hi: "भेज नहीं सका। फिर कोशिश करें।",
    kn: "ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  },
  suggestionsLabel: {
    en: "Quick questions",
    hi: "त्वरित सवाल",
    kn: "ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು",
  },
};

const SUGGESTIONS = [
  {
    label: {
      en: "What is Sahaj?",
      hi: "सहज क्या है?",
      kn: "ಸಹಜ ಎಂದರೇನು?",
    },
    message: {
      en: "What is Sahaj and what does it help me with?",
      hi: "सहज क्या है और यह मुझे किस काम में मदद करता है?",
      kn: "ಸಹಜ ಎಂದರೇನು ಮತ್ತು ಇದು ನನಗೆ ಯಾವ ಕೆಲಸದಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತದೆ?",
    },
  },
  {
    label: {
      en: "Simplify a notice",
      hi: "नोटिस सरल करें",
      kn: "ಸೂಚನೆ ಸರಳಗೊಳಿಸಿ",
    },
    message: {
      en: "How do I simplify a government notice on Sahaj?",
      hi: "सहज पर सरकारी नोटिस कैसे सरल करूं?",
      kn: "ಸಹಜದಲ್ಲಿ ಸರ್ಕಾರಿ ಸೂಚನೆಯನ್ನು ಹೇಗೆ ಸರಳಗೊಳಿಸುವುದು?",
    },
  },
  {
    label: {
      en: "Banking tools",
      hi: "बैंकिंग सुविधाएँ",
      kn: "ಬ್ಯಾಂಕಿಂಗ್ ಸಾಧನಗಳು",
    },
    message: {
      en: "What tools are on the Banking page?",
      hi: "बैंकिंग पृष्ठ पर कौन-कौन सी सुविधाएँ हैं?",
      kn: "ಬ್ಯಾಂಕಿಂಗ್ ಪುಟದಲ್ಲಿ ಯಾವ ಸಾಧನಗಳಿವೆ?",
    },
  },
  {
    label: {
      en: "Voice guidance",
      hi: "आवाज़ मार्गदर्शन",
      kn: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ",
    },
    message: {
      en: "How do I turn on voice guidance and change language?",
      hi: "आवाज़ मार्गदर्शन और भाषा कैसे बदलूं?",
      kn: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಭಾಷೆಯನ್ನು ಹೇಗೆ ಬದಲಾಯಿಸುವುದು?",
    },
  },
  {
    label: {
      en: "Sign in needed?",
      hi: "साइन इन ज़रूरी?",
      kn: "ಸೈನ್ ಇನ್ ಬೇಕೇ?",
    },
    message: {
      en: "Do I need to sign in to use Sahaj?",
      hi: "सहज इस्तेमाल करने के लिए साइन इन ज़रूरी है?",
      kn: "ಸಹಜ ಬಳಸಲು ಸೈನ್ ಇನ್ ಅಗತ್ಯವಿದೆಯೇ?",
    },
  },
];

export function SiteChatbot() {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  function openChat() {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        { role: "assistant", content: pickLang(UI.welcome, language) },
      ]);
    }
  }

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const response = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, language }),
      });
      const data = await response.json();
      const reply = data.reply || data.error || pickLang(UI.failed, language);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: pickLang(UI.failed, language) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await sendMessage(text);
  }

  const showSuggestions = !messages.some((m) => m.role === "user");

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="ink-card flex w-[min(100vw-2rem,20rem)] flex-col overflow-hidden border border-[var(--ink)] bg-white shadow-[-2px_2px_0_0_var(--ink)] sm:w-80"
          role="dialog"
          aria-label={pickLang(UI.title, language)}
        >
          <div
            className="flex items-start justify-between gap-2 border-b border-[var(--ink)] px-4 py-3"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <div>
              <p className="landing-strong text-sm">
                {pickLang(UI.title, language)}
              </p>
              <p className="caption text-xs text-[var(--muted)]">
                {pickLang(UI.subtitle, language)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-ink flex h-8 w-8 shrink-0 items-center justify-center bg-white p-0"
              aria-label={pickLang(UI.close, language)}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div
            className="flex max-h-64 flex-col gap-3 overflow-y-auto px-3 py-3"
            aria-live="polite"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[92%] rounded-xl border border-[var(--ink)] px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "self-end bg-[var(--blue)] text-white"
                    : "self-start bg-[var(--cream)] text-[var(--ink)]"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span className="caption">…</span>
              </div>
            )}
            {showSuggestions && !loading && (
              <div className="flex flex-col gap-2 pt-1">
                <p className="caption text-xs font-semibold text-[var(--muted)]">
                  {pickLang(UI.suggestionsLabel, language)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={pickLang(item.label, "en")}
                      type="button"
                      onClick={() =>
                        void sendMessage(pickLang(item.message, language))
                      }
                      className="btn-ink bg-white px-2.5 py-1.5 text-left text-xs leading-snug"
                    >
                      {pickLang(item.label, language)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-[var(--ink)] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={pickLang(UI.placeholder, language)}
              className="ink-input min-w-0 flex-1 px-3 py-2 text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-ink flex h-10 w-10 shrink-0 items-center justify-center text-white disabled:opacity-50"
              style={{ backgroundColor: "var(--blue)" }}
              aria-label={pickLang(UI.send, language)}
            >
              <SendHorizontal className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={openChat}
          className="btn-ink flex h-14 w-14 items-center justify-center rounded-full border border-[var(--ink)] text-white shadow-[-2px_2px_0_0_var(--ink)]"
          style={{ backgroundColor: "var(--blue)" }}
          aria-label={pickLang(UI.open, language)}
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
        </button>
      )}
    </div>
  );
}
