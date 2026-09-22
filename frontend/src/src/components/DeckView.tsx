"use client";

import type { Lang } from "../lib/bible";
import { refLabel, type DeckItem } from "../lib/deck";
import { pluralUk, type Strings } from "../lib/i18n";

interface Props {
  deck: DeckItem[];
  lang: Lang;
  t: Strings;
  onRemove: (id: string) => void;
  onPractice: () => void;
  onBrowse: () => void;
}

export default function DeckView({ deck, lang, t, onRemove, onPractice, onBrowse }: Props) {
  if (deck.length === 0) {
    return (
      <div className="rounded-2xl border p-6 text-center">
        <h2 className="text-lg font-semibold">{t.deckEmptyTitle}</h2>
        <p className="mt-1 text-sm opacity-70">{t.deckEmptyBody}</p>
        <button
          onClick={onBrowse}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          {t.browseVerses}
        </button>
      </div>
    );
  }
  const mastered = deck.filter((d) => d.status === "mastered").length;
  const countLine =
    lang === "uk"
      ? `${deck.length} ${pluralUk(deck.length, ["вірш", "вірші", "віршів"])} · ${t.masteredCount}: ${mastered}`
      : `${deck.length} verse${deck.length === 1 ? "" : "s"} · ${t.masteredCount}: ${mastered}`;
  const statusLabel = (s: DeckItem["status"]) =>
    s === "mastered" ? t.statusMastered : s === "learning" ? t.statusLearning : t.statusNew;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70">{countLine}</p>
        <button
          onClick={onPractice}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          {t.practiceBtn}
        </button>
      </div>
      {deck.map((d) => (
        <article key={d.id} className="rounded-xl border p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{refLabel(d, lang)}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs ${
                d.status === "mastered"
                  ? "border-green-600 text-green-700"
                  : d.status === "learning"
                    ? "border-amber-600 text-amber-700"
                    : "opacity-60"
              }`}
            >
              {statusLabel(d.status)} · {d.correct}/{d.attempts}
            </span>
          </div>
          <p className="mt-1 leading-relaxed">{d.text}</p>
          <button
            onClick={() => onRemove(d.id)}
            className="mt-2 text-sm text-red-600 underline-offset-2 hover:underline"
          >
            {t.remove}
          </button>
        </article>
      ))}
    </div>
  );
}
