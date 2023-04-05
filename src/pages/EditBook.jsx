import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";

export const EditBook = () => {
  const { handleChangeFormField, sendEditBook, placeholderImage, formData } =
    useContext(AppContext);

  const book = formData;

  return (
    <div className="editBook">
      <form className="editForm" onSubmit={(e) => sendEditBook(e)}>
        <fieldset>
          <legend>Edit Book</legend>
          <div className="container">
            <div className="row">
              <label>Title</label>
              <div>
                <input
                  required
                  name="title"
                  defaultValue={book.title}
                  type="text"
                  maxLength={30}
                  onChange={(e) => {
                    handleChangeFormField(e, "title");
                  }}
                />
              </div>
            </div>
            <div className="row">
              <label>Author</label>
              <div>
                <input
                  required
                  defaultValue={book.author}
                  name="author"
                  type="text"
                  maxLength={30}
                  onChange={(e) => {
                    handleChangeFormField(e, "author");
                  }}
                />
              </div>
            </div>
            <div className="row">
              <label>Book Image</label>
              <div>
                <input
                  name="img"
                  defaultValue={book.img || placeholderImage}
                  type="text"
                  onChange={(e) => {
                    handleChangeFormField(e, "img");
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
                  defaultValue={book.price}
                  type="text"
                  min={0}
                  max={200}
                  pattern="^\d*(\.\d{0,2})?$"
                  title="Only numbers to 2 decimal points are allowed"
                  onChange={(e) => {
                    handleChangeFormField(e, "price");
                  }}
                />
              </div>
            </div>
            <div className="row">
              <label>Beschreibung</label>
              <div>
                <input
                  required
                  name="description"
                  defaultValue={book.description}
                  type="text"
                  maxLength={3000}
                  onChange={(e) => {
                    handleChangeFormField(e, "description");
                  }}
                />
              </div>
            </div>
            {/**
            <div className="row">

            {/* <div className="row">
              <label>Erscheinungsdatum</label>
              <div>
                <input
                  required
                  name="puplication"
                  defaultValue={book.puplication}
                  type="date"
                  max={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate() + 60
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => {
                    handleChangeFormField(e, "puplication");
                  }}
                />
              </div>
            </div>
            */}
            <div className="row">
              <label>Genre</label>
              <div>
                <input
                  required
                  name="category"
                  defaultValue={book.category}
                  type="text"
                  maxLength={100}
                  onChange={(e) => {
                    handleChangeFormField(e, "category");
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
                  defaultValue={book.publisher}
                  type="string"
                  maxLength={30}
                  onChange={(e) => {
                    handleChangeFormField(e, "publisher");
                  }}
                />
              </div>
            </div>
            <div className="row">
              <label>Pages</label>
              <div>
                <input
                  name="pages"
                  defaultValue={book.pages}
                  type="number"
                  min={0}
                  max={2000}
                  onChange={(e) => {
                    handleChangeFormField(e, "pages");
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
                  defaultValue={book.ISBN}
                  type="string"
                  min={10}
                  max={25}
                  onChange={(e) => {
                    handleChangeFormField(e, "ISBN");
                  }}
                />
              </div>
            </div>
            <div className="buttonRow">
              <NavLink to="/books">
                <button className="classicBtn btn">Cancel</button>
              </NavLink>
              <button className="classicBtn btn" type="submit">
                Save
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
