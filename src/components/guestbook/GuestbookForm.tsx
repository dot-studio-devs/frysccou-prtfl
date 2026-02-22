import { useState, useEffect } from "react";
import { Send, Clock } from "lucide-react";

interface GuestbookFormProps {
  translations: {
    namePlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    rateLimitMessage: string;
  };
}

export default function GuestbookForm({
  translations: initialTranslations,
}: GuestbookFormProps) {
  const [translations, setTranslations] = useState(initialTranslations);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "rate_limit"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.guestbook) {
        setTranslations(e.detail.guestbook);
      }
    };

    window.addEventListener("languageChange" as any, handleLanguageChange);
    return () =>
      window.removeEventListener("languageChange" as any, handleLanguageChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !message.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setAuthor("");
        setMessage("");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else if (response.status === 429) {
        setStatus("rate_limit");
        setErrorMsg(data.message || translations.rateLimitMessage);
      } else {
        setStatus("error");
        setErrorMsg(translations.errorMessage);
      }
    } catch (error) {
      setStatus("error");
      setErrorMsg(translations.errorMessage);
    }

    if (status !== "success") {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder={translations.namePlaceholder}
          maxLength={50}
          required
          disabled={status === "loading" || status === "rate_limit"}
          className="w-full px-4 py-3 rounded-xl border border-th-border-secondary bg-surface/80 backdrop-blur-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={translations.messagePlaceholder}
          maxLength={500}
          rows={4}
          required
          disabled={status === "loading" || status === "rate_limit"}
          className="w-full px-4 py-3 rounded-xl border border-th-border-secondary bg-surface/80 backdrop-blur-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="text-right mt-1">
          <span className="text-[10px] text-text-muted">
            {message.length}/500
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={
          status === "loading" ||
          status === "rate_limit" ||
          !author.trim() ||
          !message.trim()
        }
        className="w-full px-6 py-3 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
      >
        {status === "loading" ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            {translations.submitButton}
          </>
        )}
      </button>

      {status === "success" && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm text-center animate-fade-in">
          {translations.successMessage}
        </div>
      )}

      {status === "rate_limit" && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm text-center animate-fade-in flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          {errorMsg}
        </div>
      )}

      {status === "error" && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center animate-fade-in">
          {errorMsg}
        </div>
      )}
    </form>
  );
}
