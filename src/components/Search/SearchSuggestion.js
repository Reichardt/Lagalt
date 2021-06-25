import React from "react";

function SearchSuggestion({ searchSuggestion }) {
  return (
    <div className="suggestion border-start border-end border-bottom border-secondary">
      {searchSuggestion.title}
    </div>
  );
}

export default SearchSuggestion;
