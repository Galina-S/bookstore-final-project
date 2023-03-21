import { useContext } from "react";
import { AppContext } from "../AppContext";
import { EditBook } from "../../src/pages/EditBook";
import { useEffect, useRef, useState } from "react";
import { Book } from "../pages/Book";

export const PageBooks2 = () => {
  const {
    rawBooks,
    editingElementId,
    loadBooks,
    cleanFormData,
    setEditingElementId,
    searchTerm,
    filteredBooks,
    currentUserIsAdmin,
    currentUser,
    currentUserIsInAccessGroup,
    loadAccessGroupData,
  } = useContext(AppContext);

  // useEffect(() => {
  //   if (searchTerm !== " ") {
  //     (async () => {
  //       loadBooks();
  //     })();
  //   }
  // }, []);

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
        loadBooks();
        //cleanFormData();
        //setEditingElementId(null);
      }
    };
  }, []);

  return (
    <div className="pageBooks2">
      <ul>
        {filteredBooks.length > 0
          ? filteredBooks.map((_book) => {
              return (
                <li className="book" key={_book._id}>
                  <Book book={_book} />
                </li>
              );
            })
          : rawBooks.map((_book) => {
              return (
                <li className="book" key={_book._id}>
                  {_book._id === editingElementId ? (
                    <EditBook book={_book} />
                  ) : (
                    <Book book={_book} />
                  )}
                </li>
              );
            })}
      </ul>
    </div>
  );
};
