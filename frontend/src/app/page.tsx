"use client";

import { FormEvent, useEffect, useState } from "react";
import bible from "../bible.json";
import { BibleBooksData } from "@/lib/data";
import { Card } from "@/components/Card";

type BibleData = Record<string, Record<string, Record<string, string>>>;
const bibleData = bible as unknown as BibleData;

export type Verse = {
  text: string;
  reference: string;
};

export type BibleBook = {
  id: number;
  abbr: string;
  name: string;
  numberOfChapters: number;
};

export default function Page() {
  const [bookName, setBookName] = useState<string>(BibleBooksData[0].name);
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [verseNumber, setVerseNumber] = useState<number>(1);
  const [input, setInput] = useState<string>("");

  const [verses, setVerses] = useState<Verse[]>([]);
  const [verseOptions, setVerseOptions] = useState<
    {
      number: number;
      verse: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchVerses = async () => {
      const bookAbbr = BibleBooksData.find(
        (book) => book.name === bookName,
      )?.abbr;

      if (!bookAbbr) return;

      const chapterData = bibleData[bookAbbr]?.[String(chapterNumber)];

      const data = Object.entries(chapterData).map(([verseNumber, text]) => ({
        number: Number(verseNumber),
        verse: text as string,
      }));

      if (data) setVerseOptions(data);
    };
    fetchVerses();
  }, [bookName, chapterNumber]);

  useEffect(() => {
    const saved = localStorage.getItem("verses");
    if (saved !== null) setVerses(JSON.parse(saved));
    else setVerses([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("verses", JSON.stringify(verses));
  }, [verses]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verse = verseOptions.find((option) => option.number == verseNumber);
    if (!verse) return;
    addCard(verse.verse);
  };

  const addCard = (verse: string) => {
    const calculatedReference = `${bookName} ${chapterNumber}:${verseNumber}`;
    const references = verses.map((verse) => verse.reference);
    if (references.includes(calculatedReference)) return;

    const newVerse: Verse = {
      text: verse,
      reference: calculatedReference,
    };
    setVerses([newVerse, ...verses]);
  };

  return (
    <div className="bg-sky-50 dark:bg-sky-950 min-h-screen">
      <div className="max-w-3xl mx-auto flex items-center justify-center flex-col p-3 gap-3">
        <form
          className="bg-white dark:bg-stone-900 rounded-md p-3 flex flex-col sm:flex-row gap-3 w-full"
          onSubmit={handleSubmit}
        >
          {/* Book Select */}
          <div className="flex flex-col gap-1">
            <label htmlFor="BookSelect" className="text-sm label">
              Книга
            </label>
            <select
              className="select w-full sm:w-44"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              id="BookSelect"
            >
              {BibleBooksData.map((Book, index) => (
                <option value={Book.name} key={index}>
                  {Book.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Select */}
          <div className="flex flex-col gap-1">
            <label htmlFor="chapterSelect" className="text-sm label">
              Розділ
            </label>
            <select
              className="select w-full sm:w-44"
              value={chapterNumber}
              onChange={(e) =>
                setChapterNumber(Number.parseInt(e.target.value))
              }
              id="chapterSelect"
            >
              {Array.from(
                new Array(
                  BibleBooksData.filter((Book) => Book.name === bookName)[0]
                    .numberOfChapters,
                ),
                (x, i) => i + 1,
              ).map((number, index) => (
                <option value={number} key={index}>
                  {number}
                </option>
              ))}
            </select>
          </div>

          {/* Verse Number Input */}
          <div className="flex flex-col gap-1 sm:flex-1 overflow-hidden">
            <label htmlFor="verseSelect" className="text-sm label">
              Вірш
            </label>
            <select
              id="verseSelect"
              className="select w-full"
              value={verseNumber}
              onChange={(e) => setVerseNumber(Number.parseInt(e.target.value))}
            >
              {verseOptions && verseOptions.length > 0
                ? verseOptions.map((verse, index) => (
                    <option value={verse.number} key={index}>
                      {verse.number}. {verse.verse}
                    </option>
                  ))
                : Array.from({ length: 176 }, (_, i) => i + 1).map(
                    (verse, index) => (
                      <option value={verse} key={index}>
                        {verse}
                      </option>
                    ),
                  )}
            </select>
          </div>

          <button className="btn self-end" type="submit">
            Додати
          </button>
        </form>

        <article className="bg-white fle flex-row gap-3 dark:bg-stone-900 rounded-md p-3 flex w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input w-full"
            placeholder="Шукайте доданий вірш тут..."
          />
          <button onClick={() => setInput("")} className="btn">
            Очистити
          </button>
        </article>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {verses && verses.length !== 0 ? (
            verses
              .filter(
                (verse) =>
                  verse.reference
                    .toLowerCase()
                    .includes(input?.toLowerCase()) ||
                  verse.text.toLowerCase().includes(input?.toLowerCase()),
              )
              .map((verse, index) => (
                <Card
                  verses={verses}
                  setVerses={setVerses}
                  verse={verse}
                  key={index}
                />
              ))
          ) : (
            <p>Будь ласка, додайте вірші...</p>
          )}
        </section>
      </div>
    </div>
  );
}
