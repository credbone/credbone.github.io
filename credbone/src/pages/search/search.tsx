import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteData, routesData } from "./routesData";
import Ripple from "../../components/Ripple";
import { IconSearch } from "../../components/icon/credIcons";
import { Link } from "react-router-dom";
import Tooltip from "../../components/tooltip";

function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<RouteData[]>([]);
  const [randomTags, setRandomTags] = useState<string[]>([]);

  useEffect(() => {
    showRandomTags();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase(); // Convert the query to lowercase
    setSearchQuery(query);

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
    ]; // Define common stop words

    if (query.length > 1 && query.length <= 100) {
      const searchTerms = query
        .split(/\s+/)
        .filter((term) => term.trim() !== "" && !stopWords.includes(term));
      // console.log("Parsed Data:", searchTerms); // Log the parsed data

      if (searchTerms.length > 0) {
        const filteredResults = routesData.filter((route) => {
          const matches = searchTerms.some((term) =>
            route.tags.some((tag) => tag.toLowerCase().includes(term))
          );
          // console.log(`Route: ${route.title}, Matches: ${matches}`);
          return matches;
        });
        // console.log("Filtered Results:", filteredResults);
        setResults(filteredResults);
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
    showRandomTags(); // Show new random tags after clearing the search
  };

  const showRandomTags = () => {
    const allTags = routesData.flatMap((route) => route.tags);
    const uniqueTags = Array.from(new Set(allTags));
    const randomTags = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * uniqueTags.length);
      randomTags.push(uniqueTags[randomIndex].toLowerCase());
      uniqueTags.splice(randomIndex, 1); // Remove the selected tag to avoid duplicates
    }
    setRandomTags(randomTags);
  };

  const searchByTag = (tag: string) => {
    setSearchQuery(tag);
    handleSearch({ target: { value: tag } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <view data-space="30" data-scroll="" data-border="no">
      <group data-gap="30" data-direction="column">
        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.25"
        >
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-opacity="20"
          >
            Search
          </text>
        </group>

        <group data-sticky="top" data-width="auto" data-gap="20">
          <group
            data-length="600"
            data-radius="10"
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
                          <icon data-height="auto">close</icon>
                        </group>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </label>
            </Ripple>
          </group>

          {!searchQuery && (
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
                    data-radius="30"
                    data-align="center"
                    data-direction="column"
                    data-background="highlight"
                    data-animation-name="appear-bottom"
                    data-fill-mode="backwards"
                    data-animation-duration={(2 + index * 0.25)}
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

        <group data-direction="column" data-gap="10" data-align="start">
          {results.map((result, index) => (
            <Link
              data-contain=""
              data-type="group"
              //  data-border="outline"
              key={index}
              to={`../Home/${result.path}`}
              data-space="15"
              data-max-length="600"
              data-direction="column"
              data-gap="5"
              data-radius="10"
              data-interactive=""


              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration={(2 + index * 0.25)}

            >
              <text data-weight="700" data-color="main" data-text-size="medium">
                {result.title}
              </text>
              <text
                data-opacity="50"
                data-line="1.2"
                data-wrap="wrap"
                data-ellipsis=""
              >
                {result.description}
              </text>
            </Link>
          ))}
        </group>
      </group>
    </view>
  );
}

export default Search;
