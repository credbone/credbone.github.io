import { useState, useEffect, useRef, ChangeEvent } from "react";
import { RouteData, routesData } from "./routesData";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

const STOP_WORDS = ["and", "or", "the", "a", "an", "in", "on", "at", "with", "by", "for", "to"];
const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 100;
const RANDOM_TAG_COUNT = 3;

function scoreAndFilter(query: string): RouteData[] {
  const lower = query.toLowerCase();

  if (lower.length < MIN_QUERY_LENGTH || lower.length > MAX_QUERY_LENGTH) return [];

  const terms = lower
    .split(/\s+/)
    .filter((t) => t.trim() !== "" && !STOP_WORDS.includes(t));

  if (terms.length === 0) return [];

  return routesData
    .map((route) => ({
      route,
      score:
        terms.reduce((acc, term) => {
          const exactIdx = route.tags.findIndex((tag) => tag.toLowerCase() === term);
          const partialIdx = route.tags.findIndex((tag) => tag.toLowerCase().includes(term));
          const exactScore = exactIdx !== -1 ? 10 - exactIdx * 0.1 : 0;
          const partialScore = partialIdx !== -1 ? 1 - partialIdx * 0.01 : 0;
          const titleScore = route.title.toLowerCase().includes(term) ? 5 : 0;
          return acc + exactScore + partialScore + titleScore;
        }, 0) / route.tags.length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ route }) => route);
}

function getRandomTags(count = RANDOM_TAG_COUNT): string[] {
  const allTags = routesData
    .filter((route) => route.tagsVisible !== false)
    .flatMap((route) => route.tags);

  const unique = Array.from(new Set(allTags));
  const result: string[] = [];

  for (let i = 0; i < count && unique.length > 0; i++) {
    const idx = Math.floor(Math.random() * unique.length);
    result.push(unique[idx].toLowerCase());
    unique.splice(idx, 1);
  }

  return result;
}

interface UseSearchOptions {
  showRandomTagsByDefault?: boolean;
  initialQuery?: string;
  onClose?: () => void;
}

export function useSearch({ showRandomTagsByDefault = true, initialQuery = "", onClose }: UseSearchOptions = {}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<RouteData[]>([]);
  const [randomTags, setRandomTags] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navigate = useNavigate();

  // Scroll focused result into view
  useEffect(() => {
    if (isMobile) return;
    if (focusedIndex >= 0) {
      resultRefs.current[focusedIndex]?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [focusedIndex]);

  // Init random tags
  useEffect(() => {
    if (showRandomTagsByDefault) setRandomTags(getRandomTags());
  }, [showRandomTagsByDefault]);

  // Init search from initialQuery
  useEffect(() => {
    if (initialQuery) {
      const found = scoreAndFilter(initialQuery);
      setResults(found);
    }
  }, []);

  const search = (query: string) => {
    setSearchQuery(query);
    const found = scoreAndFilter(query);
    setResults(found);
    setFocusedIndex(!isMobile && found.length > 0 ? 0 : -1);

    if (found.length === 0 && showRandomTagsByDefault && randomTags.length === 0) {
      setRandomTags(getRandomTags());
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  const searchByTag = (tag: string) => search(tag);

  const clearSearch = (callback?: () => void) => {
    setSearchQuery("");
    setResults([]);
    setFocusedIndex(-1);
    if (showRandomTagsByDefault) setRandomTags(getRandomTags());
    callback?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isMobile) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (focusedIndex >= 0 && results[focusedIndex]) {
        navigate(results[focusedIndex].path);
        onClose?.();
      }
    } else if (e.key === "Escape") {
      clearSearch();
      e.currentTarget.blur();
      onClose?.();
    }
  };

  return {
    searchQuery,
    results,
    randomTags,
    focusedIndex,
    resultRefs,
    handleSearchChange,
    handleKeyDown,
    searchByTag,
    clearSearch,
  };
}