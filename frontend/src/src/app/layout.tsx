import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bible Mem — memorize verses",
  description: "Browse the Bible, preview any verse, add it to your deck, and memorize with flashcards, blanks, and typing.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Bible Mem" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="border-b">
          <div className="mx-auto flex w-full max-w-2xl items-center justify-between p-4">
            <p className="font-semibold">📖 Bible Mem</p>
            <p className="text-xs opacity-60">PWA · works offline</p>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker" in navigator){addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(()=>{})})}`,
          }}
        />
      </body>
    </html>
  );
}
