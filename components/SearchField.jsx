import React, { useContext } from "react";
import { AppContext } from "../src/AppContext";

export const SearchField = () => {
  const {
    searchTerm,
    handleSearch,
    sendSearchData,
    sendDropdownValue,
    loadBooks,
  } = useContext(AppContext);

  return (
    <div>
      <select
        className="search-dropdown"
        onChange={(event) => sendDropdownValue(event)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="category">Genre</option>
      </select>
      <input
        className="search-field"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={loadBooks}
      />
      <button
        type="submit"
        className="search-btn"
        onClick={(event) => sendSearchData(event)}
      >
        Suchen
      </button>
    </div>
  );
};
