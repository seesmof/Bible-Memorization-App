"use client";

import { FormEvent, useEffect, useState } from "react";

interface Verse {
  text: string;
  reference: string;
}

const Card = ({
  verse,
  verses,
  setVerses,
}: {
  verse: Verse;
  verses: Verse[];
  setVerses: React.Dispatch<React.SetStateAction<Verse[]>>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="bg-white dark:bg-stone-900 rounded-md p-3 aspect-square flex justify-center items-center text-center cursor-pointer relative"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      {isOpen ? (
        <p>{verse.text}</p>
      ) : (
        <div className="flex flex-col gap-3">
          <p>{verse.reference}</p>
          <span className="text-stone-700 dark:text-stone-400 text-sm">
            Натисність, щоб побачити вірш...
          </span>
        </div>
      )}
      <button
        onClick={() => {
          const versesWithoutThis = verses.filter(
            (thisVerse: Verse) => thisVerse.reference !== verse.reference,
          );
          setVerses(versesWithoutThis);
        }}
        className="absolute text-sm text-red-700 top-3 right-3 cursor-pointer"
      >
        Видалити
      </button>
    </div>
  );
};

interface BibleBook {
  id: number;
  abbr: string;
  name: string;
  numberOfChapters: number;
}

const BibleBooksData: BibleBook[] = [
  { id: 1, abbr: "GEN", name: "Буття", numberOfChapters: 50 },
  { id: 2, abbr: "EXO", name: "Вихід", numberOfChapters: 40 },
  { id: 3, abbr: "LEV", name: "Левит", numberOfChapters: 27 },
  { id: 4, abbr: "NUM", name: "Числа", numberOfChapters: 36 },
  { id: 5, abbr: "DEU", name: "Второзаконня", numberOfChapters: 34 },
  { id: 6, abbr: "JOS", name: "Iсус Навин", numberOfChapters: 24 },
  { id: 7, abbr: "JDG", name: "Судді", numberOfChapters: 21 },
  { id: 8, abbr: "RUT", name: "Рут", numberOfChapters: 4 },
  { id: 9, abbr: "1SA", name: "I Самуїл", numberOfChapters: 31 },
  { id: 10, abbr: "2SA", name: "II Самуїл", numberOfChapters: 24 },
  { id: 11, abbr: "1KI", name: "I Царі", numberOfChapters: 22 },
  { id: 12, abbr: "2KI", name: "II Царі", numberOfChapters: 25 },
  { id: 13, abbr: "1CH", name: "I Хроніка", numberOfChapters: 29 },
  { id: 14, abbr: "2CH", name: "II Хроніка", numberOfChapters: 36 },
  { id: 15, abbr: "EZR", name: "Ездра", numberOfChapters: 10 },
  { id: 16, abbr: "NEH", name: "Неємія", numberOfChapters: 13 },
  { id: 17, abbr: "EST", name: "Естера", numberOfChapters: 10 },
  { id: 18, abbr: "JOB", name: "Іов", numberOfChapters: 42 },
  { id: 19, abbr: "PSA", name: "Псалми", numberOfChapters: 150 },
  { id: 20, abbr: "PRO", name: "Приповідки", numberOfChapters: 31 },
  { id: 21, abbr: "ECC", name: "Проповідник", numberOfChapters: 12 },
  { id: 22, abbr: "SNG", name: "Пісня пісень", numberOfChapters: 8 },
  { id: 23, abbr: "ISA", name: "Ісая", numberOfChapters: 66 },
  { id: 24, abbr: "JER", name: "Єремiя", numberOfChapters: 52 },
  { id: 25, abbr: "LAM", name: "Плач Єремiї", numberOfChapters: 5 },
  { id: 26, abbr: "EZK", name: "Єзекiїль", numberOfChapters: 48 },
  { id: 27, abbr: "DAN", name: "Даниїл", numberOfChapters: 12 },
  { id: 28, abbr: "HOS", name: "Осiя", numberOfChapters: 14 },
  { id: 29, abbr: "JOL", name: "Йоіл", numberOfChapters: 3 },
  { id: 30, abbr: "AMO", name: "Амос", numberOfChapters: 9 },
  { id: 31, abbr: "OBA", name: "Овдiй", numberOfChapters: 1 },
  { id: 32, abbr: "JON", name: "Йона", numberOfChapters: 4 },
  { id: 33, abbr: "MIC", name: "Міхей", numberOfChapters: 7 },
  { id: 34, abbr: "NAM", name: "Наум", numberOfChapters: 3 },
  { id: 35, abbr: "HAB", name: "Авакум", numberOfChapters: 3 },
  { id: 36, abbr: "ZEP", name: "Софонiя", numberOfChapters: 3 },
  { id: 37, abbr: "HAG", name: "Аггей", numberOfChapters: 2 },
  { id: 38, abbr: "ZEC", name: "Захарiя", numberOfChapters: 14 },
  { id: 39, abbr: "MAL", name: "Малахія", numberOfChapters: 4 },
  { id: 40, abbr: "MAT", name: "Матей", numberOfChapters: 28 },
  { id: 41, abbr: "MRK", name: "Марко", numberOfChapters: 16 },
  { id: 42, abbr: "LUK", name: "Лука", numberOfChapters: 24 },
  { id: 43, abbr: "JHN", name: "Йоан", numberOfChapters: 21 },
  { id: 44, abbr: "ACT", name: "Діяння", numberOfChapters: 28 },
  { id: 45, abbr: "ROM", name: "До римлян", numberOfChapters: 16 },
  { id: 46, abbr: "1CO", name: "I до Корінтян", numberOfChapters: 16 },
  { id: 47, abbr: "2CO", name: "II до Корінтян", numberOfChapters: 13 },
  { id: 48, abbr: "GAL", name: "До Галатiв", numberOfChapters: 6 },
  { id: 49, abbr: "EPH", name: "До Ефесян", numberOfChapters: 6 },
  { id: 50, abbr: "PHP", name: "До Филипʼян", numberOfChapters: 4 },
  { id: 51, abbr: "COL", name: "До Колосян", numberOfChapters: 4 },
  { id: 52, abbr: "1TH", name: "I до Солунян", numberOfChapters: 5 },
  { id: 53, abbr: "2TH", name: "II до Солунян", numberOfChapters: 3 },
  { id: 54, abbr: "1TI", name: "I до Тимотея", numberOfChapters: 6 },
  { id: 55, abbr: "2TI", name: "II до Тимотея", numberOfChapters: 4 },
  { id: 56, abbr: "TIT", name: "До Тита", numberOfChapters: 3 },
  { id: 57, abbr: "PHM", name: "До Филимона", numberOfChapters: 1 },
  { id: 58, abbr: "HEB", name: "До євреїв", numberOfChapters: 13 },
  { id: 59, abbr: "JAS", name: "Якова", numberOfChapters: 5 },
  { id: 60, abbr: "1PE", name: "I Послання Петра", numberOfChapters: 5 },
  { id: 61, abbr: "2PE", name: "II Послання Петра", numberOfChapters: 3 },
  { id: 62, abbr: "1JN", name: "I Послання Йоана", numberOfChapters: 5 },
  { id: 63, abbr: "2JN", name: "II Послання Йоана", numberOfChapters: 1 },
  { id: 64, abbr: "3JN", name: "III Послання Йоана", numberOfChapters: 1 },
  { id: 65, abbr: "JUD", name: "Послання Юди", numberOfChapters: 1 },
  { id: 66, abbr: "REV", name: "Обʼявлення", numberOfChapters: 22 },
];

