import { useState } from "react";
import { Corousel } from "../../components/Corousel";
import { NewReleases } from "../../components/NewReleases";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageHome = () => {
  const { rawBooks, handleClick } = useContext(AppContext);

  return (
    <div className="pageHome">
      <div className="container1">
        <Corousel />
      </div>
      <div className="container2">
        <NewReleases />
      </div>

      <div className="container3">
        <div className="title">
          <span>Neu von Liz Rosen</span>
        </div>
        {rawBooks.map((book) => {
          return (
            book.title === "Love me Twice" && (
                <div className="content" key={book._id}>

                  <div className="book-img-from-author" onClick={()=>{handleClick(book._id)}}>
                    <img src={book.img} alt=""  />
                  </div>

                  <div className="book-description">
                    <h2>{book.title}</h2>
                    <p className="description-author">by {book.author}</p>
                    <p className="description-text">{book.description}</p>
                    <div className="btn-container">
                     <button className="btn" onClick={()=>{handleClick(book._id)}}>zum Buch</button>
                    </div>
                  </div>

                </div>
              )
          )
        })}
      </div>
    </div>
  );
};
