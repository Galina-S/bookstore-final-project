import { useContext } from "react";
import { AppContext } from "../src/AppContext";

export const BooksWeLove = () => {
  const { rawBooks, handleClick } = useContext(AppContext);

  return (
    <div className="content">
      <div className="box1">
        {rawBooks.map((book) => {
          return (
            book.title === "Wolfskinder" && (
              <div className="box box1-content" onClick={() => handleClick(book._id)}>
                <img src={book.img} alt="" />
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </div>
            )
          );
        })}
      </div>

      <div className="box2">
        {rawBooks.map((book) => {
          return (
            <div className="box box2-container" key={book._id}>
              {book.title === "Über den Sinn des Lebens" && (
                <div  className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}

              {book.title === "Der Strand: Vermisst" && (
                <div className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}

              {book.title === "STAY" && (
                <div className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}

              {book.title === "Null bis unendlich" && (
                <div className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}

              {book.title === "KNIGHTS - Ein gnadenloses Schicksal" && (
                <div className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}

              {book.title === "Der Osten: eine westdeutsche Erfindung" && (
                <div className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}

              {book.title === "Das Vorkommnis" && (
                <div className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}

              {book.title === "... trotzdem Ja zum Leben sagen" && (
                <div className=" box2-content" onClick={() => handleClick(book._id)}>
                  <img src={book.img} alt="" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
