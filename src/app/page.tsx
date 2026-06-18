"use client";

import { useState } from "react";

interface Verse {
  text: string;
  reference: string;
}

const cards: Verse[] = [
  {
    reference: "ISA 44:8",
    text: "Не бійтесь і не лякайтесь. Хиба ж я з давна не вістив, не прорікав вам? Ви сьвідки мої. Чи ж є ще Бог крім мене? Нї, нема иншої твердинї; я нїякої не знаю.",
  },
  {
    reference: "MAT 6:12",
    text: "І прости нам довги наші, як і ми прощаємо довжникам нашим.",
  },
  {
    reference: "ROM 8:31",
    text: "Що ж скажемо на се? Коли Бог за нас, хто на нас?",
  },
];

const Card = ({ card }: { card: Verse }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="bg-white rounded-md p-3 aspect-square flex justify-center items-center text-center cursor-pointer"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      {isOpen ? <p>{card.text}</p> : <p>{card.reference}</p>}
    </div>
  );
};

interface BibleBook {
  id: number;
  EnglishName: string;
  UkrainianName: string;
  numberOfChapters: number;
}

const BibleBooksData: BibleBook[] = [
  {
    id: 1,
    EnglishName: "Genesis",
    UkrainianName: "Буття",
    numberOfChapters: 50,
  },
  {
    id: 2,
    EnglishName: "Exodus",
    UkrainianName: "Вихід",
    numberOfChapters: 40,
  },
  {
    id: 3,
    EnglishName: "Leviticus",
    UkrainianName: "Левит",
    numberOfChapters: 27,
  },
  {
    id: 4,
    EnglishName: "Numbers",
    UkrainianName: "Числа",
    numberOfChapters: 36,
  },
  {
    id: 5,
    EnglishName: "Deuteronomy",
    UkrainianName: "Второзаконня",
    numberOfChapters: 34,
  },
  {
    id: 6,
    EnglishName: "Joshua",
    UkrainianName: "Iсус Навин",
    numberOfChapters: 24,
  },
  {
    id: 7,
    EnglishName: "Judges",
    UkrainianName: "Судді",
    numberOfChapters: 21,
  },
  { id: 8, EnglishName: "Ruth", UkrainianName: "Рут", numberOfChapters: 4 },
  {
    id: 9,
    EnglishName: "1 Samuel",
    UkrainianName: "I Самуїл",
    numberOfChapters: 31,
  },
  {
    id: 10,
    EnglishName: "2 Samuel",
    UkrainianName: "II Самуїл",
    numberOfChapters: 24,
  },
  {
    id: 11,
    EnglishName: "1 Kings",
    UkrainianName: "I Царі",
    numberOfChapters: 22,
  },
  {
    id: 12,
    EnglishName: "2 Kings",
    UkrainianName: "II Царі",
    numberOfChapters: 25,
  },
  {
    id: 13,
    EnglishName: "1 Chronicles",
    UkrainianName: "I Хроніка",
    numberOfChapters: 29,
  },
  {
    id: 14,
    EnglishName: "2 Chronicles",
    UkrainianName: "II Хроніка",
    numberOfChapters: 36,
  },
  { id: 15, EnglishName: "Ezra", UkrainianName: "Ездра", numberOfChapters: 10 },
  {
    id: 16,
    EnglishName: "Nehemiah",
    UkrainianName: "Неємія",
    numberOfChapters: 13,
  },
  {
    id: 17,
    EnglishName: "Esther",
    UkrainianName: "Естера",
    numberOfChapters: 10,
  },
  { id: 18, EnglishName: "Job", UkrainianName: "Іов", numberOfChapters: 42 },
  {
    id: 19,
    EnglishName: "Psalms",
    UkrainianName: "Псалми",
    numberOfChapters: 150,
  },
  {
    id: 20,
    EnglishName: "Proverbs",
    UkrainianName: "Приповідки",
    numberOfChapters: 31,
  },
  {
    id: 21,
    EnglishName: "Ecclesiastes",
    UkrainianName: "Проповідник",
    numberOfChapters: 12,
  },
  {
    id: 22,
    EnglishName: "Song of Solomon",
    UkrainianName: "Пісня пісень",
    numberOfChapters: 8,
  },
  {
    id: 23,
    EnglishName: "Isaiah",
    UkrainianName: "Ісая",
    numberOfChapters: 66,
  },
  {
    id: 24,
    EnglishName: "Jeremiah",
    UkrainianName: "Єремiя",
    numberOfChapters: 52,
  },
  {
    id: 25,
    EnglishName: "Lamentations",
    UkrainianName: "Плач Єремiї",
    numberOfChapters: 5,
  },
  {
    id: 26,
    EnglishName: "Ezekiel",
    UkrainianName: "Єзекiїль",
    numberOfChapters: 48,
  },
  {
    id: 27,
    EnglishName: "Daniel",
    UkrainianName: "Даниїл",
    numberOfChapters: 12,
  },
  { id: 28, EnglishName: "Hosea", UkrainianName: "Осiя", numberOfChapters: 14 },
  { id: 29, EnglishName: "Joel", UkrainianName: "Йоіл", numberOfChapters: 3 },
  { id: 30, EnglishName: "Amos", UkrainianName: "Амос", numberOfChapters: 9 },
  {
    id: 31,
    EnglishName: "Obadiah",
    UkrainianName: "Овдiй",
    numberOfChapters: 1,
  },
  { id: 32, EnglishName: "Jonah", UkrainianName: "Йона", numberOfChapters: 4 },
  { id: 33, EnglishName: "Micah", UkrainianName: "Міхей", numberOfChapters: 7 },
  { id: 34, EnglishName: "Nahum", UkrainianName: "Наум", numberOfChapters: 3 },
  {
    id: 35,
    EnglishName: "Habakkuk",
    UkrainianName: "Авакум",
    numberOfChapters: 3,
  },
  {
    id: 36,
    EnglishName: "Zephaniah",
    UkrainianName: "Софонiя",
    numberOfChapters: 3,
  },
  {
    id: 37,
    EnglishName: "Haggai",
    UkrainianName: "Аггей",
    numberOfChapters: 2,
  },
  {
    id: 38,
    EnglishName: "Zechariah",
    UkrainianName: "Захарiя",
    numberOfChapters: 14,
  },
  {
    id: 39,
    EnglishName: "Malachi",
    UkrainianName: "Малахія",
    numberOfChapters: 4,
  },
  {
    id: 40,
    EnglishName: "Matthew",
    UkrainianName: "Матей",
    numberOfChapters: 28,
  },
  { id: 41, EnglishName: "Mark", UkrainianName: "Марко", numberOfChapters: 16 },
  { id: 42, EnglishName: "Luke", UkrainianName: "Лука", numberOfChapters: 24 },
  { id: 43, EnglishName: "John", UkrainianName: "Йоан", numberOfChapters: 21 },
  {
    id: 44,
    EnglishName: "Acts",
    UkrainianName: "Діяння",
    numberOfChapters: 28,
  },
  {
    id: 45,
    EnglishName: "Romans",
    UkrainianName: "До римлян",
    numberOfChapters: 16,
  },
  {
    id: 46,
    EnglishName: "1 Corinthians",
    UkrainianName: "I до Корінтян",
    numberOfChapters: 16,
  },
  {
    id: 47,
    EnglishName: "2 Corinthians",
    UkrainianName: "II до Корінтян",
    numberOfChapters: 13,
  },
  {
    id: 48,
    EnglishName: "Galatians",
    UkrainianName: "До Галатiв",
    numberOfChapters: 6,
  },
  {
    id: 49,
    EnglishName: "Ephesians",
    UkrainianName: "До Ефесян",
    numberOfChapters: 6,
  },
  {
    id: 50,
    EnglishName: "Philippians",
    UkrainianName: "До Филипʼян",
    numberOfChapters: 4,
  },
  {
    id: 51,
    EnglishName: "Colossians",
    UkrainianName: "До Колосян",
    numberOfChapters: 4,
  },
  {
    id: 52,
    EnglishName: "1 Thessalonians",
    UkrainianName: "I до Солунян",
    numberOfChapters: 5,
  },
  {
    id: 53,
    EnglishName: "2 Thessalonians",
    UkrainianName: "II до Солунян",
    numberOfChapters: 3,
  },
  {
    id: 54,
    EnglishName: "1 Timothy",
    UkrainianName: "I до Тимотея",
    numberOfChapters: 6,
  },
  {
    id: 55,
    EnglishName: "2 Timothy",
    UkrainianName: "II до Тимотея",
    numberOfChapters: 4,
  },
  {
    id: 56,
    EnglishName: "Titus",
    UkrainianName: "До Тита",
    numberOfChapters: 3,
  },
  {
    id: 57,
    EnglishName: "Philemon",
    UkrainianName: "До Филимона",
    numberOfChapters: 1,
  },
  {
    id: 58,
    EnglishName: "Hebrews",
    UkrainianName: "До євреїв",
    numberOfChapters: 13,
  },
  { id: 59, EnglishName: "James", UkrainianName: "Якова", numberOfChapters: 5 },
  {
    id: 60,
    EnglishName: "1 Peter",
    UkrainianName: "I Послання Петра",
    numberOfChapters: 5,
  },
  {
    id: 61,
    EnglishName: "2 Peter",
    UkrainianName: "II Послання Петра",
    numberOfChapters: 3,
  },
  {
    id: 62,
    EnglishName: "1 John",
    UkrainianName: "I Послання Йоана",
    numberOfChapters: 5,
  },
  {
    id: 63,
    EnglishName: "2 John",
    UkrainianName: "II Послання Йоана",
    numberOfChapters: 1,
  },
  {
    id: 64,
    EnglishName: "3 John",
    UkrainianName: "III Послання Йоана",
    numberOfChapters: 1,
  },
  {
    id: 65,
    EnglishName: "Jude",
    UkrainianName: "Послання Юди",
    numberOfChapters: 1,
  },
  {
    id: 66,
    EnglishName: "Revelation",
    UkrainianName: "Обʼявлення",
    numberOfChapters: 22,
  },
];

