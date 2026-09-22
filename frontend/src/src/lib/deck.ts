import { useCallback, useEffect, useState } from "react";
import { BOOK_UK, formatRef, refId, type Lang } from "./bible";

export type VerseStatus = "new" | "learning" | "mastered";

export interface DeckItem {
  id: string;
  code: string;
  name: string;
  nameUk?: string;
  chapter: number;
  verse: number;
  text: string;
  status: VerseStatus;
  attempts: number;
  correct: number;
  addedAt: number;
}

const KEY = "bible-mem-deck-v1";

function load(): DeckItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as DeckItem[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function useDeck() {
  const [deck, setDeck] = useState<DeckItem[]>([]);

  useEffect(() => {
    setDeck(load());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(deck));
    } catch {
      // storage full / private mode — deck just won't persist
    }
  }, [deck]);

  const add = useCallback(
    (v: {
      code: string;
      name: string;
      nameUk?: string;
      chapter: number;
      verse: number;
      text: string;
    }) => {
      const id = refId(v.code, v.chapter, v.verse);
      setDeck((prev) => {
        if (prev.some((d) => d.id === id)) return prev;
        return [
          ...prev,
          {
            id,
            code: v.code,
            name: v.name,
            nameUk: v.nameUk,
            chapter: v.chapter,
            verse: v.verse,
            text: v.text,
            status: "new",
            attempts: 0,
            correct: 0,
            addedAt: Date.now(),
          },
        ];
      });
      return id;
    },
    []
  );

  const remove = useCallback((id: string) => {
    setDeck((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const mark = useCallback((id: string, ok: boolean) => {
    setDeck((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const attempts = d.attempts + 1;
        const correct = d.correct + (ok ? 1 : 0);
        const rate = correct / attempts;
        const status: VerseStatus =
          attempts >= 3 && rate >= 0.8 ? "mastered" : attempts >= 1 ? "learning" : "new";
        return { ...d, attempts, correct, status };
      })
    );
  }, []);

  const has = useCallback((id: string) => deck.some((d) => d.id === id), [deck]);

  return { deck, add, remove, mark, has };
}

export function refLabel(d: Pick<DeckItem, "code" | "name" | "chapter" | "verse"> & { nameUk?: string }, lang: Lang = "en") {
  return formatRef(
    { ...d, nameUk: d.nameUk ?? BOOK_UK[d.code] ?? d.name },
    lang
  );
}

// --- practice helpers (pure, tested via build) ---

/** Hide every nth word with underscores, keeping first/last word visible. */
export function blankWords(text: string, every = 3): { shown: string[]; hidden: number[] } {
  const words = text.split(/\s+/);
  const shown = words.map((w, i) =>
    i === 0 || i === words.length - 1 || (i + 1) % every !== 0 ? w : "_____"
  );
  const hidden = words.map((_, i) => i).filter((i) => shown[i] === "_____");
  return { shown, hidden };
}

/** First-letter hint per word, e.g. "У п_ с_ Б_ ..." */
export function firstLetters(text: string): string {
  return text
    .split(/\s+/)
    .map((w) => (w[0] ?? "") + "_".repeat(Math.max(0, Math.min(w.length - 1, 6))))
    .join(" ");
}

/** Score typed answer vs target: % of matching words (case/punctuation-insensitive). */
export function scoreTyping(target: string, typed: string): number {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[.,;:!?""«»„“'—–-]/g, "")
      .split(/\s+/)
      .filter(Boolean);
  const t = norm(target);
  const u = norm(typed);
  if (t.length === 0) return 0;
  let match = 0;
  for (let i = 0; i < t.length; i++) if (u[i] === t[i]) match++;
  return Math.round((match / t.length) * 100);
}
