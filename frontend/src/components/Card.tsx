import { Verse } from "@/app/page";
import { useState } from "react";

export const Card = ({
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
