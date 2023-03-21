import React, { useContext, useRef } from "react";
import { AppContext } from "../src/AppContext";
import { TfiSearch } from "react-icons/tfi";

export const SearchField = () => {
  const {
    searchTerm,
    handleSearch,
    sendSearchData,
    sendDropdownValue,
    loadBooks,
    searchRef,
    rawBooks,
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
        <TfiSearch />
      </button>
      {rawBooks.length < 1 ? (
        <h3>No matching books found! Try another search term.</h3>
      ) : (
        <></>
      )}
    </form>
  );
};
