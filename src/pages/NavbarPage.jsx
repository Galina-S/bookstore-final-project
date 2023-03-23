import { useContext } from "react";
import { AppContext } from "../AppContext";
import { PageRegister } from "../pages/PageRegister";
import { PageLogin } from "../pages/PageLogin";
import { NavLink, Link } from "react-router-dom";

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
    goToFirstSlide,
    currentUser,
    windowSize,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    cleanFormData,
    loadBooks,
    resetBooksPage,
    currentUserIsAdmin,
    favorites

  } = useContext(AppContext);

  return (
    <div>
      <nav className="header-content">
        <div className="logo">
          <NavLink to="/home" onClick={goToFirstSlide}>LOGO</NavLink>
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
          
          {currentUserIsAdmin() && (
          <NavLink to="/create-book" className="wish-list" onClick={cleanFormData}>
            <FontAwesomeIcon className="wish-list-icon" icon={faFileCirclePlus} />
            <span className={windowSize < 600 ? "none" : null}>Neues Buch</span>
          </NavLink>)}

          <Link to={`/users/${currentUser._id}/favorites`} className="wish-list">
           <div className="heart-icon-container"> 
              <FontAwesomeIcon className="wish-list-icon-heart" icon={faHeart} />
              {favorites.length >0 && 
              <div className="favorite-count">{favorites.length}</div>}
              <span className={windowSize < 600 ? "none" : null}>Merkzettel</span>
           </div>
          </Link>

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
          <div className="box-navigation">
              {currentUserIsAdmin() && (<NavLink to="/books2">Admin-Bücher</NavLink>)}
            <NavLink to="/books" onClick={resetBooksPage}>
              Books
            </NavLink>
            <NavLink to="/new-books">Neuheiten</NavLink>
            <NavLink to="/bestsellers">Bestseller</NavLink>

          </div>
          <div className="search">
              <SearchField />
          </div>
        </div>


      </nav>
    </div>
  );
};
