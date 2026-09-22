"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getBook,
  getBooks,
  getChapter,
  getVerse,
  parseRef,
  refId,
  type BookIndex,
  type VerseRow,
} from "../lib/bible";

interface Props {
  onAdd: (v: { code: string; name: string; chapter: number; verse: number; text: string }) => void;
  has: (id: string) => boolean;
}

const STARTERS = ["JHN 3:16", "PSA 23:1", "PSA 119:105", "PRO 3:5", "ROM 8:28", "PHP 4:13"];

export default function Browse({ onAdd, has }: Props) {
  const [books, setBooks] = useState<BookIndex[]>([]);
  const [book, setBook] = useState("JHN");
  const [chapter, setChapter] = useState(3);
  const [verses, setVerses] = useState<VerseRow[]>([]);
  const [bookName, setBookName] = useState("John");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [jump, setJump] = useState("");

  useEffect(() => {
    getBooks()
      .then((b) => {
        setBooks(b);
        const jhn = b.find((x) => x.code === "JHN");
        if (jhn) {
          setBook("JHN");
          setChapter(3);
        } else if (b[0]) {
          setBook(b[0].code);
          setChapter(1);
        }
      })
      .catch((e) => setError(String(e)));
  }, []);

  const activeBook = useMemo(() => books.find((b) => b.code === book), [books, book]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getChapter(book, chapter)
      .then((rows) => {
        if (cancelled) return;
        setVerses(rows);
        getBook(book).then((bf) => {
          if (!cancelled) setBookName(bf.name);
        });
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [book, chapter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return verses;
    return verses.filter((r) => r.text.toLowerCase().includes(q) || String(r.v) === q);
  }, [verses, query]);

  async function handleJump() {
    setError("");
    const parsed = parseRef(jump, books);
    if (!parsed) {
      setError('Use a reference like "JHN 3:16".');
      return;
    }
    setBook(parsed.code);
    setChapter(parsed.chapter);
    setQuery(String(parsed.verse));
    try {
      const v = await getVerse(parsed.code, parsed.chapter, parsed.verse);
      setBookName(v.name);
    } catch (e) {
      setError(String(e));
    }
  }

  async function addStarter(ref: string) {
    const parsed = parseRef(ref, books);
    if (!parsed) return;
    try {
      const v = await getVerse(parsed.code, parsed.chapter, parsed.verse);
      onAdd(v);
    } catch (e) {
      setError(String(e));
    }
  }

  const chapters = useMemo(() => {
    const n = activeBook?.chapters ?? 1;
    return Array.from({ length: n }, (_, i) => i + 1);
  }, [activeBook]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border p-4">
        <h2 className="text-lg font-semibold">Preview before adding</h2>
        <p className="text-sm opacity-70">
          Pick a book and chapter, read each verse, then add only the ones you want to memorize.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            value={jump}
            onChange={(e) => setJump(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJump()}
            placeholder='Jump to e.g. JHN 3:16'
            className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm"
          />
          <button
            onClick={handleJump}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            Go
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => addStarter(s)}
              className="rounded-full border px-2.5 py-1 text-xs hover:bg-black/5"
              title={`Preview + add ${s}`}
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Book
          <select
            value={book}
            onChange={(e) => {
              setBook(e.target.value);
              setChapter(1);
              setQuery("");
            }}
            className="rounded-lg border px-3 py-2"
          >
            {books.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name} ({b.verses})
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Search in chapter
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="word or verse number…"
            className="rounded-lg border px-3 py-2"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {chapters.map((c) => (
          <button
            key={c}
            onClick={() => setChapter(c)}
            className={`min-w-9 rounded-lg border px-2 py-1.5 text-sm ${
              c === chapter ? "bg-black font-semibold text-white dark:bg-white dark:text-black" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm opacity-60">Loading {book} {chapter}…</p>}
      {error && <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600">{error}</p>}

      <ol className="flex flex-col gap-2">
        {filtered.map((row) => {
          const id = refId(book, chapter, row.v);
          const added = has(id);
          return (
            <li key={row.v} className="rounded-xl border p-3">
              <p className="text-xs font-semibold opacity-60">
                {bookName} {chapter}:{row.v}
              </p>
              <p className="mt-1 leading-relaxed">{row.text}</p>
              <button
                onClick={() =>
                  onAdd({ code: book, name: bookName, chapter, verse: row.v, text: row.text })
                }
                disabled={added}
                className="mt-2 rounded-lg border px-3 py-1.5 text-sm font-medium disabled:opacity-40"
              >
                {added ? "✓ In your deck" : "+ Add to My Verses"}
              </button>
            </li>
          );
        })}
      </ol>
      {!loading && filtered.length === 0 && (
        <p className="text-sm opacity-60">No verses match — clear the search.</p>
      )}
    </div>
  );
}
