import { createContext } from "react";
import { useState, useEffect, useRef } from "react";
import instance, { baseURL } from "../components/axios";
import { useNavigate } from "react-router-dom";
import {
  anonymousUser,
  blankLoginForm,
  blankMemberInfo,
  blankAdminInfo,
} from "./pages/Interfaces";
import { cloneDeep, toNumber } from "lodash-es";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [rawBooks, setRawBooks] = useState([]);
  //Edit book data
  const [editingElementId, setEditingElementId] = useState(null);
  const [formData, setFormData] = useState([]);
  //Log in
  const [loginForm, setLoginForm] = useState(cloneDeep(blankLoginForm));
  const [currentUser, setCurrentUser] = useState(anonymousUser);
  const [memberInfo, setMemberInfo] = useState(blankMemberInfo);
  const [adminInfo, setAdminInfo] = useState(blankAdminInfo);
  //Single book page
  const [openBook, setOpenBook] = useState([]);
  //Search input
  const [searchTerm, setSearchTerm] = useState(" ");
  const [dropdownValue, setDropdownValue] = useState("title");
  //Shopping cart
  const [cart, setCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const placeholderImage = "../src/assets/keinBild.jpeg";
  const BOOK_DETAILS_URL = "http://localhost:5173/books";
  //FilteredBooks by Category
  const [filteredBooks, setFilteredBooks] = useState([]);
  //dropdownOpen (true/false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  let dropdownRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
  const getCurrentUser = () => {
    (async () => {
      try {
        const user = (
          await axios.get(`${baseURL}/get-current-user`, {
            withCredentials: true,
          })
        ).data;
        //console.log(data);
        setCurrentUser({ ...user });
      } catch (e) {
        console.log("GENERAL ERROR");
      }
    })();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  //   useEffect(() => {
  //     async function fetchCurrentUser() {
  //       try {
  //         const response = await axios.get(`${baseURL}/users/me`, { withCredentials: true });
  //         setCurrentUser(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  // // Fetch current user when the component mounts
  // fetchCurrentUser();
  // }, []);

  //Favourites
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await axios.get(
          `${baseURL}/users/${currentUser?._id}/favorites`
        );
        setFavorites(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    // Fetch favorites when the component mounts
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  // this loads data when a currentUser has been defined
  // on page reload, currentUser is anonymous for short time
  // then any user that is logged in is loaded into currentUser
  // useEffect(() => {
  //  loadAccessGroupData();
  // }, [currentUser]);
  useEffect(() => {
    loadBooks();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const user = (
          await axios.get(`${baseURL}/get-current-user`, {
            withCredentials: true,
          })
        ).data;
        setCurrentUser({ ...user });
      } catch (e) {
        console.log("General error");
      }
    })();
  }, []);
  const handleDeleteBook = async (_book) => {
    try {
      const res = await instance.delete(`/books/${_book._id}`);
      if ((res.status = 200)) {
        await loadBooks();
        //console.log(_book._id);
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

  //Create a new comment
  const handleAddCommentForm = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
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
    //setRawBooks();
  };
  const searchRef = useRef(null);
  const sendSearchData = (event) => {
    event.preventDefault();
    searchRef.current.blur();
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
    setSearchTerm(" ");
  };
  const sendDropdownValue = (e) => {
    setDropdownValue(e.target.value);
  };
  //Reset books page
  const resetBooksPage = () => {
    setFilteredBooks([]);
    loadBooks();
  };
  //Shopping cart
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          `${baseURL}/users/${currentUser?._id}/cart`
        );
        setCart(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    // Fetch favorites when the component mounts
    if (currentUser) {
      fetchCart();
    }
  }, [currentUser]);

  const increaseQty = (book) => {
    setCart(
      cart.filter((ele) =>
        ele._id === book._id ? ele.quantity++ : ele.quantity
      )
    );
  };
  const decreaseQty = (book) => {
    setCart(
      cart.filter((ele) => {
        if (ele._id === book._id) {
          if (ele.quantity > 1) {
            return ele.quantity--;
          } else {
            return ele._id !== book._id;
          }
        } else {
          return ele.quantity;
        }
      })
    );
  };
  const removeFromCart = async (bookId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/users/${currentUser._id}/cart/${bookId}`,
        { withCredentials: true }
      );
      console.log(response.data.message);

      // Update the state of favorites to re-render the UI
      setCart(cart.filter((id) => id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (book) => {
    try {
      const response = await axios.post(
        `${baseURL}/users/${currentUser._id}/cart/${book._id}`,
        { withCredentials: true }
      );
      console.log(response.data.message);

      // Update the state of favorites to re-render the UI
      setCart([...cart, { ...book, quantity: 1 }]);
    } catch (error) {
      console.error(error);
    }
  };
  //const removeFromCart = (book) => {
  //  setCart(cart.filter((ele) => ele._id !== book._id));
  //};
  //const addToCart = (book) => {
  //  setCart([...cart, { ...book, quantity: 1 }]);
  //};

  //Log in form
  const changeLoginFormField = (fieldIdCode, value) => {
    loginForm.fields[fieldIdCode] = value;
    setLoginForm({ ...loginForm });
  };
  const submitLoginForm = async (onBadLogin) => {
    try {
      const response = await axios.post(
        `${baseURL}/login`,
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
      //console.log(response.data);
      const user = response.data;

      const userId = response.data._id;
      // console.log(userId)

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
  const loadAccessGroupData = () => {
    if (currentUserIsInAccessGroup("members")) {
      (async () => {
        const memberInfo = (
          await axios.get(`${baseURL}/get-member-info`, {
            withCredentials: true,
          })
        ).data;
        setMemberInfo(cloneDeep(memberInfo));
      })();
    }
    if (currentUserIsInAccessGroup("admins")) {
      (async () => {
        const adminInfo = (
          await axios.get(`${baseURL}/get-admin-info`, {
            withCredentials: true,
          })
        ).data;
        setAdminInfo(cloneDeep(adminInfo));
      })();
    }
  };
  const logUserOut = () => {
    setCurrentUser({ ...anonymousUser });
    (async () => {
      try {
        await axios.get(`${baseURL}/logout`, {
          withCredentials: true,
        });
        getCurrentUser();
      } catch (e) {
        console.log("GENERAL ERROR");
      }
    })();
  };
  const currentUserIsInAccessGroup = (accessGroup) => {
    return currentUser.accessGroups.includes(accessGroup);
  };
  const clearLoginForm = () => {
    setLoginForm(cloneDeep(blankLoginForm));
  };
  const currentUserIsAdmin = () => {
    return currentUserIsInAccessGroup("admins");
  };
  const getNoAccessMessage = () => {
    if (currentUserIsInAccessGroup("loggedOutUsers")) {
      return "Your session has ended, please log in again.";
    } else {
      return "You do not have access to this page.";
    }
  };
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

  //Carousel go to First Slide
  const carouselRef = useRef(null);
  const goToFirstSlide = () => {
    carouselRef.current?.goToSlide(0);
  };

  //go to book

  const handleClick = (id) => {
    window.location.href = `/books/${id}`;
  };
  return (
    <AppContext.Provider
      value={{
        handleClick,
        carouselRef,
        goToFirstSlide,
        rawBooks,
        setRawBooks,
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
        filteredBooks,
        setFilteredBooks,
        resetBooksPage,
        searchRef,
        currentUserIsAdmin,
        memberInfo,
        getNoAccessMessage,
        adminInfo,
        currentUserIsInAccessGroup,
        loadAccessGroupData,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cart,
        isInCart,
        setIsInCart,
        favorites,
        setFavorites,
        modalIsOpen,
        setModalIsOpen,
        handleAddCommentForm,
        showCommentForm,
        setShowCommentForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
