import { AppContext } from "../AppContext";
//import { useParams } from "react-router";
import { useContext } from "react";
import FavoriteIcon from "../../components/FavoriteIcon";

export const PageSingleBook = () => {
  const { openBook } = useContext(AppContext);
  //const { id } = useParams();

  return (
    <div className="single-book">
      <div className="book" key={openBook._id}>
        <div className="book-cover">
          <img src={openBook.img} alt="" />
        </div>
        <div className="content">
          <div className="title">
            <h2>{openBook.title} </h2>
            <FavoriteIcon book={openBook} />
          </div>
          <div className="author">
            <h5>{openBook.author}</h5>
          </div>
          <div className="description">
            <p>{openBook.description}</p>
          </div>
          <div className="price">
            <h4>Price: {openBook.price} Є</h4>
          </div>
        </div>
        <div className="rest-info">
          <div className="isbn">
            <p>ISBN: {openBook.ISBN}</p>
          </div>
          <div className="publicationDate">
            <p>Public: {openBook.puplication.split("T22:00:00.000=00:00")}</p>
          </div>
          <div className="category">
            <p>Genre: {openBook.category.join(", ")}</p>
          </div>
          <div className="publisher">
            <p>Verlag: {openBook.publisher}</p>
          </div>
          <div className="pages">
            <p>Pages: {openBook.pages}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
