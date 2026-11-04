import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WatchList",
  description: "TV show tracking app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header>
          <h1>WatchList</h1>

          <nav>
            <Link href="/">Home</Link>
            {" | "}
            <Link href="/watchlist">My Watchlist</Link>
            {" | "}
            <Link href="/watchlist/new">Add Show</Link>
            {" | "}
            <Link href="/watchlist/1">Show Details</Link>
            {" | "}
            <Link href="/watchlist/1/edit">Edit Show</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
