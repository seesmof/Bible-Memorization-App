"use client";

import { useState } from "react";
import Browse from "./Browse";
import DeckView from "./DeckView";
import Practice from "./Practice";
import { useDeck } from "../lib/deck";
import { useLang, type Strings } from "../lib/i18n";
import type { Lang } from "../lib/bible";

type Tab = "deck" | "browse" | "practice";

export default function MemApp() {
  const { deck, add, remove, mark, has } = useDeck();
  const { lang, setLang, t } = useLang();
  const [tab, setTab] = useState<Tab>("deck");

  const tabs: [Tab, (s: Strings) => string][] = [
    ["deck", (s) => `${s.tabDeck}${deck.length ? ` (${deck.length})` : ""}`],
    ["browse", (s) => s.tabBrowse],
    ["practice", (s) => s.tabPractice],
  ];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4 pb-24">
      <div className="flex justify-end gap-1">
        {(["uk", "en"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
              lang === l ? "bg-black text-white dark:bg-white dark:text-black" : "opacity-60"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "deck" && (
        <DeckView
          deck={deck}
          lang={lang}
          t={t}
          onRemove={remove}
          onPractice={() => setTab("practice")}
          onBrowse={() => setTab("browse")}
        />
      )}
      {tab === "browse" && <Browse lang={lang} t={t} onAdd={add} has={has} />}
      {tab === "practice" && (
        <Practice deck={deck} lang={lang} t={t} onMark={mark} onBrowse={() => setTab("browse")} />
      )}

      <nav className="fixed inset-x-0 bottom-0 border-t bg-white/95 backdrop-blur dark:bg-black/95">
        <div className="mx-auto grid max-w-2xl grid-cols-3">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`py-3 text-sm font-medium ${tab === key ? "underline underline-offset-4" : "opacity-60"}`}
            >
              {label(t)}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
