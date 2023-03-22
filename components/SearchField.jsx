import React, { useContext, useEffect, useRef, useState } from "react";
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

  const [noBooks, setNoBooks] = useState(false);
  useEffect(() => {
    if (rawBooks.length === 0) {
      setTimeout(() => {
        setNoBooks(true);
      }, 2000);
    } else {
      setNoBooks(false);
    }
  }, [rawBooks]);

  console.log(rawBooks.length, noBooks);
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
      {noBooks === true ? (
        <h3>No matching books found! Try another search</h3>
      ) : (
        <></>
      )}
    </form>
  );
};
