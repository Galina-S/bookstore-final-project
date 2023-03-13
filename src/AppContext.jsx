import { createContext } from "react";
import { useState, useEffect, useRef } from "react";
import instance from "../components/axios";
import { useNavigate } from "react-router-dom";
import { anonymousUser, blankLoginForm } from "./pages/Interfaces";
import { cloneDeep, toNumber } from "lodash-es";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [rawBooks, setRawBooks] = useState([]);
  //Edit book data
  const [editingElementId, setEditingElementId] = useState(null);
  const [formData, setFormData] = useState([]);
  //Log in
  const [loginForm, setLoginForm] = useState(cloneDeep(blankLoginForm));
  const [currentUser, setCurrentUser] = useState(anonymousUser);
  // const [memberInfo, setMemberInfo] = useState(blankMemberInfo);
  // const [adminInfo, setAdminInfo] = useState(blankAdminInfo);
  //Single book page
  const [openBook, setOpenBook] = useState([]);
  //Search input
  const [searchTerm, setSearchTerm] = useState(" ");
  const [dropdownValue, setDropdownValue] = useState("title");

  const placeholderImage = "../src/assets/keinBild.jpeg";

  const BOOK_DETAILS_URL = "http://localhost:5173/books";

  //dropdownOpen (true/false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  const navigate = useNavigate();

  const loadBooks = async () => {
    setEditingElementId(null);
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

  //Single book page
  const openSingleBook = (book) => {
    setOpenBook(book);
  };

  //Edit book
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

  const handleChangeFormField = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.name === "ISBN") {
      value = value.match(/\d+/g).join([]);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const sendEditBook = async (e) => {
    e.preventDefault();
    //let _category = formData.category.split(",").trim();
    console.log(formData.category);
    try {
      const res = await instance.put(`/books/${editingElementId}`, {
        ...formData,
        //category: _category,
      });
      if ((res.status = 200)) {
        await loadBooks();
      }
    } catch (e) {
      console.error(`ERROR: ${e}`);
    }
    navigate(`/books/`);
    setEditingElementId(null);
  };

  //Create a new book
  const handleAddBookForm = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.name === "ISBN") {
      value = value.match(/\d+/g).join([]);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const sendNewBook = async (e) => {
    e.preventDefault();
    let _category = formData.category.split(",");

    try {
      const res = await instance.post(`/books/`, {
        ...formData,
        category: _category,
      });
      if ((res.status = 200)) {
        await loadBooks();
      }
    } catch (e) {
      console.error(`ERROR: ${e}`);
    }
    setFormData([]);
    navigate("/books");
  };

  //Clean form data
  const cleanFormData = () => {
    setFormData([]);
  };

  //Search input field
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  const sendSearchData = (event) => {
    navigate(`/books/`);
    setRawBooks(
      rawBooks.filter((book) => {
        if (Array.isArray(book[dropdownValue])) {
          return book[dropdownValue]
            .map((ele) => ele.toLowerCase())
            .includes(`${searchTerm.toLowerCase()}`);
        } else if (typeof book[dropdownValue] == "string") {
          return book[dropdownValue]
            .toLowerCase()
            .includes(`${searchTerm.toLowerCase()}`);
        } else {
          return book[dropdownValue] == searchTerm;
        }
      })
    );
    setSearchTerm("");
  };

  const sendDropdownValue = (e) => {
    setDropdownValue(e.target.value);
  };

  //Log in form
  const changeLoginFormField = (fieldIdCode, value) => {
    loginForm.fields[fieldIdCode] = value;
    setLoginForm({ ...loginForm });
  };

  const submitLoginForm = async (onBadLogin) => {
    try {
      const response = await axios.post(
        `${backendUrl}/login`,
        {
          username: loginForm.fields.username,
          password: loginForm.fields.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const user = response.data;

      setCurrentUser({ ...user });
      setLoginForm({ ...blankLoginForm });

      setDropdownOpen(!dropdownOpen);
      navigate("/books");
    } catch (e) {
      console.log(`GENERAL ERROR: ${e.message}`);
      if (e.message === "Request failed with status code 401") {
        loginForm.message = "Bad login, try again.";
        setLoginForm(cloneDeep(loginForm));
        onBadLogin();
      }
    }
  };

  const logUserOut = () => {
    setCurrentUser({ ...anonymousUser });
    (async () => {
      try {
        await axios.get(`${backendUrl}/logout`, {
          withCredentials: true,
        });
        getCurrentUser();
      } catch (e) {
        console.log("GENERAL ERROR");
      }
    })();
  };

  const clearLoginForm = () => {
    setLoginForm(cloneDeep(blankLoginForm));
  };

  const getCurrentUser = () => {
    (async () => {
      try {
        const user = (
          await axios.get(`${backendUrl}/get-current-user`, {
            withCredentials: true,
          })
        ).data;
        setCurrentUser({ ...user });
      } catch (e) {
        console.log("GENERAL ERROR");
      }
    })();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const user = (
          await axios.get(`${backendUrl}/get-current-user`, {
            withCredentials: true,
          })
        ).data;
        setCurrentUser({ ...user });
      } catch (e) {
        console.log("General error");
      }
    })();
  }, []);

  //Tracking The Window Size
  const getWindowSize = () => {
    const innerWidth = window.innerWidth;
    return innerWidth;
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //console.log(windowSize);

  return (
    <AppContext.Provider
      value={{
        rawBooks,
        handleDeleteBook,
        handleEditBook,
        onOpenEditForm,
        setEditingElementId,
        editingElementId,
        loadBooks,
        formData,
        setFormData,
        handleChangeFormField,
        sendEditBook,
        cleanFormData,
        setDropdownOpen,
        dropdownOpen,
        dropdownRef,
        loginForm,
        changeLoginFormField,
        submitLoginForm,
        clearLoginForm,
        currentUser,
        logUserOut,
        windowSize,
        setCurrentUser,
        navigate,
        handleAddBookForm,
        sendNewBook,
        openSingleBook,
        openBook,
        placeholderImage,
        handleSearch,
        searchTerm,
        setSearchTerm,
        sendSearchData,
        sendDropdownValue,

        BOOK_DETAILS_URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
