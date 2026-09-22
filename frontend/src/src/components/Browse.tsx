"use client";

import { useEffect, useMemo, useState } from "react";
import {
  bookNameOf,
  getBook,
  getBooks,
  getChapter,
  refId,
  type BookIndex,
  type Lang,
  type VerseRow,
} from "../lib/bible";
import type { Strings } from "../lib/i18n";

interface Props {
  lang: Lang;
  t: Strings;
  onAdd: (v: {
    code: string;
    name: string;
    nameUk: string;
    chapter: number;
    verse: number;
    text: string;
  }) => void;
  has: (id: string) => boolean;
}

export default function Browse({ lang, t, onAdd, has }: Props) {
  const [books, setBooks] = useState<BookIndex[]>([]);
  const [book, setBook] = useState("JHN");
  const [chapter, setChapter] = useState(3);
  const [verses, setVerses] = useState<VerseRow[]>([]);
  const [names, setNames] = useState({ name: "John", nameUk: "Івана" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          if (!cancelled) setNames({ name: bf.name, nameUk: bf.nameUk ?? bf.name });
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

  const chapters = useMemo(() => {
    const n = activeBook?.chapters ?? 1;
    return Array.from({ length: n }, (_, i) => i + 1);
  }, [activeBook]);

  const bookLabel = bookNameOf(
    { name: activeBook?.name ?? book, nameUk: activeBook?.nameUk },
    lang
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <label className="flex flex-col gap-1 text-sm">
          {t.book}
          <select
            value={book}
            onChange={(e) => {
              setBook(e.target.value);
              setChapter(1);
            }}
            className="rounded-lg border px-3 py-2"
          >
            {books.map((b) => (
              <option key={b.code} value={b.code}>
                {bookNameOf(b, lang)} ({b.verses})
              </option>
            ))}
          </select>
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

      {loading && (
        <p className="text-sm opacity-60">
          {t.loading} {bookLabel} {chapter}…
        </p>
      )}
      {error && <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600">{error}</p>}

      <ol className="flex flex-col gap-2">
        {verses.map((row) => {
          const id = refId(book, chapter, row.v);
          const added = has(id);
          return (
            <li key={row.v} className="rounded-xl border p-3">
              <p className="text-xs font-semibold opacity-60">
                {bookNameOf(names, lang)} {chapter}:{row.v}
              </p>
              <p className="mt-1 leading-relaxed">{row.text}</p>
              <button
                onClick={() =>
                  onAdd({ code: book, name: names.name, nameUk: names.nameUk, chapter, verse: row.v, text: row.text })
                }
                disabled={added}
                className="mt-2 rounded-lg border px-3 py-1.5 text-sm font-medium disabled:opacity-40"
              >
                {added ? t.inDeck : t.add}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
