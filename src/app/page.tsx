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
  name: string;
  numberOfChapters: number;
}

const BibleBooksData: BibleBook[] = [
  { name: "Буття", numberOfChapters: 50 },
  { name: "Вихід", numberOfChapters: 40 },
  { name: "Левит", numberOfChapters: 27 },
  { name: "Числа", numberOfChapters: 36 },
  { name: "Второзаконня", numberOfChapters: 34 },
  { name: "Iсус Навин", numberOfChapters: 24 },
  { name: "Судді", numberOfChapters: 21 },
  { name: "Рут", numberOfChapters: 4 },
  { name: "I Самуїл", numberOfChapters: 31 },
  { name: "II Самуїл", numberOfChapters: 24 },
  { name: "I Царі", numberOfChapters: 22 },
  { name: "II Царі", numberOfChapters: 25 },
  { name: "I Хроніка", numberOfChapters: 29 },
  { name: "II Хроніка", numberOfChapters: 36 },
  { name: "Ездра", numberOfChapters: 10 },
  { name: "Неємія", numberOfChapters: 13 },
  { name: "Естера", numberOfChapters: 10 },
  { name: "Іов", numberOfChapters: 42 },
  { name: "Псалми", numberOfChapters: 150 },
  { name: "Приповідки", numberOfChapters: 31 },
  { name: "Проповідник", numberOfChapters: 12 },
  { name: "Пісня пісень", numberOfChapters: 8 },
  { name: "Ісая", numberOfChapters: 66 },
  { name: "Єремiя", numberOfChapters: 52 },
  { name: "Плач Єремiї", numberOfChapters: 5 },
  { name: "Єзекiїль", numberOfChapters: 48 },
  { name: "Даниїл", numberOfChapters: 12 },
  { name: "Осiя", numberOfChapters: 14 },
  { name: "Йоіл", numberOfChapters: 3 },
  { name: "Амос", numberOfChapters: 9 },
  { name: "Овдiй", numberOfChapters: 1 },
  { name: "Йона", numberOfChapters: 4 },
  { name: "Міхей", numberOfChapters: 7 },
  { name: "Наум", numberOfChapters: 3 },
  { name: "Авакум", numberOfChapters: 3 },
  { name: "Софонiя", numberOfChapters: 3 },
  { name: "Аггей", numberOfChapters: 2 },
  { name: "Захарiя", numberOfChapters: 14 },
  { name: "Малахія", numberOfChapters: 4 },
  { name: "Матей", numberOfChapters: 28 },
  { name: "Марко", numberOfChapters: 16 },
  { name: "Лука", numberOfChapters: 24 },
  { name: "Йоан", numberOfChapters: 21 },
  { name: "Діяння", numberOfChapters: 28 },
  { name: "До римлян", numberOfChapters: 16 },
  { name: "I до Корінтян", numberOfChapters: 16 },
  { name: "II до Корінтян", numberOfChapters: 13 },
  { name: "До Галатiв", numberOfChapters: 6 },
  { name: "До Ефесян", numberOfChapters: 6 },
  { name: "До Филипʼян", numberOfChapters: 4 },
  { name: "До Колосян", numberOfChapters: 4 },
  { name: "I до Солунян", numberOfChapters: 5 },
  { name: "II до Солунян", numberOfChapters: 3 },
  { name: "I до Тимотея", numberOfChapters: 6 },
  { name: "II до Тимотея", numberOfChapters: 4 },
  { name: "До Тита", numberOfChapters: 3 },
  { name: "До Филимона", numberOfChapters: 1 },
  { name: "До євреїв", numberOfChapters: 13 },
  { name: "Якова", numberOfChapters: 5 },
  { name: "I Послання Петра", numberOfChapters: 5 },
  { name: "II Послання Петра", numberOfChapters: 3 },
  { name: "I Послання Йоана", numberOfChapters: 5 },
  { name: "II Послання Йоана", numberOfChapters: 1 },
  { name: "III Послання Йоана", numberOfChapters: 1 },
  { name: "Послання Юди", numberOfChapters: 1 },
  { name: "Обʼявлення", numberOfChapters: 22 },
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
