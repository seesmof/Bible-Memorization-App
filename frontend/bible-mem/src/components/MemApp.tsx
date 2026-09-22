"use client";

import { useState } from "react";
import Browse from "./Browse";
import DeckView from "./DeckView";
import Practice from "./Practice";
import { useDeck } from "../lib/deck";

type Tab = "deck" | "browse" | "practice";

export default function MemApp() {
  const { deck, add, remove, mark, has } = useDeck();
  const [tab, setTab] = useState<Tab>("deck");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4 pb-24">
      {tab === "deck" && (
        <DeckView
          deck={deck}
          onRemove={remove}
          onPractice={() => setTab("practice")}
          onBrowse={() => setTab("browse")}
        />
      )}
      {tab === "browse" && <Browse onAdd={add} has={has} />}
      {tab === "practice" && <Practice deck={deck} onMark={mark} onBrowse={() => setTab("browse")} />}

      <nav className="fixed inset-x-0 bottom-0 border-t bg-white/95 backdrop-blur dark:bg-black/95">
        <div className="mx-auto grid max-w-2xl grid-cols-3">
          {(
            [
              ["deck", `My Verses${deck.length ? ` (${deck.length})` : ""}`],
              ["browse", "Add +"],
              ["practice", "Practice"],
            ] as [Tab, string][]
          ).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-sm font-medium ${tab === t ? "underline underline-offset-4" : "opacity-60"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
