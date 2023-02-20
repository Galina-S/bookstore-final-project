import { useContext, useState } from "react";
import { AppContext } from "../src/AppContext";

export const EditBook = ({ book }) => {
  const { handleChangeFormField, sendEditBook } = useContext(AppContext);

  return (
    <form className="editForm" onSubmit={(e) => sendEditBook(e)}>
      <fieldset>
        <legend>Edit Book</legend>

        <div className="row">
          <label>Title</label>
          <div>
            <input
              name="title"
              defaultValue={book.title}
              type="text"
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
              defaultValue={book.author}
              name="author"
              type="text"
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
              defaultValue={book.img}
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
              name="price"
              defaultValue={book.price}
              type="number"
              onChange={(e) => {
                handleChangeFormField(e, "price");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>ISBN</label>
          <div>
            <input
              name="ISBN"
              defaultValue={book.ISBN}
              type="number"
              onChange={(e) => {
                handleChangeFormField(e, "ISBN");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Genre</label>
          <div>
            <input
              name="category"
              defaultValue={book.category}
              type="text"
              onChange={(e) => {
                handleChangeFormField(e, "category");
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Age</label>
          <div>
            <input
              name="age"
              defaultValue={book.age}
              type="number"
              onChange={(e) => {
                handleChangeFormField(e, "age");
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
              onChange={(e) => {
                handleChangeFormField(e, "pages");
              }}
            />
          </div>
        </div>

        <div className="buttonRow">
          <button>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </fieldset>
    </form>
  );
};
