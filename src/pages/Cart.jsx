import { useContext } from "react";
import { AppContext } from "../AppContext";
import ShoppingCartBook from "../../components/ShoppingCartBook";

export const Cart = () => {
  const { cart } = useContext(AppContext);
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
      {cart.length == 0 && (
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
      )}
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
            {cart.reduce((total, cartItem) => {
              return total + (cartItem.price || 0) * cartItem.quantity;
            }, 0)}
          </div>
        </div>
        {/* <div className="totals-item">
          <label>Tax (5%)</label>
          <div className="totals-value" id="cart-tax">
            3.60
          </div>
        </div>
        <div className="totals-item">
          <label>Shipping</label>
          <div className="totals-value" id="cart-shipping">
            15.00
          </div>
        </div>
        <div className="totals-item totals-item-total">
          <label>Grand Total</label>
          <div className="totals-value" id="cart-total">
            90.57
          </div>
        </div>*/}
      </div>
      <button className="checkout">Checkout</button>
    </div>
  );
};
