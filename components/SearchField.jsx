import React, { useContext, useRef } from "react";
import { AppContext } from "../src/AppContext";

export const SearchField = () => {
  const {
    searchTerm,
    handleSearch,
    sendSearchData,
    sendDropdownValue,
    loadBooks,
    searchRef,
  } = useContext(AppContext);

  return (
    <form onSubmit={(event) => sendSearchData(event)}>
      <select
        className="search-dropdown"
        onChange={(event) => sendDropdownValue(event)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="category">Genre</option>
        <option value="ISBN">ISBN</option>
      </select>
      <input
        className="search-field"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={loadBooks}
        ref={searchRef}
      />
      <button
        type="submit"
        onClick={(e) => e.target.blur()}
        className="search-btn"
      >
        Suchen
      </button>
    </form>
  );
};
