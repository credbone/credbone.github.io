import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { RouteData, routesData } from "./routesData";
import Ripple from "../../components/Ripple";
import { IconSearch } from "../../components/icon/credIcons";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Tooltip from "../../components/tooltip";
import { CornerDownLeft, X } from "lucide-react";

interface SearchComponentProps {
  showRandomTagsByDefault?: boolean;
}

function SearchComponent({
  showRandomTagsByDefault = true,
}: SearchComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<RouteData[]>([]);
  const [randomTags, setRandomTags] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUrlQueryRef = useRef<string>("");
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (focusedIndex >= 0 && resultRefs.current[focusedIndex]) {
      resultRefs.current[focusedIndex]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0) {
      setFocusedIndex(0);
    }
  }, [results]);

  // Initialize search from URL parameter on mount
  useEffect(() => {
    const queryFromUrl = searchParams.get("q");
    if (queryFromUrl) {
      const MAX_URL_LENGTH = 50;
      const MIN_SEARCH_LENGTH = 2;
      const trimmedQuery = queryFromUrl.slice(0, MAX_URL_LENGTH);

      setSearchQuery(trimmedQuery);

      if (trimmedQuery.length >= MIN_SEARCH_LENGTH) {
        performSearch(trimmedQuery);
        lastUrlQueryRef.current = trimmedQuery;
      } else if (showRandomTagsByDefault) {
        showRandomTags();
      }

      if (
        trimmedQuery !== queryFromUrl ||
        trimmedQuery.length < MIN_SEARCH_LENGTH
      ) {
        if (trimmedQuery.length >= MIN_SEARCH_LENGTH) {
          setSearchParams({ q: trimmedQuery }, { replace: true });
          lastUrlQueryRef.current = trimmedQuery;
        } else {
          setSearchParams({}, { replace: true });
          lastUrlQueryRef.current = "";
        }
      }
    } else if (showRandomTagsByDefault) {
      showRandomTags();
      lastUrlQueryRef.current = "";
    }
  }, []);

  // Debounced URL update
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const MAX_URL_LENGTH = 50;
      const MIN_URL_LENGTH = 2;

      let targetUrlQuery = "";
      if (
        searchQuery.length >= MIN_URL_LENGTH &&
        searchQuery.length <= MAX_URL_LENGTH
      ) {
        targetUrlQuery = searchQuery;
      }

      if (targetUrlQuery !== lastUrlQueryRef.current) {
        if (targetUrlQuery) {
          setSearchParams({ q: targetUrlQuery }, { replace: true });
        } else {
          setSearchParams({}, { replace: true });
        }
        lastUrlQueryRef.current = targetUrlQuery;
      }
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const performSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const stopWords = [
      "and",
      "or",
      "the",
      "a",
      "an",
      "in",
      "on",
      "at",
      "with",
      "by",
      "for",
      "to",
    ];

    if (lowerQuery.length > 1 && lowerQuery.length <= 100) {
      const searchTerms = lowerQuery
        .split(/\s+/)
        .filter((term) => term.trim() !== "" && !stopWords.includes(term));

 
        if (searchTerms.length > 0) {
  const filteredResults = routesData
   // .filter((route) => route.tagsVisible !== false)
.map((route) => ({
  route,
  score: searchTerms.reduce((acc, term) => {
    const exactIdx = route.tags.findIndex((tag) => tag.toLowerCase() === term);
    const partialIdx = route.tags.findIndex((tag) => tag.toLowerCase().includes(term));

    const exactScore = exactIdx !== -1 ? 10 - exactIdx * 0.1 : 0;
    const partialScore = partialIdx !== -1 ? 1 - partialIdx * 0.01 : 0;
    const titleScore = route.title.toLowerCase().includes(term) ? 5 : 0; // 👈

    return acc + exactScore + partialScore + titleScore;
  }, 0) / route.tags.length,
}))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ route }) => route);

  setResults(filteredResults);

  if (
    filteredResults.length === 0 &&
    showRandomTagsByDefault &&
    randomTags.length === 0
  ) {
    showRandomTags();
  }
} else {
  setResults([]);
}


    } else {
      setResults([]);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFocusedIndex(-1);
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setFocusedIndex(-1);
    setSearchParams({}, { replace: true });
    lastUrlQueryRef.current = "";
    if (showRandomTagsByDefault) {
      showRandomTags();
    }
  };

  const showRandomTags = () => {
    const allTags = routesData
  .filter((route) => route.tagsVisible !== false)
  .flatMap((route) => route.tags);

    

    const uniqueTags = Array.from(new Set(allTags));
    const randomTags = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * uniqueTags.length);
      randomTags.push(uniqueTags[randomIndex].toLowerCase());
      uniqueTags.splice(randomIndex, 1);
    }
    setRandomTags(randomTags);
  };

  const searchByTag = (tag: string) => {
    setSearchQuery(tag);
    performSearch(tag);
  };

  return (
    <>
      <group
        data-sticky="top"
        data-top="adaptive-30-50"
        data-width="auto"
        data-gap="20"
      >
        <group
          data-length="600"
          data-radius="15"
          data-border="outline"
          data-align="center"
          data-backdrop="10"
          data-contain=""
          data-shrink="no"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.75"
        >
          <Ripple>
            <label
              data-align="center"
              className="field"
              data-label="left"
              data-multi-element=""
              data-length="autofit"
              data-space-horizontal="10"
            >
              <div className="form_fields">
                <div className="field_cont" data-height="50" data-gap="10">
                  <group
                    data-length="30"
                    data-align="center"
                    data-justify="center"
                  >
                    <IconSearch size={20} />
                  </group>

                  <separator data-vertical="" data-height="20"></separator>
                  <input
                    autoCapitalize="off"
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    autoFocus={!showRandomTagsByDefault}
                    name="searchinput"
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setFocusedIndex((i) =>
                          Math.min(i + 1, results.length - 1),
                        );
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setFocusedIndex((i) => Math.max(i - 1, 0));
                      } else if (e.key === "Enter") {
                        if (focusedIndex >= 0 && results[focusedIndex]) {
                          navigate(results[focusedIndex].path);
                        }
                      } else if (e.key === "Escape") {
                        clearSearch();
                        e.currentTarget.blur();
                      }
                    }}
                  />

                  {searchQuery && (
                    <Tooltip content="Clear" delay={300}>
                      <group
                        data-contain=""
                        data-space="5"
                        data-shrink="no"
                        data-interactive=""
                        data-width="auto"
                        data-cursor="pointer"
                        data-radius="5"
                        data-align="center"
                        data-direction="column"
                        onClick={clearSearch}
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="2"
                      >
                        <icon data-height="auto">{<X size={20} />}</icon>
                      </group>
                    </Tooltip>
                  )}
                </div>
              </div>
            </label>
          </Ripple>
        </group>

        {!searchQuery && showRandomTagsByDefault && (
          <>
            <group
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration="2"
            >
              <text data-opacity="60">Try searching for...</text>
            </group>
            <group data-gap="5">
              {randomTags.map((tag, index) => (
                <group
                  data-contain=""
                  data-space="10"
                  data-space-horizontal="20"
                  data-shrink="no"
                  data-interactive=""
                  data-width="auto"
                  data-cursor="pointer"
                  data-radius="15"
                  data-align="center"
                  data-direction="column"
                  data-background="highlight"
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration={2 + index * 0.25}
                  key={index}
                  onClick={() => searchByTag(tag)}
                >
                  <text
                    data-text-transform="capitalize"
                    data-ellipsis=""
                    data-weight="600"
                  >
                    {tag}
                  </text>
                </group>
              ))}
            </group>
          </>
        )}
      </group>

      {searchQuery && results.length === 0 && (
        <group data-direction="column" data-gap="30" data-max-length="600">
          <group
            data-gap="15"
            data-radius="20"
            data-wrap="no"
            data-align="center"
          >
            <group
              data-direction="column"
              data-gap="5"
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration="2.75"
            >
              <group>
                <text
                  data-text-size="medium"
                  data-font-type="hero"
                  data-wrap="preline"
                  data-ellipsis=""
                  data-line="1"
                >
                  No results found
                </text>
              </group>

              <group>
                <text
                  data-opacity="50"
                  data-wrap="wrap"
                  data-max-length="260"
                  data-line="1.2"
                >
                  Try one of the suggested tags below or adjust your keywords.
                </text>
              </group>
            </group>
          </group>

          <group data-gap="5">
            {randomTags.map((tag, index) => (
              <group
                data-contain=""
                data-space="10"
                data-space-horizontal="20"
                data-shrink="no"
                data-interactive=""
                data-width="auto"
                data-cursor="pointer"
                data-radius="15"
                data-align="center"
                data-direction="column"
                data-background="highlight"
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration={2 + index * 0.25}
                key={index}
                onClick={() => searchByTag(tag)}
              >
                <text
                  data-text-transform="capitalize"
                  data-ellipsis=""
                  data-weight="600"
                >
                  {tag}
                </text>
              </group>
            ))}
          </group>
        </group>
      )}

      {results.length > 0 && (
        <group data-direction="column" data-max-length="600" data-align="start">
          {results.map((result, index) => (
            <Link
              data-contain=""
              data-type="group"
              key={index}
              to={`${result.path}`}
              data-direction="column"
              data-name="autoseparation"
              data-space-horizontal="20"
              data-radius="20"
              data-interactive=""
              data-animation-name="appear-top"
              data-fill-mode="backwards"
              data-animation-duration={2 + index * 0.25}
              tabIndex={index}
              ref={(el: HTMLAnchorElement | null) =>
                (resultRefs.current[index] = el)
              }
              data-background={
                focusedIndex === index ? "adaptive-gray" : undefined
              }
              data-selected={focusedIndex === index ? "true" : undefined}
            >
              <separator data-horizontal="dotted"></separator>
              <group data-wrap="no" data-align="center">
                <group
                  data-space-vertical="20"
                  data-direction="column"
                  data-gap="5"
                >
                  <text
                    data-weight="700"
                    data-color="main"
                    data-wrap="preline"
                    data-text-size="medium"
                    data-font-type="hero"
                    data-line="1"
                  >
                    {result.title}
                  </text>
                  <text
                    data-opacity="50"
                    data-wrap="balance"
                    data-ellipsis=""
                    data-length="300"
                  >
                    {result.description}
                  </text>
                </group>

                <group
                  data-space="15"
                  data-width="auto"
                  data-opacity={focusedIndex === index ? "60" : "0"}
                >
                  <CornerDownLeft strokeWidth={1} />
                </group>
              </group>
            </Link>
          ))}
        </group>
      )}
    </>
  );
}

export default SearchComponent;