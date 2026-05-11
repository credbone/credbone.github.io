import { useSearch } from "./useSearch";

import { IconSearch } from "../../components/icon/credIcons";

import Tooltip from "../../components/tooltip";
import { X } from "lucide-react";
import SearchResults from "./SearchResults";

interface SearchFloatingProps {
  showRandomTagsByDefault?: boolean;
  onClose?: () => void;
}

function SearchFloating({
  showRandomTagsByDefault = true,
  onClose,
}: SearchFloatingProps) {
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
  } = useSearch({ showRandomTagsByDefault, onClose });

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
            data-space-right="10"
          >
            <div className="form_fields">
              <div className="field_cont" data-height="60" data-gap="15">
                <group
                  data-length="30"
                  data-align="center"
                  data-justify="center"
                  data-animation-name="appear-top"
                  data-fill-mode="backwards"
                  data-animation-duration="2.25"
                >
                  <IconSearch size={20} />
                </group>

                <separator data-vertical="" data-height="20"></separator>
                <input
                  data-animation-name="appear-top"
                  data-fill-mode="backwards"
                  data-animation-duration="3.25"
                  autoCapitalize="off"
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  autoFocus={!showRandomTagsByDefault}
                  autoComplete="off"
                  name="floatingsearch"
                />

                {searchQuery && (
                  <Tooltip content="Clear" distance={-5} delay={500}>
                    <group
                      data-over-color="neutral"
                      data-contain=""
                      data-space="10"
                      data-shrink="no"
                      data-interactive=""
                      data-width="auto"
                      data-cursor="pointer"
                      data-radius="10"
                      data-align="center"
                      data-direction="column"
                      onClick={() => clearSearch()}
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration="2"
                    >
                      <icon data-height="auto">
                        <X size={20} />
                      </icon>
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
                  key={index}
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
          <SearchResults
            results={results}
            focusedIndex={focusedIndex}
            resultRefs={resultRefs}
            onResultClick={onClose}
          />
        </group>
      )}
    </>
  );
}

export default SearchFloating;
