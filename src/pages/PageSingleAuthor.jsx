import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { Book } from "../pages/Book";
import { NavLink, Link } from "react-router-dom";
import FavoriteIcon from "../../components/UserFavorites";
import { baseURL } from '../../components/axios';



export const  PageSingleAuthor = () => {
  const [books, setBooks] = useState([]);

  const { authorID } = useParams();

  // Set up state to hold the book data for the corresponding author
  //console.log(authorID);
  
  const formattedAuthorID = authorID.replaceAll(' ', '+'); // replace spaces with underscore
  //console.log(formattedAuthorID);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseURL}/authors/${formattedAuthorID}`);
        setBooks(response.data.books);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchBooks();
}, [formattedAuthorID]);
      console.log(books);
    


  return (
    <div>
      <h3>Alles von {authorID}:</h3>
      <div className="card-container-author">
      
      {books.map((book) => (
          <div key={book._id} className="author-card">
                  {/* <Book book={book} /> */}
           
            <NavLink to={`/books/${book._id}`} onClick={() => openSingleBook()}>
              <div className="image">
                <img src={book.img} alt={book.title} height="150px" />
              </div>
            </NavLink>
            <div className="artikel-details">
                  <h6>{book.author}</h6>
                  <h5>{book.title}</h5>
                  <h5>{book.price} € </h5>
            </div>
            <FavoriteIcon book={book} className="favorite-icon" />

           
           </div>
        ))}
     
      </div>
    </div>
  );
}
