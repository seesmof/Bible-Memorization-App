"use client";

import { useMemo, useState } from "react";
import type { Lang } from "../lib/bible";
import { blankWords, firstLetters, refLabel, scoreTyping, type DeckItem } from "../lib/deck";
import type { Strings } from "../lib/i18n";

type Mode = "flash" | "blank" | "letters" | "typing";

interface Props {
  deck: DeckItem[];
  lang: Lang;
  t: Strings;
  onMark: (id: string, ok: boolean) => void;
  onBrowse: () => void;
}

export default function Practice({ deck, lang, t, onMark, onBrowse }: Props) {
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

  const modes: [Mode, string][] = [
    ["flash", t.modeFlash],
    ["blank", t.modeBlank],
    ["letters", t.modeLetters],
    ["typing", t.modeTyping],
  ];

  if (queue.length === 0) {
    return (
      <div className="rounded-2xl border p-6 text-center">
        <h2 className="text-lg font-semibold">{t.practiceEmptyTitle}</h2>
        <p className="mt-1 text-sm opacity-70">{t.practiceEmptyBody}</p>
        <button
          onClick={onBrowse}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          {t.browseVerses}
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
        {modes.map(([m, label]) => (
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
        {t.card} {Math.min(index, queue.length - 1) + 1} {t.of} {queue.length} · {t.weakestFirst}
      </p>

      <article className="rounded-2xl border p-5">
        <p className="text-sm font-semibold">{refLabel(card, lang)}</p>

        {mode === "flash" && (
          <>
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="mt-3 w-full rounded-xl bg-black/5 p-6 text-sm dark:bg-white/10"
              >
                {t.tapReveal}
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
                {t.showFull}
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
                {t.reveal}
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
              placeholder={t.typePh}
              className="mt-3 w-full rounded-lg border p-3 text-sm"
            />
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={gradeTyping}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium"
              >
                {t.check}
              </button>
              {score !== null && (
                <span className={`text-sm font-semibold ${score >= 80 ? "text-green-600" : score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                  {score}% · {t.correctWord}
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
            {t.stillLearning}
          </button>
          <button
            onClick={() => next(true)}
            className="flex-1 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            {t.gotIt}
          </button>
        </div>
      </article>
    </div>
  );
}
