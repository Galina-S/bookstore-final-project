import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import FavoriteIcon from "../../components/UserFavorites";

export const Book = (props) => {
  const {
    _id,
    author,
    img,
    title,
    description,
    price,
    ISBN,
    puplication,
    category,
    publisher,
    pages,
    viewsCount,
  } = props.book;

  const {
    handleDeleteBook,
    onOpenEditForm,
    openSingleBook,
    placeholderImage,
    cart,
    currentUserIsAdmin,
    currentUser,
  } = useContext(AppContext);

  const { book } = props;
  function getItemQuantity(id) {
    return cart.find((item) => item._id === id)?.quantity || 0;
  }
  // const isLiked = currentUser.favorites.includes(book._id);
  const quantity = getItemQuantity(book._id);

  return (
    <div className="card-container">
      <div className="card">
        <Link to={`/books/${_id}`} onClick={() => openSingleBook()}>
          <div className="image">
            <img src={img} alt={title} height="150px" />
          </div>
        </Link>
        <div className="artikel-details">
          <Link to={`/authors/${author}`}>
            <h6>{author}</h6>
          </Link>
          {/* <h6>{author}</h6> */}
          <h5>{title}</h5>
          <h4>{price} € </h4>
        </div>
        <FavoriteIcon book={book} className="favorite-icon" />
      </div>

      {currentUserIsAdmin() && (
        <div className="edit-delete-buttons">
          <button
            className="deleteButton"
            onClick={() => {
              if (
                window.confirm(
                  "Sind Sie sicher, dass Sie dieses Buch löschen möchten?"
                )
              ) {
                handleDeleteBook(book);
              }
            }}
          >
            Delete
          </button>

          <NavLink to={`/edit/${_id}`}>
            <button className="editButton" onClick={() => onOpenEditForm(book)}>
              Edit
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};
