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
      className="bg-white rounded-md p-3 aspect-square flex justify-center items-center text-center"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      {isOpen ? <p>{card.text}</p> : <p>{card.reference}</p>}
    </div>
  );
};

export default function Page() {
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="max-w-3xl mx-auto flex items-center justify-center flex-col p-3 gap-3">
        <section className="bg-white rounded-md p-3 flex gap-3 w-full">
          <select
            name="translationSelect"
            id="translationSelect"
            className="select w-32 flex-1"
          >
            <option value="UKRK" defaultChecked>
              Біблія Куліша
            </option>
            <option value="ESV">English Standard Version</option>
          </select>
          <input
            type="text"
            placeholder="Book name..."
            className="input w-32 flex-1"
            id="BookInput"
            name="BookInput"
          />
          <input
            type="text"
            placeholder="Chapter number..."
            className="input w-32 flex-1"
            id="chapterInput"
            name="chapterInput"
          />
          <input
            type="text"
            placeholder="Verse number..."
            className="input w-32 flex-1"
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
