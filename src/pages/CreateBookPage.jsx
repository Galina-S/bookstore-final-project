import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

export const CreateBookPage = () => {
  const { handleAddBookForm, sendNewBook, formData, placeholderImage } =
    useContext(AppContext);

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
              maxLength={30}
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
              maxLength={30}
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
              maxLength={100}
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
              type="text"
              min={0}
              max={200}
              pattern="^\d*(\.\d{0,2})?$"
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
              type="string"
              min={10}
              max={25}
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
              max={new Date().toISOString().split("T")[0]}
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
              maxLength={1000}
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
              maxLength={30}
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
              maxLength={15}
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
              min={0}
              max={2000}
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
