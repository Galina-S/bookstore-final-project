import { useContext, useState } from "react";
import { AppContext } from "../src/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";


import { NavLink } from "react-router-dom";

export const DisplayBook = (props) => {
  const { handleDeleteBook, onOpenEditForm, openSingleBook, placeholderImage } =
    useContext(AppContext);
  const { book } = props;
  const [openDescription, setOpenDescription] = useState(false);
  const [openBooksInfo, setOpenBooksInfo] = useState(false);

  return (
    <div className="info">
      <div className="all_books" key={props.book._id}>
        <div className="book-cover">
          <NavLink
            to={`/books/${book._id}`}
            onClick={() => openSingleBook(book)}
          >
            <img src={book.img || placeholderImage} alt="" />
          </NavLink>
        </div>
        <div className="content">
          <div className="title">
            <p>{book.title} </p>
          </div>
          <div className="author">
            <p>{book.author}</p>
          </div>
          <div className="description">
            <p
              className="open-text"
              onClick={() => setOpenDescription(!openDescription)}
            >
              Beschreibung lesen ...
            </p>
            {openDescription && (
              <div className="all-description">
                <p>{book.description}</p>
                <p className="close-description" onClick={() => setOpenDescription()}>close</p>
              </div>
            )}
          </div>
          <div className="books-info">
            <p
              className="open-text"
              onClick={() => setOpenBooksInfo(!openBooksInfo)}
            >
              {" "}
              Buch Info
            </p>
            {openBooksInfo && (
              <div className="rest-info">
                <div>
                  <div className="price">
                    <p>Price: {book.price} €</p>
                  </div>
                  <div className="isbn">
                    <p>ISBN: {book.ISBN}</p>
                  </div>
                  <div className="publicationDate">
                    <p>
                      Public:{" "}
                      {book?.puplication &&
                        new Date(book.puplication).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                  <div className="category">
                    <p>Genre: {book.category.join(", ")}</p>
                  </div>
                  <div className="publisher">
                    <p>Verlag: {book.publisher}</p>
                  </div>
                  <div className="pages">
                    <p>Pages: {book.pages}</p>
                  </div>
                  <div className="viewsCount">
                    <p>ViewsCount: {book.viewsCount} </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>



      
      </div>
        <div className="managePanel">
          <button
            className="btn editButton"
            onClick={() => onOpenEditForm(book)}>
              <FontAwesomeIcon icon={faPenToSquare} className="control-icon"/>
          </button>

          <button
            className="btn deleteButton"
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
              <FontAwesomeIcon icon={faTrash} className="control-icon"/>

          </button>
        </div>
    </div>
  );
};
