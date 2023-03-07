import { useContext } from "react";
import { AppContext } from "../src/AppContext";
import FavoriteIcon from "../components/FavoriteIcon";
import { NavLink } from "react-router-dom";

export const DisplayBook = (props) => {
  const { handleDeleteBook, onOpenEditForm, openSingleBook, placeholderImage } =
    useContext(AppContext);
  const { book } = props;

  return (
    <div className="info">
      <div className="book" key={props.book._id}>
        <div className="book-cover">
          <img src={book.img || placeholderImage} alt="" />
        </div>
        <div className="content">
          <div className="title">
            <h2>{book.title} </h2>
            <FavoriteIcon book={book} />
          </div>
          <div className="author">
            <h5>{book.author}</h5>
          </div>
          <div className="description">
            <p>{book.description}</p>
          </div>
          <div className="price">
            <h4>Price: {book.price} Є</h4>
          </div>
        </div>
        <div className="rest-info">
          <div className="isbn">
            <p>ISBN: {book.ISBN}</p>
          </div>
          <div className="publicationDate">
            <p>Public: {book.puplication.split("").splice(0, 10).join("")}</p>
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
        </div>
      </div>

      <div className="managePanel">
        <div>
          <button className="editButton" onClick={() => onOpenEditForm(book)}>
            {" "}
            Edit{" "}
          </button>

          <NavLink
            to={`/book/${book._id}`}
            onClick={() => openSingleBook(book)}
          >
            <button>Go to book page</button>
          </NavLink>

          <button
            className="deleteButton"
            onClick={() => handleDeleteBook(book)}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
