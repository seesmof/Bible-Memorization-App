"use client";

import { useMemo, useState } from "react";
import { blankWords, firstLetters, refLabel, scoreTyping, type DeckItem } from "../lib/deck";

type Mode = "flash" | "blank" | "letters" | "typing";

interface Props {
  deck: DeckItem[];
  onMark: (id: string, ok: boolean) => void;
  onBrowse: () => void;
}

export default function Practice({ deck, onMark, onBrowse }: Props) {
  const [mode, setMode] = useState<Mode>("flash");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState<number | null>(null);

  // weakest first: new > learning > mastered, then fewest attempts
  const queue = useMemo(() => {
    const rank = { new: 0, learning: 1, mastered: 2 };
    return [...deck].sort((a, b) => rank[a.status] - rank[b.status] || a.attempts - b.attempts);
  }, [deck]);

  if (queue.length === 0) {
    return (
      <div className="rounded-2xl border p-6 text-center">
        <h2 className="text-lg font-semibold">Nothing to practice</h2>
        <p className="mt-1 text-sm opacity-70">Add at least one verse first.</p>
        <button
          onClick={onBrowse}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Browse verses
        </button>
      </div>
    );
  }

  const card = queue[Math.min(index, queue.length - 1)];
  const blank = useMemo(() => blankWords(card.text), [card]);

  function next(ok: boolean | null) {
    if (ok !== null) onMark(card.id, ok);
    setIndex((i) => (i + 1) % queue.length);
    setRevealed(false);
    setTyped("");
    setScore(null);
  }

  function gradeTyping() {
    const s = scoreTyping(card.text, typed);
    setScore(s);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {(
          [
            ["flash", "Flashcards"],
            ["blank", "Fill blank"],
            ["letters", "First letters"],
            ["typing", "Type it"],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setRevealed(false);
              setTyped("");
              setScore(null);
            }}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              mode === m ? "bg-black font-semibold text-white dark:bg-white dark:text-black" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="text-sm opacity-60">
        Card {Math.min(index, queue.length - 1) + 1} of {queue.length} · weakest first
      </p>

      <article className="rounded-2xl border p-5">
        <p className="text-sm font-semibold">{refLabel(card)}</p>

        {mode === "flash" && (
          <>
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="mt-3 w-full rounded-xl bg-black/5 p-6 text-sm dark:bg-white/10"
              >
                Tap to reveal the verse…
              </button>
            ) : (
              <p className="mt-3 text-lg leading-relaxed">{card.text}</p>
            )}
          </>
        )}

        {mode === "blank" && (
          <>
            <p className="mt-3 text-lg leading-loose">{blank.shown.join(" ")}</p>
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="mt-3 rounded-lg border px-3 py-1.5 text-sm"
              >
                Show full verse
              </button>
            ) : (
              <p className="mt-2 border-t pt-2 leading-relaxed">{card.text}</p>
            )}
          </>
        )}

        {mode === "letters" && (
          <>
            <p className="mt-3 font-mono text-lg leading-loose">{firstLetters(card.text)}</p>
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="mt-3 rounded-lg border px-3 py-1.5 text-sm"
              >
                Reveal
              </button>
            ) : (
              <p className="mt-2 border-t pt-2 leading-relaxed">{card.text}</p>
            )}
          </>
        )}

        {mode === "typing" && (
          <>
            <p className="mt-2 font-mono text-sm opacity-70">{firstLetters(card.text)}</p>
            <textarea
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              rows={4}
              placeholder="Type the verse from memory…"
              className="mt-3 w-full rounded-lg border p-3 text-sm"
            />
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={gradeTyping}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium"
              >
                Check
              </button>
              {score !== null && (
                <span className={`text-sm font-semibold ${score >= 80 ? "text-green-600" : score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                  {score}% correct
                </span>
              )}
            </div>
            {(score !== null || revealed) && (
              <p className="mt-2 border-t pt-2 leading-relaxed">{card.text}</p>
            )}
          </>
        )}

        <div className="mt-4 flex gap-2 border-t pt-4">
          <button
            onClick={() => next(false)}
            className="flex-1 rounded-lg border px-3 py-2 text-sm"
          >
            ✗ Still learning
          </button>
          <button
            onClick={() => next(true)}
            className="flex-1 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            ✓ Got it
          </button>
        </div>
      </article>
    </div>
  );
}
