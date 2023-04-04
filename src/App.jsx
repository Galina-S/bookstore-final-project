import "./App.scss";
//import './App.css';

import { NavbarPage } from "./pages/NavbarPage";
import { useContext } from "react";
import { AppContext } from "./AppContext";

import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { PageBooks } from "./pages/PageBooks";
import { PageBooks2 } from "./pages/PageBooks2";
import { PageHome } from "./pages/PageHome";
import { PageLogout } from "./pages//PageLogout";
import { NewBooksPage } from "./pages//NewBooksPage";
import { Bestsellers } from "./pages/BestsellersPage";
import { WishListPage } from "./pages/WishListPage";
import { PageSingleBook } from "./pages/PageSingleBook";
import { CreateBookPage } from "./pages/CreateBookPage";
import { PageRegister } from "./pages/PageRegister";
import { PageLogin } from "./pages/PageLogin";
import { PageNovels } from "./pages/PageNovels";
import { EditBook } from "./pages/EditBook";
import { Cart } from "./pages/Cart";
import { PageSingleAuthor } from "./pages/PageSingleAuthor";
import { PageVersand } from "./pages/PageVersand";
import { Impressum } from "../components/Impressum"
import { Unternehmen } from "../components/unternehmen"
import { Question } from "../components/Question";

//const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const { currentUser } = useContext(AppContext);

  return (
    <div className="App">
      <NavbarPage />

      <Routes>
        <Route path="/books" element={<PageBooks2 />} />
        <Route path="/books2" element={<PageBooks />} />
        <Route path="/home/*" element={<PageHome />} />

        <Route path="novels" element={<PageNovels />} />

        <Route path="/" element={<Navigate to="/home/*" />} />
        <Route path="/new-books" element={<NewBooksPage />} />
        <Route path="/bestsellers" element={<Bestsellers />} />
        <Route path="/shop/hilfe-versand" element={<PageVersand />} />
        <Route path="/users/:userId/favorites" element={<WishListPage />} />
        <Route path="/users/:userId/cart" element={<Cart />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/logout" element={<PageLogout />} />
        <Route path="/books/:id" element={<PageSingleBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/impressum" element = {<Impressum/>} />
        <Route path="/unternehmen" element = {<Unternehmen/>} />
        <Route path="/questions" element = {<Question/>} />



        <Route path="/authors/:authorID" element={<PageSingleAuthor />} />
      </Routes>
    </div>
  );
}

export default App;
