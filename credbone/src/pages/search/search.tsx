
import SearchComponent from "./searchComponent";

function Search() {
  

  return (

      <group data-gap="30" data-space="30" data-direction="column">
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

          <text
        data-wrap="wrap"
        data-length="600"
        data-line="1.5"
         data-light=""
      >
          You can search for routes, topics, or tags to quickly find what you need. Try typing a keyword or select a suggestion to get started!
          </text>
        </group>

<SearchComponent/>

      </group>

  );
}

export default Search;
