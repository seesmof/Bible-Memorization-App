"use client";

import { useState } from "react";

interface Verse {
  text: string;
  reference: string;
}

const cards: Verse[] = [
  {
    reference: "Ісая 44:8",
    text: "Не бійтесь і не лякайтесь. Хиба ж я з давна не вістив, не прорікав вам? Ви сьвідки мої. Чи ж є ще Бог крім мене? Нї, нема иншої твердинї; я нїякої не знаю.",
  },
  {
    reference: "Матей 6:12",
    text: "І прости нам довги наші, як і ми прощаємо довжникам нашим.",
  },
  {
    reference: "До римлян 8:31",
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
  name: string;
  numberOfChapters: number;
}

const BibleBooksData: BibleBook[] = [
  {
    id: 1,
    name: "Буття",
    numberOfChapters: 50,
  },
  {
    id: 2,
    name: "Вихід",
    numberOfChapters: 40,
  },
  {
    id: 3,
    name: "Левит",
    numberOfChapters: 27,
  },
  {
    id: 4,
    name: "Числа",
    numberOfChapters: 36,
  },
  {
    id: 5,
    name: "Второзаконня",
    numberOfChapters: 34,
  },
  {
    id: 6,
    name: "Iсус Навин",
    numberOfChapters: 24,
  },
  {
    id: 7,
    name: "Судді",
    numberOfChapters: 21,
  },
  { id: 8, name: "Рут", numberOfChapters: 4 },
  {
    id: 9,
    name: "I Самуїл",
    numberOfChapters: 31,
  },
  {
    id: 10,
    name: "II Самуїл",
    numberOfChapters: 24,
  },
  {
    id: 11,
    name: "I Царі",
    numberOfChapters: 22,
  },
  {
    id: 12,
    name: "II Царі",
    numberOfChapters: 25,
  },
  {
    id: 13,
    name: "I Хроніка",
    numberOfChapters: 29,
  },
  {
    id: 14,
    name: "II Хроніка",
    numberOfChapters: 36,
  },
  { id: 15, name: "Ездра", numberOfChapters: 10 },
  {
    id: 16,
    name: "Неємія",
    numberOfChapters: 13,
  },
  {
    id: 17,
    name: "Естера",
    numberOfChapters: 10,
  },
  { id: 18, name: "Іов", numberOfChapters: 42 },
  {
    id: 19,
    name: "Псалми",
    numberOfChapters: 150,
  },
  {
    id: 20,
    name: "Приповідки",
    numberOfChapters: 31,
  },
  {
    id: 21,
    name: "Проповідник",
    numberOfChapters: 12,
  },
  {
    id: 22,
    name: "Пісня пісень",
    numberOfChapters: 8,
  },
  {
    id: 23,
    name: "Ісая",
    numberOfChapters: 66,
  },
  {
    id: 24,
    name: "Єремiя",
    numberOfChapters: 52,
  },
  {
    id: 25,
    name: "Плач Єремiї",
    numberOfChapters: 5,
  },
  {
    id: 26,
    name: "Єзекiїль",
    numberOfChapters: 48,
  },
  {
    id: 27,
    name: "Даниїл",
    numberOfChapters: 12,
  },
  { id: 28, name: "Осiя", numberOfChapters: 14 },
  { id: 29, name: "Йоіл", numberOfChapters: 3 },
  { id: 30, name: "Амос", numberOfChapters: 9 },
  {
    id: 31,
    name: "Овдiй",
    numberOfChapters: 1,
  },
  { id: 32, name: "Йона", numberOfChapters: 4 },
  { id: 33, name: "Міхей", numberOfChapters: 7 },
  { id: 34, name: "Наум", numberOfChapters: 3 },
  {
    id: 35,
    name: "Авакум",
    numberOfChapters: 3,
  },
  {
    id: 36,
    name: "Софонiя",
    numberOfChapters: 3,
  },
  {
    id: 37,
    name: "Аггей",
    numberOfChapters: 2,
  },
  {
    id: 38,
    name: "Захарiя",
    numberOfChapters: 14,
  },
  {
    id: 39,
    name: "Малахія",
    numberOfChapters: 4,
  },
  {
    id: 40,
    name: "Матей",
    numberOfChapters: 28,
  },
  { id: 41, name: "Марко", numberOfChapters: 16 },
  { id: 42, name: "Лука", numberOfChapters: 24 },
  { id: 43, name: "Йоан", numberOfChapters: 21 },
  {
    id: 44,
    name: "Діяння",
    numberOfChapters: 28,
  },
  {
    id: 45,
    name: "До римлян",
    numberOfChapters: 16,
  },
  {
    id: 46,
    name: "I до Корінтян",
    numberOfChapters: 16,
  },
  {
    id: 47,
    name: "II до Корінтян",
    numberOfChapters: 13,
  },
  {
    id: 48,
    name: "До Галатiв",
    numberOfChapters: 6,
  },
  {
    id: 49,
    name: "До Ефесян",
    numberOfChapters: 6,
  },
  {
    id: 50,
    name: "До Филипʼян",
    numberOfChapters: 4,
  },
  {
    id: 51,
    name: "До Колосян",
    numberOfChapters: 4,
  },
  {
    id: 52,
    name: "I до Солунян",
    numberOfChapters: 5,
  },
  {
    id: 53,
    name: "II до Солунян",
    numberOfChapters: 3,
  },
  {
    id: 54,
    name: "I до Тимотея",
    numberOfChapters: 6,
  },
  {
    id: 55,
    name: "II до Тимотея",
    numberOfChapters: 4,
  },
  {
    id: 56,
    name: "До Тита",
    numberOfChapters: 3,
  },
  {
    id: 57,
    name: "До Филимона",
    numberOfChapters: 1,
  },
  {
    id: 58,
    name: "До євреїв",
    numberOfChapters: 13,
  },
  { id: 59, name: "Якова", numberOfChapters: 5 },
  {
    id: 60,
    name: "I Послання Петра",
    numberOfChapters: 5,
  },
  {
    id: 61,
    name: "II Послання Петра",
    numberOfChapters: 3,
  },
  {
    id: 62,
    name: "I Послання Йоана",
    numberOfChapters: 5,
  },
  {
    id: 63,
    name: "II Послання Йоана",
    numberOfChapters: 1,
  },
  {
    id: 64,
    name: "III Послання Йоана",
    numberOfChapters: 1,
  },
  {
    id: 65,
    name: "Послання Юди",
    numberOfChapters: 1,
  },
  {
    id: 66,
    name: "Обʼявлення",
    numberOfChapters: 22,
  },
];

export default function Page() {
  const [selectedBook, setSelectedBook] = useState<string>(
    BibleBooksData[0].name,
  );
  const [chapter, setChapter] = useState<number>(1);
  const [verse, setVerse] = useState<number>(1);

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="max-w-3xl mx-auto flex items-center justify-center flex-col p-3 gap-3">
        <section className="bg-white rounded-md p-3 flex flex-col sm:flex-row gap-3 w-full">
          {/* Book Select */}
          <select
            className="select w-full sm:flex-1"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            {BibleBooksData.map((Book, index) => (
              <option value={Book.name} key={index}>
                {Book.name}
              </option>
            ))}
          </select>

          {/* Chapter Select */}
          <select
            className="select w-full sm:flex-1"
            value={chapter}
            onChange={(e) => setChapter(Number.parseInt(e.target.value))}
          >
            {Array.from(
              new Array(
                BibleBooksData.filter((Book) => Book.name === selectedBook)[0]
                  .numberOfChapters,
              ),
              (x, i) => i + 1,
            ).map((number, index) => (
              <option value={number} key={index}>
                {number}
              </option>
            ))}
          </select>

          {/* Verse Number Input */}
          <input
            type="number"
            className="input w-full sm:flex-1"
            value={verse}
            onChange={(e) => setVerse(Number.parseInt(e.target.value))}
            min={1}
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
