import { useContext } from "react";
import { AppContext } from "../AppContext";
import { PageRegister } from "../pages/PageRegister";
import { PageLogin } from "../pages/PageLogin";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { CreateBookPage } from "./CreateBookPage";
import { SearchField } from "../../components/SearchField";

export const NavbarPage = () => {
  const {
    currentUser,
    windowSize,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    cleanFormData,
    loadBooks,
    setFilteredJugendBooks,
    resetBooksPage,
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
              {currentUser.username !== "anonymousUser" ? (
                <>
                  <img src={currentUser.img} alt="avatar" className="avatar" />
                  <span className={`${windowSize < 600 ? "none" : null}`}>
                    {currentUser.username}
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon className="account_icon" icon={faUser} />
                  <span className={`${windowSize < 600 ? "none" : null}`}>
                    Mein Konto
                  </span>
                </>
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
          <NavLink to="/cart" className="shopping-cart">
            <FontAwesomeIcon
              className="shopping-cart-icon"
              icon={faCartShopping}
            />
            <span className={windowSize < 600 ? "none" : null}>Warenkorb</span>
          </NavLink>
        </div>
      </nav>

      <nav className="navbar">
        <div className="navigation">
          <NavLink to="/books2">Bücher</NavLink>
          <NavLink to="/new-books">Neuheiten</NavLink>
          <NavLink to="/bestsellers">Bestseller</NavLink>
          <NavLink to="/books" onClick={resetBooksPage}>
            Books
          </NavLink>

          {/*currentUser.username==="anonymousUser" ? 
          (  null
          )
          :( <NavLink to="/logout">Logout </NavLink>)*/}
          <div className="search">
            <SearchField />
          </div>
        </div>
      </nav>
    </div>
  );
};
