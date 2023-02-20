import { useContext, useState } from "react";
import { AppContext } from "../src/AppContext";


export const EditBook = ({ book }) => {
    const { handleChangeFormField, sendEditBook } = useContext(AppContext);
   

  return (
    <form className="editForm">
      <fieldset>
        <legend>Edit Book</legend>

        <div className="row">
          <label>Title</label>
          <div>
            <input              
              value={book.title}
              type="text"
              onChange={(e)=> {
                handleChangeFormField(e, 'title')
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Author</label>
          <div>
            <input
              value={book.author}
              type="text"
              onChange={(e)=> {
                handleChangeFormField(e, 'author')
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Book Image</label>
          <div>
            <input
              value={book.img}
              type="text"
              onChange={(e)=> {
                handleChangeFormField(e, 'img')
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Price</label>
          <div>
            <input
              value={book.price}
              type="number"
              onChange={(e)=> {
                handleChangeFormField(e, 'price')
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>ISBN</label>
          <div>
            <input
              value={book.ISBN}
              type="number"
              onChange={(e)=> {
                handleChangeFormField(e, 'ISBN')
              }}
            />
          </div>
        </div>


        <div className="row">
          <label>Genre</label>
          <div>
            <input
              value={book.category}
              type="text"
              onChange={(e)=> {
                handleChangeFormField(e, 'category')
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Age</label>
          <div>
            <input
              value={book.age}
              type="number"
              onChange={(e)=> {
                handleChangeFormField(e, 'age')
              }}
            />
          </div>
        </div>

        <div className="row">
          <label>Pages</label>
          <div>
            <input
              value={book.pages}
              type="number"
              onChange={()=> {
                handleChangeFormField(e, 'pages')
              }}
            />
          </div>
        </div>


        <div className="buttonRow">
          <button >Cancel</button>
          <button onClick={() => sendEditBook(book)} >Save</button>
        </div>
      </fieldset>
    </form>
  );
};
