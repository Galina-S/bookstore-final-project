import { createContext } from "react";
import { useState, useEffect } from "react";
import instance from "../components/axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [rawBooks, setRawBooks] = useState([]);
  const [editingElementId, setEditingElementId] = useState(null);
  const [formData, setFormData] = useState([]);

  const loadBooks = async () => {
    const books = (await instance.get("/books")).data;
    const _books = [];
    books.forEach((rawBook) => {
      const _book = {
        ...rawBook,
      };
      _books.push(_book);
    });
    setRawBooks(_books);
  };

  const handleDeleteBook = async (_book) => {
    try {
      const res = await instance.delete(`/books/${_book._id}`);
      if ((res.status = 200)) {
        await loadBooks();
        console.log(_book._id);
      }
    } catch (e) {
      console.error(`ERROR: ${e}`);
    }
  };

  const handleEditBook = (id, _book) => {
    setRawBooks(
      rawBooks.map((book) => (book._id === id ? { ...book, _book } : book))
    );
    setEditingElementId(null);
  };

  const onOpenEditForm = (book) => {
    setEditingElementId(book._id);
    setFormData(book);
  };

  const handleChangeFormField = (e, key) => {
    e.preventDefault();
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const sendEditBook = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.put(`/books/${editingElementId}`, formData);
      if ((res.status = 200)) {
        await loadBooks();
      }
    } catch (e) {
      console.error(`ERROR: ${e}`);
    }
    setEditingElementId(null);
  };



  //Tracking The Window Size
 const getWindowSize = () =>{
  const innerWidth = window.innerWidth;
  return innerWidth
 }


 const [windowSize, setWindowSize] = useState(getWindowSize());

 useEffect(()=> {
  const handleWindowResize = () => {
    setWindowSize(getWindowSize())
  }

  window.addEventListener('resize',handleWindowResize);

  return () => {
    window.removeEventListener('resize', handleWindowResize)
  }
 }, [])

//console.log(windowSize);


  

  return (
    <AppContext.Provider
      value={{
        rawBooks,
        handleDeleteBook,
        handleEditBook,
        onOpenEditForm,
        editingElementId,
        loadBooks,
        setFormData,
        handleChangeFormField,
        sendEditBook,
        windowSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
    