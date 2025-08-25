import SearchComponent from "./searchComponent";

function Search() {
  return (
    <group data-gap="30" data-space="adaptive-30-50" data-direction="column">
      <group
        data-direction="column"
        data-gap="10"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.25"
      >
        <text
          data-wrap="wrap"
          data-font-type="hero"
          data-ellipsis=""
          data-line="1"
          data-text-size="48"
          data-text-clamp="48"
          data-max-length="800"
        >
          Search
        </text>

        <text data-wrap="wrap" data-max-length="360" data-line="1.5" data-text-size="medium-small" data-opacity="70">
          You can search for routes, topics, or tags to quickly find what you
          need. Try typing a keyword or select a suggestion to get started!
        </text>
      </group>



      <SearchComponent />
    </group>
  );
}

export default Search;
