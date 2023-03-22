import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import FavoriteIcon from "../../components/FavoriteIcon";

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
    increaseQty,
    decreaseQty,
    removeFromCart,
    addToCart,
    cart,
  } = useContext(AppContext);

  const { book } = props;
  function getItemQuantity(id) {
    return cart.find((item) => item._id === id)?.quantity || 0;
  }

  const quantity = getItemQuantity(book._id);

  return (
    <div className="card-container">
      <div className="card">
        <NavLink to={`/books/${_id}`} onClick={() => openSingleBook()}>
          <div className="image">
            <img src={img} alt={title} height="150px" />
          </div>
        </NavLink>
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
      {/*Edit and delete buttons */}
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
      {/*Add to cart buttons */}
      <div>
        {cart.some((p) => p._id === book._id) ? (
          <div>
            <div>
              <button onClick={() => decreaseQty(book)}>-</button>
              <div>
                <span>{quantity}</span> in cart
              </div>
              <button onClick={() => increaseQty(book)}>+</button>
            </div>
            <button onClick={() => removeFromCart(book)}>Remove</button>
          </div>
        ) : (
          <button onClick={() => addToCart(book)}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};
