"use client";

import { refLabel, type DeckItem } from "../lib/deck";

interface Props {
  deck: DeckItem[];
  onRemove: (id: string) => void;
  onPractice: () => void;
  onBrowse: () => void;
}

export default function DeckView({ deck, onRemove, onPractice, onBrowse }: Props) {
  if (deck.length === 0) {
    return (
      <div className="rounded-2xl border p-6 text-center">
        <h2 className="text-lg font-semibold">No verses yet</h2>
        <p className="mt-1 text-sm opacity-70">
          Browse the Bible, preview any verse, and add it here to start memorizing.
        </p>
        <button
          onClick={onBrowse}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Browse verses
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70">
          {deck.length} verse{deck.length === 1 ? "" : "s"} ·{" "}
          {deck.filter((d) => d.status === "mastered").length} mastered
        </p>
        <button
          onClick={onPractice}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Practice →
        </button>
      </div>
      {deck.map((d) => (
        <article key={d.id} className="rounded-xl border p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{refLabel(d)}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs ${
                d.status === "mastered"
                  ? "border-green-600 text-green-700"
                  : d.status === "learning"
                    ? "border-amber-600 text-amber-700"
                    : "opacity-60"
              }`}
            >
              {d.status} · {d.correct}/{d.attempts}
            </span>
          </div>
          <p className="mt-1 leading-relaxed">{d.text}</p>
          <button
            onClick={() => onRemove(d.id)}
            className="mt-2 text-sm text-red-600 underline-offset-2 hover:underline"
          >
            Remove
          </button>
        </article>
      ))}
    </div>
  );
}
