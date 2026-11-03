"use client";

import { WatchlistProvider } from "../context/WatchlistContext";

export default function Providers({ children }) {
  return <WatchlistProvider>{children}</WatchlistProvider>;
}