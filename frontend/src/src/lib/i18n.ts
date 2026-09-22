import { useEffect, useState } from "react";
import type { Lang } from "./bible";

const KEY = "bible-mem-lang-v1";

const uk = {
  tagline: "PWA · працює офлайн",
  tabDeck: "Мої вірші",
  tabBrowse: "Додати +",
  tabPractice: "Практика",
  deckEmptyTitle: "Поки що порожньо",
  deckEmptyBody: "Перегляньте Біблію, прочитайте будь-який вірш і додайте його сюди для заучування.",
  browseVerses: "Переглянути вірші",
  masteredCount: "вивчено",
  practiceBtn: "Практикувати →",
  remove: "Прибрати",
  statusNew: "новий",
  statusLearning: "вчу",
  statusMastered: "вивчено",
  book: "Книга",
  add: "+ Додати до моїх віршів",
  inDeck: "✓ Уже в добірці",
  loading: "Завантаження",
  modeFlash: "Картки",
  modeBlank: "З пропусками",
  modeLetters: "Перші літери",
  modeTyping: "Написати",
  card: "Картка",
  of: "з",
  weakestFirst: "спочатку складні",
  tapReveal: "Торкніться, щоб відкрити вірш…",
  showFull: "Показати весь вірш",
  reveal: "Відкрити",
  typePh: "Напишіть вірш напам’ять…",
  check: "Перевірити",
  correctWord: "правильно",
  gotIt: "✓ Пам’ятаю",
  stillLearning: "✗ Ще вчу",
  practiceEmptyTitle: "Нема чого практикувати",
  practiceEmptyBody: "Спочатку додайте хоча б один вірш.",
};

export type Strings = typeof uk;

const en: Strings = {
  tagline: "PWA · works offline",
  tabDeck: "My Verses",
  tabBrowse: "Add +",
  tabPractice: "Practice",
  deckEmptyTitle: "No verses yet",
  deckEmptyBody: "Browse the Bible, preview any verse, and add it here to start memorizing.",
  browseVerses: "Browse verses",
  masteredCount: "mastered",
  practiceBtn: "Practice →",
  remove: "Remove",
  statusNew: "new",
  statusLearning: "learning",
  statusMastered: "mastered",
  book: "Book",
  add: "+ Add to My Verses",
  inDeck: "✓ In your deck",
  loading: "Loading",
  modeFlash: "Flashcards",
  modeBlank: "Fill blank",
  modeLetters: "First letters",
  modeTyping: "Type it",
  card: "Card",
  of: "of",
  weakestFirst: "weakest first",
  tapReveal: "Tap to reveal the verse…",
  showFull: "Show full verse",
  reveal: "Reveal",
  typePh: "Type the verse from memory…",
  check: "Check",
  correctWord: "correct",
  gotIt: "✓ Got it",
  stillLearning: "✗ Still learning",
  practiceEmptyTitle: "Nothing to practice",
  practiceEmptyBody: "Add at least one verse first.",
};

const STR: Record<Lang, Strings> = { uk, en };

/** Ukrainian plural: 1 вірш, 2 вірші, 5 віршів. */
export function pluralUk(n: number, forms: [string, string, string]): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return forms[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
  return forms[2];
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>("uk");

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s === "en" || s === "uk") setLangState(s);
    } catch {
      // ignore — default Ukrainian
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      // ignore — language just won't persist
    }
  }, [lang]);

  return { lang, setLang: setLangState, t: STR[lang] };
}
