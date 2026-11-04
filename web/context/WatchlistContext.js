"use client";

import { createContext, useContext, useMemo, useState } from "react";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [savedShows, setSavedShows] = useState([]);

  function addShow(show) {
    setSavedShows((current) => {
      if (current.some((item) => item.id === show.id)) {
        return current;
      }

      return [...current, show];
    });
  }

  function removeShow(id) {
    setSavedShows((current) =>
      current.filter((show) => show.id !== id)
    );
  }

  const value = useMemo(
    () => ({ savedShows, addShow, removeShow }),
    [savedShows]
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}