# Bible Mem — verse memorization PWA

Next.js (v16, App Router) + Tailwind. Browse the Bible, preview any verse
before adding it, memorize with flashcards / fill-blank / first-letters / typing.

## Data

- Source: `data/Bible.txt` (`BOOK CHAPTER:VERSE text`, UTF-8, 31,082 verses, 66 books).
- `npm run parse:bible` (also runs automatically as `prebuild`) splits it into
  `public/data/books.json` + `public/data/<CODE>.json`, loaded lazily per book.
- Generated JSON is git-ignored; Vercel rebuilds it via `prebuild`.

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # parse + production build
```

## Deploy (Vercel)

1. Push this folder as its own repo (or set Vercel project Root Directory to `bible-mem`).
2. Import in Vercel → defaults work (`npm run build`, output `.next`).
3. Open the URL on Android Chrome → ⋮ → "Add to Home screen" to install.

Deck + progress persist in `localStorage`; book JSON is cached by `public/sw.js` for offline use.

## Localization

UI defaults to Ukrainian with a UA/EN toggle (persisted in `localStorage`).
Book names ship in both languages (`nameUk` in the generated JSON) and the
reference box accepts Ukrainian input: `Ів 3:16`, `Пс 23:1`, `Буття 1:1`,
`1 Ів 5:11`, `Об'явлення 22:21`, `Мт 5:3` — as well as English (`JHN 3:16`).
