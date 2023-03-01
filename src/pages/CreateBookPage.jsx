import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

export const CreateBookPage = () => {
  const { handleAddBookForm, sendNewBook, formData, placeholderImage } = useContext(AppContext);

  return (
    <form className="editForm" onSubmit={(e) => sendNewBook(e)}>
      <fieldset>
        <legend>Neues Buch Hinzufügen</legend>

        <div className="row">
          <label>Title</label>
          <div>
            <input
              required
              name="title"
              defaultValue={formData.title}
              type="text"
              onChange={(e) => {
                handleAddBookForm(e, "title");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Author</label>
          <div>
            <input
              required
              defaultValue={formData.author}
              name="author"
              type="text"
              onChange={(e) => {
                handleAddBookForm(e, "author");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Book Image</label>
          <div>
            <input
              
              name="img"
              defaultValue={formData.img || placeholderImage}
              type="text"
              onChange={(e) => {
                handleAddBookForm(e, "img");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Price</label>
          <div>
            <input
              required
              name="price"
              defaultValue={formData.price}
              type="number"
              onChange={(e) => {
                handleAddBookForm(e, "price");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>ISBN</label>
          <div>
            <input
              required
              name="ISBN"
              defaultValue={formData.ISBN}
              type="number"
              onChange={(e) => {
                handleAddBookForm(e, "ISBN");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Publication Date</label>
          <div>
            <input
              required
              name="puplication"
              defaultValue={formData.puplication}
              type="date"
              onChange={(e) => {
                handleAddBookForm(e, "puplication");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Description</label>
          <div>
            <input
              required
              name="description"
              defaultValue={formData.description}
              type="text"
              onChange={(e) => {
                handleAddBookForm(e, "description");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Genre</label>
          <div>
            <input
              required
              name="category"
              defaultValue={formData.category}
              type="text"
              onChange={(e) => {
                handleAddBookForm(e, "category");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Verlag</label>
          <div>
            <input
              required
              name="publisher"
              defaultValue={formData.publisher}
              type="string"
              onChange={(e) => {
                handleAddBookForm(e, "publisher");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Pages</label>
          <div>
            <input
              required
              name="pages"
              defaultValue={formData.pages}
              type="number"
              onChange={(e) => {
                handleAddBookForm(e, "pages");
              }}
            />
          </div>
        </div>

        <div className="buttonRow">
          <Link to="/books">
            <button className="classicBtn">Cancel</button>
          </Link>

          <button type="submit" className="classicBtn">
            Save
          </button>
        </div>
      </fieldset>
    </form>
  );
};
