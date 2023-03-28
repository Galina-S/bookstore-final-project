import instance from "../../components/axios";
import { useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useContext } from "react";

export const NewBooksPage = () => {
  const [newReleases, setNewReleases] = useState([]);
  const { handleClick, loadBooks, addToCart } = useContext(AppContext);
  const [seeAllReleases, setSeeAllReleases] = useState(false);

  useEffect(() => {
    (async () => {
      loadBooks();
    })();
  }, []);

  useEffect(() => {
    const fetchNewReleases = async () => {
      const response = await instance.get("/new-books");
      setNewReleases(response.data);
    };
    fetchNewReleases();
  }, []);
  //NEW LAST WEEK
  const lastWeek = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  const newLastWeek = newReleases.filter(
    (book) => new Date(book.puplication) > lastWeek
  );

  // NEW Belletristik
  const newInBelletristik = newReleases.filter((book) =>
    book.category.includes("Belletrisrik")
  );

  // NEW NOVELS

  const newInNovels = newReleases.filter(
    (book) =>
      book.category.includes("Liebe") ||
      book.category.includes("Liebesroman") ||
      book.category.includes("Frauen")
  );

  // NEW FANTASY
  const newInFantasy = newReleases.filter(
    (book) =>
      book.category.includes("Fantasy") || book.category.includes("Mystery")
  );

  return (
    <div className="new-releases">
      <div className="all-releases">
        <h1>Neue Veröffentlichungen</h1>
        {!seeAllReleases && (
          <div>
            <button
              className="btn btn-releases"
              onClick={() => setSeeAllReleases(!seeAllReleases)}>
              zu alle neuen Büchern
            </button>
          </div>
        )}
        {seeAllReleases && (
          <div>
            <button
              className="btn btn-releases"
              onClick={() => setSeeAllReleases(!seeAllReleases)}
            >
              zurück
            </button>
          </div>
        )}
      </div>
      {!seeAllReleases && (
        <div className="releases-sort-category">
          <div className="title">
            <span className="title-span">Neu in dieser Woche</span>
          </div>
          <div className="content">
            {newLastWeek.map((book) => {
              return (
                <div key={book._id} className="releases week-release">
                  <div
                    className="book"
                    onClick={() => {
                      handleClick(book._id);
                    }}
                  >
                    <img src={book.img} alt="" />
                    <div className="book-text">
                      <p className="author">{book.author}</p>
                      <p>{book.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="title">
            <span className="title-span">Neu in der Belletristik</span>
          </div>
          <div className="content">
            {newInBelletristik.map((book) => {
              return (
                <div key={book._id} className="releases belletristik-release">
                  <div
                    className="book"
                    onClick={() => {
                      handleClick(book._id);
                    }}
                  >
                    <img src={book.img} alt="" />
                    <div className="book-text">
                      <p className="author">{book.author}</p>
                      <p>{book.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="title">
            <span className="title-span">Neu in den Liebesromanen</span>
          </div>
          <div className="content">
            {newInNovels.map((book) => {
              return (
                <div key={book._id} className="releases belletristik-release">
                  <div
                    className="book"
                    onClick={() => {
                      handleClick(book._id);
                    }}
                  >
                    <img src={book.img} alt="" />
                    <div className="book-text">
                      <p className="author">{book.author}</p>
                      <p>{book.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="title">
            <span className="title-span">Neu in Fantasy</span>
          </div>
          <div className="content">
            {newInFantasy.map((book) => {
              return (
                <div key={book._id} className="releases belletristik-release">
                  <div
                    className="book"
                    onClick={() => {
                      handleClick(book._id);
                    }}
                  >
                    <img src={book.img} alt="" />
                    <div className="book-text">
                      <p className="author">{book.author}</p>
                      <p>{book.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {seeAllReleases && (
        <div className="all-releases-books">
          <div className="title">
            <span className="title-span">Alle Neue Bücher 2023</span>
          </div>
          <div className="books-container">
            {newReleases.map((book) => {
              return (
                <div key={book._id} className="all-books-releases">
                  <img src={book.img} alt=""  onClick={() => {
                      handleClick(book._id);
                    }}/>
                  <div className="content-book">
                    <div className="authot-title">
                      <p className="book-author">{book.author}</p>
                      <p>{book.title}</p>
                    </div>
                    <div className="prise-btn">
                      <p>
                        <span>inkl. gesetzl. MwSt.</span> {book.price} €
                      </p>
                      <button
                        className="btn btn-card"
                        onClick={() => addToCart(book)}
                      >
                        in den Warenkorb
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
