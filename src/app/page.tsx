"use client";

import { useState } from "react";

interface Verse {
  text: string;
  reference: string;
}

const verse: Verse = {
  reference: "ISA 44:8",
  text: "Не бійтесь і не лякайтесь. Хиба ж я з давна не вістив, не прорікав вам? Ви сьвідки мої. Чи ж є ще Бог крім мене? Нї, нема иншої твердинї; я нїякої не знаю.",
};

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
        <div
          className="bg-white rounded-md"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <div className="p-3">
            {isOpen ? (
              <>
                <p>{verse.text}</p>
              </>
            ) : (
              <>
                <p>{verse.reference}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
