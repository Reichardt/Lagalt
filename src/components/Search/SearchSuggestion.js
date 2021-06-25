import React from "react";
import { useHistory } from "react-router-dom";

function SearchSuggestion({ searchSuggestion }) {
  const history = useHistory();

  const handleProjectClick = () => {
    history.push("/project/" + searchSuggestion.id);
  };

  return (
    <div
      onClick={handleProjectClick}
      className="suggestion border-start border-end border-bottom border-secondary"
    >
      {searchSuggestion.title}
    </div>
  );
}

export default SearchSuggestion;
