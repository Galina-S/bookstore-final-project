import { useContext, useRef } from "react";
import { AppContext } from "../AppContext";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { PageBooks } from "../pages/PageBooks";
import { PageHome } from "../pages/PageHome";
import { PageRegister } from "../pages/PageRegister";
import { PageLogin } from "../pages/PageLogin";
import { PageLogout } from "./PageLogout";
import { NewBooksPage } from "./NewBooksPage";

import { Bestsellers } from "./BestsellersPage";
import { WishListPage } from "./WishListPage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { CreateBookPage } from "./CreateBookPage";
import { PageSingleBook } from "./PageSingleBook";
import { SearchField } from "../../components/SearchField";

export const NavbarPage = () => {
  const {
    currentUser,
    windowSize,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    cleanFormData,
  } = useContext(AppContext);

  return (
    <div>
      <nav className="header-content">
        <div className="logo">
          <NavLink to="/home">LOGO</NavLink>
        </div>

        <div className="header-customer">
          <div className="dropdown" ref={dropdownRef}>
            <div
              className="dropdown-trigger"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <FontAwesomeIcon className="account_icon" icon={faUser} />
              {currentUser.username !== "anonymousUser" ? (
                <span className={`${windowSize < 600 ? "none" : null}`}>
                  {currentUser.username}
                </span>
              ) : (
                <span className={`${windowSize < 600 ? "none" : null}`}>
                  Mein Konto
                </span>
              )}
            </div>

            <div className={`auth  ${dropdownOpen ? "active" : "inactiv"}`}>
              {currentUser.username === "anonymousUser" ? (
                <PageLogin />
              ) : (
                <NavLink
                  to="/logout"
                  className="logout-btn"
                  onClick={() => (className = "inactiv")}
                >
                  {" "}
                  Logout{" "}
                </NavLink>
              )}
            </div>
          </div>

          <NavLink
            to="/create-book"
            className="wish-list"
            onClick={cleanFormData}
          >
            <FontAwesomeIcon
              className="wish-list-icon"
              icon={faFileCirclePlus}
            />
            <span className={windowSize < 600 ? "none" : null}>Neues Buch</span>
          </NavLink>

          <NavLink to="/wish-list" className="wish-list">
            <FontAwesomeIcon className="wish-list-icon" icon={faHeart} />
            <span className={windowSize < 600 ? "none" : null}>Merkzettel</span>
          </NavLink>
          <div to="/home" className="shopping-cart">
            <FontAwesomeIcon
              className="shopping-cart-icon"
              icon={faCartShopping}
            />
            <span className={windowSize < 600 ? "none" : null}>Warenkorb</span>
          </div>
        </div>
      </nav>

      <nav className="navbar">
        <div className="navigation">
          <NavLink to="/books">Bücher</NavLink>
          <NavLink to="/new-books">Neuheiten</NavLink>
          <NavLink to="/bestsellers">Bestseller</NavLink>
          {/*currentUser.username==="anonymousUser" ? 
          (  null
          )
          :( <NavLink to="/logout">Logout </NavLink>)*/}
          <div className="search">
            <SearchField />
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/books" element={<PageBooks />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/new-books" element={<NewBooksPage />} />
        <Route path="/bestsellers" element={<Bestsellers />} />
        <Route path="/wish-list" element={<WishListPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="logout" element={<PageLogout />} />
        <Route path="/book/:id" element={<PageSingleBook />} />
      </Routes>
    </div>
  );
};
