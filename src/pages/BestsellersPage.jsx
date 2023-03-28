import { AppContext } from "../AppContext";
import { useContext } from "react";
import { useState } from "react";

export const Bestsellers = () => {
  const { handleClick, rawBooks } = useContext(AppContext);

  const bestsellers = rawBooks.filter((book) => book.viewsCount > 5);
  bestsellers.sort((a, b) => b.viewsCount - a.viewsCount);
  return (
    <div>
      <div className="title">
        <span className="title-span">Bestsellers</span>
      </div>
      <div className="bestsellers-container">
        {bestsellers.map((book) => {
          return (
            <div className="bestseller-books" key={book._id}>
              <div className="bestseller-img">
                <img
                  src={book.img}
                  alt=""
                  onClick={() => {
                    handleClick(book._id);
                  }}
                />
              </div>
              <div className="bestseller-book-info">
                <div className="bestseller-content">
                  <p className="bestseller-author">{book.author}</p>
                  <p
                    className="bestseller-title"
                    onClick={() => {
                      handleClick(book._id);
                    }}
                  >
                    {book.title}
                  </p>
                </div>
                <div className="bestseller-price">
                  <p className="bestsellers-price">
                    <span>inkl. gesetzl. MwSt.</span>
                    {book.price} €
                  </p>
                  <button className="btn btn-cart">in den Warenkorb</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
