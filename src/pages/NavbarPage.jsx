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
    favorites,
    cart,
  } = useContext(AppContext);

  return (
    <div>
      <nav className="header-content">
        <div className="logo">
          <NavLink to="/home" onClick={goToFirstSlide}>
            <img
              src="https://i.ibb.co/37NJLgx/360-F-408740958-Lv-Kdx0d7p-Ma-X1-JKb-SHz-MCx-Sy-Ns-QHkchw-copy.png"
              alt=""
            />
          </NavLink>
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
                  <img src={`data:image/png;base64,${currentUser.img}`} alt="avatar" className="avatar" />
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
                <div>
                 <div className="logout-container">
                    <NavLink to="/konto"  >Kontoübersicht</NavLink>
                    <NavLink
                      to="/logout"
                      onClick={() => (className = "inactiv")}>
                      Logout
                    </NavLink>
                 </div>

                </div>
              )}
            </div>
          </div>

          {currentUserIsAdmin() && (
            <NavLink
              to="/create-book"
              className="wish-list"
              onClick={cleanFormData}
            >
              <FontAwesomeIcon
                className="wish-list-icon"
                icon={faFileCirclePlus}
              />
              <span className={windowSize < 600 ? "none" : null}>
                Neues Buch
              </span>
            </NavLink>
          )}

          {favorites.length >= 6 && currentUser === "anonymousUser" && (
            <>
              {" "}
              <PageLogin />
            </>
          )}

          <Link
            to={`/users/${currentUser._id}/favorites`}
            className="wish-list"
          >
            <div className="heart-icon-container">
              <FontAwesomeIcon
                className="wish-list-icon-heart"
                icon={faHeart}
              />

              {favorites.length > 0 && (
                <div className="favorite-count">{favorites.length}</div>
              )}

              <span className={windowSize < 600 ? "none" : null}>
                Merkzettel
              </span>
            </div>
          </Link>

          <NavLink
            to={`/users/${currentUser._id}/cart`}
            className="shopping-cart"
          >
            <div className="heart-icon-container">
              <FontAwesomeIcon
                className="shopping-cart-icon"
                icon={faCartShopping}
              />
              {cart.length > 0 && (
                <div className="favorite-count">
                  {cart.reduce((total, cartItem) => {
                    return total + cartItem.quantity;
                  }, 0)}
                </div>
              )}
              <span className={windowSize < 600 ? "none" : null}>
                Warenkorb
              </span>
            </div>
          </NavLink>
        </div>
      </nav>

      <nav className="navbar">
        <div className="navigation">
          <div className="box-navigation">
            {currentUserIsAdmin() && (
              <NavLink to="/books2">Admin-Bücher</NavLink>
            )}
            <NavLink to="/books" onClick={resetBooksPage}>
              Bücher
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
