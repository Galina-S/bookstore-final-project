import React, { useContext } from "react";
import { AppContext } from "../src/AppContext";

export const SearchField = () => {
  const { searchTerm, handleSearch, sendSearchData, sendDropdownValue } =
    useContext(AppContext);

  return (
    <div>
      <select
        className="search-dropdown"
        onChange={(e) => sendDropdownValue(e)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
      </select>
      <input
        className="search-field"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
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
