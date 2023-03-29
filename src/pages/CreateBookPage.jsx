import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

export const CreateBookPage = () => {
  const { handleAddBookForm, sendNewBook, formData } =
    useContext(AppContext);
    const placeholderImage = "https://i.ibb.co/mh9LSfd/keinBild.jpg";

  return (
    <div className="createBookPage">
    <form className="new-book" onSubmit={(e) => sendNewBook(e)}>
      <fieldset>
      <legend>Neues Buch Hinzufügen</legend>
      <div className="container">
      <div>
              <div className="row">
                <label>Title</label>
                <div>
                  <input
                    required
                    name="title"
                    defaultValue={formData.title}
                    type="text"
                    maxLength={60}
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
                    maxLength={200}
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
                    maxLength={5}
                    pattern="^\d*(\.\d{0,2})?$"
                    title="Only numbers to 2 decimal points are allowed"
                    onChange={(e) => {
                      handleAddBookForm(e, "price");
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
                    maxLength={2000}
                    onChange={(e) => {
                      handleAddBookForm(e, "description");
                    }}
                  />
                </div>
              </div>

              </div>

              <div>
              <div className="row">
                <label>Publication Date</label>
                <div>
                  <input
                    required
                    name="puplication"
                    defaultValue={formData.puplication}
                    type="date"
                    max={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 60).toISOString().split("T")[0]}
                    onChange={(e) => {
                      handleAddBookForm(e, "puplication");
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
                    maxLength={50}
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
                    maxLength={30}
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

              <div className="buttonRow">
                <Link to="/books">
                  <button className="classicBtn">Cancel</button>
                </Link>
                <button type="submit" className="classicBtn">
                  Save
                </button>
                </div>
              </div>
            </div>
        </fieldset>
    </form>
    </div>
  );
};
