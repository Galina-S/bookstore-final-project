import { useContext } from "react";
import { AppContext } from "../AppContext";
import { EditBook } from "../../components/EditBook";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import {Book} from '../pages/Book';

export const PageBooks2 = () => {

  const {
    rawBooks,
    editingElementId,
    loadBooks,
    cleanFormData,
    setEditingElementId,
  } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      loadBooks();
    })();
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
   
  return <div className="pageBooks2">
    < h2>There are {rawBooks.length} books</h2>
      <ul>
        {rawBooks &&
            rawBooks.map((_book, _id)=>(
              
            <li className= "book" key={_book._id}>
            {/* <Book book={book} />  */}
            {_book._id === editingElementId ? (
                <EditBook book={_book} />
              ) : (
                <Book book={_book} />
                  )}
            </li>
            
        )) }
      </ul>
    </div>
  
};


