import { AppContext } from "/src/AppContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../components/axios";
import { NavLink, Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";

export const WishListPage = () => {
  const {
    rawBooks,
    openSingleBook,
    currentUser,
    favorites,
    setFavorites,
    addToCart,
  } = useContext(AppContext);

  const userId = currentUser._id;
  const userName = currentUser.username;
  console.log(userId);

  const navigate = useNavigate();

  const deleteFavorite = async (bookId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/users/${userId}/favorites/${bookId}`,
        { withCredentials: true }
      );
      console.log(response.data.message);

      // Update the state of favorites to re-render the UI
      setFavorites(favorites.filter((id) => id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wishListPage">
      <h1>Merkzettel</h1>
      {currentUser.username === "anonymousUser" && favorites.length == 6 && (
        <>
          <h3>Merkzettel is voll</h3>
          <p>
            Um weitere Artikel auf den Merkzettel zu legen und alle Vorteile zu
            nutzen, loggen Sie sich ein oder legen Sie jetzt ein Konto an.{" "}
          </p>
        </>
      )}

      {favorites.length >= 1 && (
        <ul className="container-wishpage">
          {rawBooks.map((_book) => {
            if (favorites.includes(_book._id)) {
              return (
                <li key={_book._id}>
                  <div className="card-wishlist">
                    <NavLink
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/books/${_book._id}`}
                      onClick={() => openSingleBook()}
                    >
                      <div className="image">
                        <img src={_book.img} alt={_book.title} height="150px" />
                      </div>
                    </NavLink>
                    <div className="artikel-details">
                      <p className="book-author">{_book.author}</p>
                      <strong>{_book.title}</strong>
                      <p>
                        <span>
                          {_book.price.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          })}{" "}
                        </span>
                      </p>

                      <div className="button-gruppe">
                        <button
                          className="delete-bin"
                          onClick={() => deleteFavorite(_book._id)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                        <button
                          className="element-button-primary"
                          onClick={() => addToCart(_book)}
                        >
                          <span>
                            <BsCartPlus />
                          </span>{" "}
                          In den Warenkorb
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}

      {favorites.length == 0 && (
        <div>
          <h3>Ihr Merkzettel ist leer.</h3>
          <p
            style={{
              paddingTop: "10px",
              fontSize: "0.9rem",
              paddingBottom: "15px",
            }}
          >
            Stöbern Sie in unserem Sortiment.
          </p>
          <button
            onClick={() => {
              navigate("/books");
            }}
            className="button-go-to-books"
          >
            Jetzt stöbern
          </button>
        </div>
      )}
    </div>
  );
};
