import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import ShoppingCartBook from "../../components/ShoppingCartBook";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseURL } from "../../components/axios";

export const Cart = () => {
  const { cart, rawBooks, currentUser, setCart, formatCurrency } =
    useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          `${baseURL}/users/${currentUser?._id}/cart`
        );
        const _cart = [];
        rawBooks.map((_book) => {
          if (response.data.includes(_book._id)) {
            _book.quantity = 1;
            _cart.push(_book);
          }
        });

        setCart(_cart);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (currentUser) {
      fetchCart();
    }
  }, [currentUser, rawBooks, setCart]);

  if (isLoading) {
    return <p></p>;
  }

  if (cart.length === 0) {
    return (
      <div>
        <h3>Ihr Warenkorb ist leer.</h3>
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
    );
  }

  return (
    <div className="shopping-cart">
      <div className="column-labels">
        <label className="product-image">Image</label>
        <label className="product-details">Product</label>
        <label className="product-price">Price</label>
        <label className="product-quantity">Quantity</label>
        <label className="product-removal">Remove</label>
        <label className="product-line-price">Total</label>
      </div>
      {cart.map((_book) => {
        return (
          <div key={_book._id}>
            <ShoppingCartBook book={_book} />
          </div>
        );
      })}
      <div className="totals">
        <div className="totals-item">
          <label>Total</label>
          <div className="totals-value" id="cart-subtotal">
            {formatCurrency(
              cart.reduce((total, cartItem) => {
                return total + (cartItem.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </div>
      </div>
      <button className="checkout">Checkout</button>
    </div>
  );
};
