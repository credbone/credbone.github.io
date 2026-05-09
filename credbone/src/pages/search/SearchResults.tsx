import React from "react";
import { Link } from "react-router-dom";
import { CornerDownLeft } from "lucide-react";
import { RouteData } from "./routesData";

type DataAttributes = Record<`data-${string}`, string | number | undefined>;

interface SearchResultsProps {
  results: RouteData[];
  focusedIndex: number;
  resultRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
  linkData?: DataAttributes;
  onResultClick?: () => void;
}

function SearchResults({ results, focusedIndex, resultRefs, linkData, onResultClick }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <>
      {results.map((result, index) => (
        <Link
          data-contain=""
          data-type="group"
          key={index}
          to={result.path}
          data-direction="column"
          data-name="autoseparation"
          data-space-horizontal="20"
          data-radius="15"
          data-interactive=""
          data-animation-name="appear-top"
          data-fill-mode="backwards"
          data-animation-duration={2 + index * 0.25}
          tabIndex={index}
          ref={(el: HTMLAnchorElement | null) => (resultRefs.current[index] = el)}
          onClick={() => onResultClick?.()}
          data-background={focusedIndex === index ? "adaptive-gray" : undefined}
          data-selected={focusedIndex === index ? "true" : undefined}
         {...linkData}
        >
          <separator data-horizontal="dotted"></separator>
          <group data-wrap="no" data-align="center">
            <group data-space-vertical="20" data-direction="column" data-gap="5">
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
                data-opacity={focusedIndex === index ? "80" : "50"}
                data-wrap="balance"
                data-ellipsis=""
                data-length="300"
              >
                {result.description}
              </text>
            </group>
            <group data-space="15" data-width="auto" data-opacity={focusedIndex === index ? "60" : "0"}>
              <CornerDownLeft strokeWidth={1} />
            </group>
          </group>
        </Link>
      ))}
    </>
  );
}

export default SearchResults;
