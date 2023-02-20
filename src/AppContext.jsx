import { createContext } from "react";
import { useState } from "react";
import instance from "./pages/axios";
import axios from "axios";

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
        /**                editItem: {
                    title: rawBook.title,
                    author: rawBook.author,
                    img: rawBook.img,
                    price: rawBook.price,
                    isbn: rawBook.ISBN,
                    category: rawBook.category,
                    publication: rawBook.publication,
                    age: rawBook.age,
                    pages: rawBook.pages,
                }     
*/
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
    