const apiUrl =
  "https://bible-memorization-app-93051967.fastapicloud.dev/api/v1";

export default function Page() {
  const [BookName, setBookName] = useState<string>(BibleBooksData[0].name);
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [verseNumber, setVerseNumber] = useState<number>(1);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [verseOptions, setVerseOptions] = useState<
    {
      number: number;
      verse: string;
    }[]
  >([]);

  const fetchVerse = async () => {
    const BookAbbr = BibleBooksData.find(
      (Book) => Book.name === BookName,
    )?.abbr;
    const url = `${apiUrl}/${BookAbbr}/${chapterNumber}/${verseNumber}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data.verse;
  };

  useEffect(() => {
    const fetchVerses = async () => {
      const BookAbbr = BibleBooksData.find(
        (Book) => Book.name === BookName,
      )?.abbr;
      // const url = `${apiUrl}/${BookAbbr}/${chapterNumber}/verse`;
      const url = `https://open-bible-api.vercel.app/${BookAbbr}/${chapterNumber}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      if (data) setVerseOptions(data);
    };
    fetchVerses();
  }, [BookName, chapterNumber]);

  useEffect(() => {
    const saved = localStorage.getItem("verses");
    if (saved !== null) setVerses(JSON.parse(saved));
    else setVerses([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("verses", JSON.stringify(verses));
  }, [verses]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verse = await fetchVerse();
    addCard(verse);
  };

  const addCard = (verse: string) => {
    const calculatedReference = `${BookName} ${chapterNumber}:${verseNumber}`;
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
              value={BookName}
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
                  BibleBooksData.filter((Book) => Book.name === BookName)[0]
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

          <button className="btn self-end">Додати</button>
        </form>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {verses && verses.length !== 0 ? (
            verses.map((verse, index) => (
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
