import React, { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useSearch } from "./useSearch";
import Ripple from "../../components/Ripple";
import { IconSearch } from "../../components/icon/credIcons";
import { Link, useSearchParams } from "react-router-dom";
import Tooltip from "../../components/tooltip";
import { X } from "lucide-react";
import SearchResults from "./SearchResults";

const MAX_URL_LENGTH = 50;
const MIN_URL_LENGTH = 2;
const URL_DEBOUNCE_MS = 500;

interface SearchComponentProps {
  showRandomTagsByDefault?: boolean;
}

function SearchComponent({ showRandomTagsByDefault = true }: SearchComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = (() => {
    const q = searchParams.get("q") ?? "";
    return q.slice(0, MAX_URL_LENGTH);
  })();

  const {
    searchQuery,
    results,
    randomTags,
    focusedIndex,
    resultRefs,
    handleSearchChange,
    handleKeyDown,
    searchByTag,
    clearSearch,
  } = useSearch({ showRandomTagsByDefault, initialQuery });

  const inputRef = useRef<HTMLInputElement>(null);

  // "/" shortcut to focus input
  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync searchQuery → URL (debounced)
  const lastSyncedQuery = useRef(initialQuery);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const isValid = searchQuery.length >= MIN_URL_LENGTH && searchQuery.length <= MAX_URL_LENGTH;
      const target = isValid ? searchQuery : "";

      if (target !== lastSyncedQuery.current) {
        target
          ? setSearchParams({ q: target }, { replace: true })
          : setSearchParams({}, { replace: true });
        lastSyncedQuery.current = target;
      }
    }, URL_DEBOUNCE_MS);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  const handleClear = () => {
    clearSearch(() => {
      setSearchParams({}, { replace: true });
      lastSyncedQuery.current = "";
    });
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
                  <group data-length="30" data-align="center" data-justify="center">
                    <IconSearch size={20} />
                  </group>

                  <separator data-vertical="" data-height="20"></separator>
                  <input
                    autoCapitalize="off"
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    autoFocus={!showRandomTagsByDefault && !isMobile}
                    autoComplete="off"
                    name="searchinput"
                    ref={inputRef}
                  />


                  {searchQuery && (
                    <Tooltip content="Clear" delay={300}>
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
                        onClick={handleClear}
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="2"
                      >
                        <icon data-height="auto"><X size={20} /></icon>
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
            <group data-animation-name="appear-bottom" data-fill-mode="backwards" data-animation-duration="2">
              <text data-opacity="60">Try searching for...</text>
            </group>
            <group data-gap="5">
              {randomTags.map((tag, index) => (
                <group
                  key={index}
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
                  onClick={() => searchByTag(tag)}
                >
                  <text data-text-transform="capitalize" data-ellipsis="" data-weight="600">
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
          <group data-gap="15" data-radius="20" data-wrap="no" data-align="center">
            <group
              data-direction="column"
              data-gap="5"
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration="2.75"
            >
              <group>
                <text data-text-size="medium" data-font-type="hero" data-wrap="preline" data-ellipsis="" data-line="1">
                  No results found
                </text>
              </group>
              <group>
                <text data-opacity="50" data-wrap="wrap" data-max-length="260" data-line="1.2">
                  Try one of the suggested tags below or adjust your keywords.
                </text>
              </group>
            </group>
          </group>

          <group data-gap="5">
            {randomTags.map((tag, index) => (
              <group
                key={index}
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
                onClick={() => searchByTag(tag)}
              >
                <text data-text-transform="capitalize" data-ellipsis="" data-weight="600">
                  {tag}
                </text>
              </group>
            ))}
          </group>
        </group>
      )}

      {results.length > 0 && (
        <group data-direction="column" data-max-length="600" data-align="start">
          <SearchResults results={results} focusedIndex={focusedIndex} resultRefs={resultRefs} linkData={{ "data-radius": "20" }} />
        </group>
      )}
    </>
  );
}

export default SearchComponent;