export default function Page() {
  const [translation, setTranslation] = useState<"UKRK" | "ESV">("ESV");

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="max-w-3xl mx-auto flex items-center justify-center flex-col p-3 gap-3">
        <section className="bg-white rounded-md p-3 flex flex-col sm:flex-row gap-3 w-full">
          <select
            name="translationSelect"
            id="translationSelect"
            className="select w-full md:w-32 md:flex-1"
            value={translation}
            onChange={(e) =>
              setTranslation(e.target.value === "UKRK" ? "UKRK" : "ESV")
            }
          >
            <option value="UKRK" defaultChecked>
              Біблія Куліша
            </option>
            <option value="ESV">English Standard Version</option>
          </select>
          <select
            name="BookSelect"
            id="BookSelect"
            className="select w-full md:w-32 md:flex-1"
          >
            {BibleBooksData.map((BookName, index) => (
              <option value={BookName.id} key={index}>
                {translation === "ESV"
                  ? BookName.EnglishName
                  : BookName.UkrainianName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Chapter number..."
            className="input w-full md:w-32 md:flex-1"
            id="chapterInput"
            name="chapterInput"
          />
          <input
            type="text"
            placeholder="Verse number..."
            className="input w-full md:w-32 md:flex-1"
            id="verseInput"
            name="verseInput"
          />
          <button className="btn">Add</button>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {cards.map((card, index) => (
            <Card card={card} key={index} />
          ))}
        </section>
      </div>
    </div>
  );
}
