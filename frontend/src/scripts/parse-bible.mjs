// Parses ../Bible.txt (format: "GEN 1:1 text") into public/data/*.json
// Run: node scripts/parse-bible.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "data", "Bible.txt");
const outDir = join(root, "public", "data");

const CANON = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  "MAT",
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
];
const NAMES = {
  GEN: "Genesis",
  EXO: "Exodus",
  LEV: "Leviticus",
  NUM: "Numbers",
  DEU: "Deuteronomy",
  JOS: "Joshua",
  JDG: "Judges",
  RUT: "Ruth",
  "1SA": "1 Samuel",
  "2SA": "2 Samuel",
  "1KI": "1 Kings",
  "2KI": "2 Kings",
  "1CH": "1 Chronicles",
  "2CH": "2 Chronicles",
  EZR: "Ezra",
  NEH: "Nehemiah",
  EST: "Esther",
  JOB: "Job",
  PSA: "Psalms",
  PRO: "Proverbs",
  ECC: "Ecclesiastes",
  SNG: "Song of Songs",
  ISA: "Isaiah",
  JER: "Jeremiah",
  LAM: "Lamentations",
  EZK: "Ezekiel",
  DAN: "Daniel",
  HOS: "Hosea",
  JOL: "Joel",
  AMO: "Amos",
  OBA: "Obadiah",
  JON: "Jonah",
  MIC: "Micah",
  NAM: "Nahum",
  HAB: "Habakkuk",
  ZEP: "Zephaniah",
  HAG: "Haggai",
  ZEC: "Zechariah",
  MAL: "Malachi",
  MAT: "Matthew",
  MRK: "Mark",
  LUK: "Luke",
  JHN: "John",
  ACT: "Acts",
  ROM: "Romans",
  "1CO": "1 Corinthians",
  "2CO": "2 Corinthians",
  GAL: "Galatians",
  EPH: "Ephesians",
  PHP: "Philippians",
  COL: "Colossians",
  "1TH": "1 Thessalonians",
  "2TH": "2 Thessalonians",
  "1TI": "1 Timothy",
  "2TI": "2 Timothy",
  TIT: "Titus",
  PHM: "Philemon",
  HEB: "Hebrews",
  JAS: "James",
  "1PE": "1 Peter",
  "2PE": "2 Peter",
  "1JN": "1 John",
  "2JN": "2 John",
  "3JN": "3 John",
  JUD: "Jude",
  REV: "Revelation",
};

const raw = readFileSync(src, "utf8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
const books = new Map();
let bad = 0;
for (const line of lines) {
  const m = line.match(/^(\S+)\s+(\d+):(\d+)\s+([\s\S]+)$/);
  if (!m) {
    bad++;
    continue;
  }
  const [, code, ch, vs, text] = m;
  if (!books.has(code)) books.set(code, new Map());
  const chapters = books.get(code);
  const c = Number(ch),
    v = Number(vs);
  if (!chapters.has(c)) chapters.set(c, []);
  chapters.get(c).push({ v, text });
}

mkdirSync(outDir, { recursive: true });
const index = [];
for (const code of CANON.filter((c) => books.has(c))) {
  const chapters = books.get(code);
  const chCount = Math.max(...chapters.keys());
  let verseCount = 0;
  const chVerseCounts = {};
  for (const [c, verses] of chapters) {
    verses.sort((a, b) => a.v - b.v);
    chVerseCounts[c] = verses.length;
    verseCount += verses.length;
  }
  // write per-book file: { code, name, chapters: { "1": [{v,text}] } }
  const obj = {};
  for (const [c, verses] of [...chapters.entries()].sort((a, b) => a[0] - b[0]))
    obj[c] = verses;
  writeFileSync(
    join(outDir, `${code}.json`),
    JSON.stringify({ code, name: NAMES[code] ?? code, chapters: obj }),
  );
  index.push({
    code,
    name: NAMES[code] ?? code,
    chapters: chCount,
    verses: verseCount,
    versesPerChapter: chVerseCounts,
  });
}
// any non-canonical leftovers
for (const code of [...books.keys()].filter((c) => !CANON.includes(c))) {
  console.warn("unknown book code:", code);
}
writeFileSync(join(outDir, "books.json"), JSON.stringify(index));
console.log(
  `parsed ${lines.length} lines, bad=${bad}, books=${index.length}, totalVerses=${index.reduce((a, b) => a + b.verses, 0)}`,
);
