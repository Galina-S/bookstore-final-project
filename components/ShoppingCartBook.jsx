import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/AppContext";
import { BsFillTrashFill } from "react-icons/bs";

function ShoppingCartBook({ book }) {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(AppContext);

  return (
    <>
      <div className="product">
        <div className="product-image">
          <NavLink to={`/books/${book._id}`} onClick={() => openSingleBook()}>
            <img src={book.img} alt={book.title} />
          </NavLink>
        </div>
        <div className="product-details">
          <div className="artikel-details">
            <p className="book-author">{book.author}</p>
            <strong>{book.title}</strong>
          </div>
        </div>
        <div className="product-price">{book.price}</div>
        <div className="product-quantity">{book.quantity}</div>
        <div className="product-removal">
          <div className="product-qty">
            <button onClick={() => decreaseQty(book)}>-</button>

            <button onClick={() => increaseQty(book)}>+</button>
          </div>
          <button
            className="remove-product"
            onClick={() => removeFromCart(book._id)}
          >
            <BsFillTrashFill />  Löschen
          </button>
        </div>
        <div className="product-line-price">{book.price * book.quantity}</div>
      </div>
    </>
  );
}

export default ShoppingCartBook;
