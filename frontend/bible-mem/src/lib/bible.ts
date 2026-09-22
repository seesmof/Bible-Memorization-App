export interface BookIndex {
  code: string;
  name: string;
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
  chapters: Record<string, VerseRow[]>;
}

export interface VerseRef {
  code: string;
  name: string;
  chapter: number;
  verse: number;
  text: string;
}

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
  return { code, name: book.name, chapter, verse, text: row.text };
}

export function refId(code: string, chapter: number, verse: number) {
  return `${code}-${chapter}-${verse}`;
}

export function formatRef(v: { name: string; chapter: number; verse: number }) {
  return `${v.name} ${v.chapter}:${v.verse}`;
}

/** Parse "JHN 3:16" / "John 3:16" / "psa 23:1" into a ref. Returns null if invalid. */
export function parseRef(input: string, books: BookIndex[]): {
  code: string;
  chapter: number;
  verse: number;
} | null {
  const m = input.trim().match(/^([1-3]?\s?[a-zA-Z]+)\s+(\d+)\s*:\s*(\d+)$/);
  if (!m) return null;
  const raw = m[1].replace(/\s+/g, "").toUpperCase();
  const chapter = Number(m[2]);
  const verse = Number(m[3]);
  const byCode = books.find((b) => b.code === raw);
  if (byCode) return { code: byCode.code, chapter, verse };
  const byName = books.find(
    (b) => b.name.replace(/\s+/g, "").toUpperCase().startsWith(raw)
  );
  if (byName) return { code: byName.code, chapter, verse };
  return null;
}
