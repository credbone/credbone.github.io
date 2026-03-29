import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { RouteData, routesData } from "./routesData";

import { IconSearch } from "../../components/icon/credIcons";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../components/tooltip";
import { CornerDownLeft, X } from "lucide-react";

interface SearchComponentProps {
  showRandomTagsByDefault?: boolean;
}

function SearchFloating({
  showRandomTagsByDefault = true,
}: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<RouteData[]>([]);
  const [randomTags, setRandomTags] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const navigate = useNavigate();
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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

  useEffect(() => {
    if (showRandomTagsByDefault) {
      showRandomTags();
    }
  }, [showRandomTagsByDefault]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFocusedIndex(-1);

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

    if (query.length > 1 && query.length <= 100) {
      const searchTerms = query
        .split(/\s+/)
        .filter((term) => term.trim() !== "" && !stopWords.includes(term));

      if (searchTerms.length > 0) {
        const filteredResults = routesData
          // .filter((route) => route.tagsVisible !== false)
          .map((route) => ({
            route,
            score:
              searchTerms.reduce((acc, term) => {
                const exactIdx = route.tags.findIndex(
                  (tag) => tag.toLowerCase() === term,
                );
                const partialIdx = route.tags.findIndex((tag) =>
                  tag.toLowerCase().includes(term),
                );

                const exactScore = exactIdx !== -1 ? 10 - exactIdx * 0.1 : 0;
                const partialScore =
                  partialIdx !== -1 ? 1 - partialIdx * 0.01 : 0;
                const titleScore = route.title.toLowerCase().includes(term)
                  ? 5
                  : 0; // 👈

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

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setFocusedIndex(-1);
    if (showRandomTagsByDefault) {
      showRandomTags();
    }
  };

  const showRandomTags = () => {
    const allTags = routesData.flatMap((route) => route.tags);
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
    handleSearch({ target: { value: tag } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <group data-width="auto" data-gap="20" data-sticky="top">
        <group
          data-length="500"
          data-align="center"
          data-background="text"
          data-color="main-background"
          data-index="2"
          data-radius="20"
          data-contain=""
          data-shrink="no"
        >
          <label
            data-align="center"
            className="field"
            data-label="left"
            data-multi-element=""
            data-length="autofit"
            data-space-horizontal="15"
          >
            <div className="form_fields">
              <div className="field_cont" data-height="60" data-gap="15">
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
                  autoComplete="off"
                  name="floatingsearch"
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
                      //  else {
                      //   e.currentTarget.blur();
                      // }
                    } else if (e.key === "Escape") {
                      clearSearch();
                      e.currentTarget.blur();
                    }
                  }}
                />

                {searchQuery && (
                  <Tooltip content="Clear" delay={500}>
                    <group
                      data-over-color="neutral"
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
                  data-radius="10"
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

      {results.length > 0 && (
        <group
          data-direction="column"
          data-background="main-background"
          data-radius="25"
          data-elevation="2"
          data-space="10"
          data-max-length="500"
          data-align="start"
        >
          {results.map((result, index) => (
            <Link
              //  autoFocus={true}
              data-contain=""
              data-type="group"
              key={index}
              to={`${result.path}`}
              data-direction="column"
              data-name="autoseparation"
              data-space-horizontal="20"
              data-radius="15"
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

export default SearchFloating;
