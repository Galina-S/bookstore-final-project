//import _books from '../data/books.json';
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { EditBook } from "../../components/EditBook";
import { useEffect, useRef } from "react";
import { DisplayBook } from "../../components/DisplayBook";

//const books = _books;

export const PageBooks = () => {
  const {
    rawBooks,
    editingElementId,
    loadBooks,
    cleanFormData,
    setEditingElementId,
    searchTerm,
  } = useContext(AppContext);
  console.log(searchTerm);
  useEffect(() => {
    if (searchTerm !== "") {
      (async () => {
        loadBooks();
      })();
    }
  }, []);

  const componentWillUnmount = useRef(false);

  // This is componentWillUnmount
  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      // This line only evaluates to true after the componentWillUnmount happens
      if (componentWillUnmount.current) {
        cleanFormData();
        setEditingElementId(null);
      }
    };
  }, []);

  return (
    <div className="pageBooks">
      <div className="books">
        <h2>There are {rawBooks.length} books</h2>
        {rawBooks.map((_book) => {
          return (
            <div key={_book._id}>
              {_book._id === editingElementId ? (
                <EditBook book={_book} />
              ) : (
                <DisplayBook book={_book} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
