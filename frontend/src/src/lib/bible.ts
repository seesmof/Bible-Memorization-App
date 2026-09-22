export interface BookIndex {
  code: string;
  name: string;
  nameUk: string;
  aliasesUk: string[];
  chapters: number;
  verses: number;
  versesPerChapter: Record<string, number>;
}

export interface VerseRow {
  v: number;
  text: string;
}

export interface BookFile {
  code: string;
  name: string;
  nameUk: string;
  chapters: Record<string, VerseRow[]>;
}

export interface VerseRef {
  code: string;
  name: string;
  nameUk: string;
  chapter: number;
  verse: number;
  text: string;
}

export type Lang = "uk" | "en";

const cache = new Map<string, BookFile>();

export async function getBooks(): Promise<BookIndex[]> {
  const res = await fetch("data/books.json");
  if (!res.ok) throw new Error("books.json missing — run npm run parse:bible");
  return res.json();
}

export async function getBook(code: string): Promise<BookFile> {
  const hit = cache.get(code);
  if (hit) return hit;
  const res = await fetch(`data/${code}.json`);
  if (!res.ok) throw new Error(`book ${code} not found`);
  const data = (await res.json()) as BookFile;
  if (!data.nameUk) data.nameUk = BOOK_UK[data.code] ?? data.name;
  cache.set(code, data);
  return data;
}

export async function getChapter(code: string, chapter: number): Promise<VerseRow[]> {
  const book = await getBook(code);
  return book.chapters[String(chapter)] ?? [];
}

export async function getVerse(
  code: string,
  chapter: number,
  verse: number
): Promise<VerseRef> {
  const book = await getBook(code);
  const row = (book.chapters[String(chapter)] ?? []).find((r) => r.v === verse);
  if (!row) throw new Error(`${code} ${chapter}:${verse} not found`);
  return {
    code,
    name: book.name,
    nameUk: book.nameUk ?? book.name,
    chapter,
    verse,
    text: row.text,
  };
}

export function refId(code: string, chapter: number, verse: number) {
  return `${code}-${chapter}-${verse}`;
}

export function bookNameOf(
  b: { code?: string; name: string; nameUk?: string },
  lang: Lang
): string {
  if (lang !== "uk") return b.name;
  return b.nameUk ?? (b.code ? (BOOK_UK[b.code] ?? b.name) : b.name);
}

export function formatRef(
  v: { name: string; nameUk?: string; chapter: number; verse: number },
  lang: Lang = "en"
) {
  return `${bookNameOf(v, lang)} ${v.chapter}:${v.verse}`;
}

/** Normalize a book token for matching: uppercase, drop spaces/dots/apostrophes. */
export function normBookKey(s: string): string {
  return s.toUpperCase().replace(/[\s.'’ʼ`]/g, "");
}

function normName(s: string): string {
  return normBookKey(s);
}

/**
 * Parse "JHN 3:16", "John 3:16", "Ів 3:16", "Івана 3:16", "Буття 1:1",
 * "1 Ів 5:11", "Об'явлення 22:21" into a ref. Returns null if invalid.
 */
export function parseRef(
  input: string,
  books: BookIndex[]
): {
  code: string;
  chapter: number;
  verse: number;
} | null {
  const m = input.trim().match(/^(.+?)\s*(\d+)\s*:\s*(\d+)\s*$/);
  if (!m) return null;
  const raw = normBookKey(m[1]);
  if (!raw || !/[A-ZА-ЯІЇЄҐ]/u.test(raw)) return null;
  const chapter = Number(m[2]);
  const verse = Number(m[3]);

  const exactCode = books.find((b) => b.code === raw);
  if (exactCode) return { code: exactCode.code, chapter, verse };

  const stripEn = (s: string) => s.replace(/\s+/g, "").toUpperCase();
  const byEn = books.find((b) => stripEn(b.name) === raw || stripEn(b.name).startsWith(raw));
  if (byEn) return { code: byEn.code, chapter, verse };

  const byUkExact = books.find(
    (b) =>
      normName(b.nameUk) === raw || (b.aliasesUk ?? []).some((a) => a === raw)
  );
  if (byUkExact) return { code: byUkExact.code, chapter, verse };

  const byUkPrefix = books.find(
    (b) =>
      normName(b.nameUk).startsWith(raw) ||
      (b.aliasesUk ?? []).some((a) => a.startsWith(raw))
  );
  if (byUkPrefix) return { code: byUkPrefix.code, chapter, verse };

  return null;
}

/** Ukrainian book names by code — fallback for deck entries saved before UA support. */
export const BOOK_UK: Record<string, string> = {
  GEN: "Буття",
  EXO: "Вихід",
  LEV: "Левит",
  NUM: "Числа",
  DEU: "Повторення Закону",
  JOS: "Ісус Навин",
  JDG: "Судді",
  RUT: "Рут",
  "1SA": "1 Самуїла",
  "2SA": "2 Самуїла",
  "1KI": "1 Царів",
  "2KI": "2 Царів",
  "1CH": "1 Хронік",
  "2CH": "2 Хронік",
  EZR: "Ездра",
  NEH: "Неємія",
  EST: "Естер",
  JOB: "Йов",
  PSA: "Псалми",
  PRO: "Приповісті",
  ECC: "Еклезіяст",
  SNG: "Пісня над піснями",
  ISA: "Ісая",
  JER: "Єремія",
  LAM: "Плач Єремії",
  EZK: "Єзекіїль",
  DAN: "Даниїл",
  HOS: "Осія",
  JOL: "Йоіл",
  AMO: "Амос",
  OBA: "Овдій",
  JON: "Йона",
  MIC: "Михей",
  NAM: "Наум",
  HAB: "Авакум",
  ZEP: "Софонія",
  HAG: "Огія",
  ZEC: "Захарія",
  MAL: "Малахія",
  MAT: "Матвія",
  MRK: "Марка",
  LUK: "Луки",
  JHN: "Івана",
  ACT: "Дії",
  ROM: "Римлян",
  "1CO": "1 Коринтян",
  "2CO": "2 Коринтян",
  GAL: "Галатів",
  EPH: "Ефесян",
  PHP: "Филип'ян",
  COL: "Колосян",
  "1TH": "1 Солунян",
  "2TH": "2 Солунян",
  "1TI": "1 Тимофія",
  "2TI": "2 Тимофія",
  TIT: "Тита",
  PHM: "Филимона",
  HEB: "Євреїв",
  JAS: "Якова",
  "1PE": "1 Петра",
  "2PE": "2 Петра",
  "1JN": "1 Івана",
  "2JN": "2 Івана",
  "3JN": "3 Івана",
  JUD: "Юди",
  REV: "Об'явлення",
};
