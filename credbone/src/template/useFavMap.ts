// useFavMap.ts

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fav_map";

const getFavMap = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

export const useFavMap = () => {
  const [favMap, setFavMap] = useState<Record<string, boolean>>(getFavMap);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavMap(getFavMap());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleFav = useCallback((key: string) => {
    const next = { ...getFavMap(), [key]: !getFavMap()[key] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setFavMap(next);
  }, []);

  const isFav = useCallback((key: string) => favMap[key] ?? false, [favMap]);

  return { isFav, toggleFav };
};