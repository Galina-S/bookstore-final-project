import { useContext } from "react";
import { AppContext } from "../AppContext";
import ShoppingCartBook from "../../components/ShoppingCartBook";

export const Cart = () => {
  const { cart } = useContext(AppContext);
  return (
    <div>
      {cart.map((_book) => {
        return (
          <div className="book" key={_book._id}>
            <ShoppingCartBook book={_book} />
          </div>
        );
      })}
    </div>
  );
};
