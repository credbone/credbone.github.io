import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { RouteData, routesData } from "./routesData";
import Ripple from "../../components/Ripple";
import { IconSearch } from "../../components/icon/credIcons";
import { Link, useSearchParams } from "react-router-dom";
import Tooltip from "../../components/tooltip";
import { X } from "lucide-react";

interface SearchComponentProps {
  showRandomTagsByDefault?: boolean;
}

function SearchComponent({ showRandomTagsByDefault = true }: SearchComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<RouteData[]>([]);
  const [randomTags, setRandomTags] = useState<string[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUrlQueryRef = useRef<string>(""); // Track last URL update to avoid duplicate history

  // Initialize search from URL parameter on mount
  useEffect(() => {
    const queryFromUrl = searchParams.get("q");
    if (queryFromUrl) {
      const MAX_URL_LENGTH = 50;
      const MIN_SEARCH_LENGTH = 2;
      const trimmedQuery = queryFromUrl.slice(0, MAX_URL_LENGTH);
      
      setSearchQuery(trimmedQuery);
      
      // Only perform search if query is long enough
      if (trimmedQuery.length >= MIN_SEARCH_LENGTH) {
        performSearch(trimmedQuery);
        lastUrlQueryRef.current = trimmedQuery; // Track initial URL query
      } else if (showRandomTagsByDefault) {
        showRandomTags();
      }
      
      // Update URL if it was truncated or too short
      if (trimmedQuery !== queryFromUrl || trimmedQuery.length < MIN_SEARCH_LENGTH) {
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
  }, []); // Run only on mount

  // Debounced URL update
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const MAX_URL_LENGTH = 50;
      const MIN_URL_LENGTH = 2;
      
      // Determine what the URL query should be
      let targetUrlQuery = "";
      if (searchQuery.length >= MIN_URL_LENGTH && searchQuery.length <= MAX_URL_LENGTH) {
        targetUrlQuery = searchQuery;
      }
      
      // Only update URL if it's different from last update
      if (targetUrlQuery !== lastUrlQueryRef.current) {
        if (targetUrlQuery) {
          setSearchParams({ q: targetUrlQuery }, { replace: true }); // Use replace to avoid history spam
        } else {
          setSearchParams({}, { replace: true });
        }
        lastUrlQueryRef.current = targetUrlQuery;
      }
    }, 500); // 500ms debounce

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
        const filteredResults = routesData.filter((route) => {
          const matches = searchTerms.some((term) =>
            route.tags.some((tag) => tag.toLowerCase().includes(term))
          );
          return matches;
        });
        setResults(filteredResults);
        
        // Generate random tags only once when first getting no results
        if (filteredResults.length === 0 && showRandomTagsByDefault && randomTags.length === 0) {
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
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setSearchParams({}, { replace: true });
    lastUrlQueryRef.current = "";
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
    performSearch(tag);
  };

  return (
    <>
      <group data-sticky="top" data-top="adaptive-30-50" data-width="auto" data-gap="20">
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
                  />

                  {searchQuery && (
                    <Tooltip content="Clear">
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
                        <icon data-height="auto">{<X size={20}/>}</icon>
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

<group data-gap="5">
            <group
            data-animation-name="appear-bottom"
            data-fill-mode="backwards"
            data-animation-duration="2.25"
          >
            <text  data-text-size="medium" data-font-type="hero" data-wrap="preline" data-ellipsis="" data-line="1" >No results found.</text>
          </group>

          <group
            data-animation-name="appear-bottom"
            data-fill-mode="backwards"
            data-animation-duration="2"
          >
            <text data-opacity="60" data-wrap="wrap" data-length="300" data-line="1.2">Try one of the suggested tags below or adjust your keywords.</text>
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
              autoFocus={true}
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
            >
              <separator data-horizontal="dotted"></separator>
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
                  data-ellipsis=""
                  data-font-type="hero"
                  data-line="1"
                >
                  {result.title}
                </text>
                <text
                  data-opacity="50"
                  data-line="1.2"
                  data-wrap="balance"
                  data-ellipsis=""
                  data-length="300"
                >
                  {result.description}
                </text>
              </group>
            </Link>
          ))}
        </group>
      )}
    </>
  );
}

export default SearchComponent;