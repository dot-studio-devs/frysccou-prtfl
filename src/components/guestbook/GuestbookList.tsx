import { useState, useEffect } from "react";

interface GuestbookEntry {
  id: number;
  author: string;
  message: string;
  created_at: string;
}

interface GuestbookListProps {
  translations: {
    noMessages: string;
    beFirst: string;
  };
}

export default function GuestbookList({
  translations: initialTranslations,
}: GuestbookListProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState(initialTranslations);

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

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          console.error("Data is not an array:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr: string) => {
    const cleanDate = dateStr.endsWith("Z")
      ? dateStr
      : dateStr.replace(" ", "T") + "Z";
    const date = new Date(cleanDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;

    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      -Math.floor(diffInSeconds / 86400),
      "day",
    );
  };

  if (loading) {
    return (
      <div className="space-y-4 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse p-px rounded-2xl bg-th-border-secondary/50"
          >
            <div className="bg-surface/80 rounded-[calc(1rem-1px)] p-4 h-24"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
      {entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted text-sm">{translations.noMessages}</p>
          <p className="text-accent text-xs font-bold mt-1">
            {translations.beFirst}
          </p>
        </div>
      ) : (
        entries.map((entry, index) => (
          <div
            key={entry.id}
            className="guestbook-entry group p-px rounded-2xl bg-linear-to-r from-accent/10 to-rose-accent/10 hover:from-accent/20 hover:to-rose-accent/20 transition-all duration-500"
          >
            <div className="bg-surface/80 backdrop-blur-sm rounded-[calc(1rem-1px)] p-4 border border-th-border hover:border-accent/20 transition-all duration-500">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent-soft/30 flex items-center justify-center border border-accent/20">
                    <span className="text-accent font-bold text-sm">
                      {entry.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">
                      {entry.author}
                    </h4>
                    <time className="text-[10px] text-text-muted">
                      {formatDate(entry.created_at)}
                    </time>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pl-10">
                {entry.message}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
