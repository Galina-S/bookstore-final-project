import { AppContext } from "../AppContext";

import { useContext, useState, useEffect } from "react";
import FavoriteIcon from "../../components/FavoriteIcon";
import { AiFillEye } from 'react-icons/ai';
import axios from 'axios';

import {useParams} from 'react-router-dom'

export const PageSingleBook = ()  => {

  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [viewsCount, setViewsCount] = useState('');
  const [price, setPrice] = useState('');
  const [ISBN, setISBN] = useState('');
  const [puplication, setPuplication] = useState('');
  const [category, setCategory] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');


  const id = useParams().id;
  console.log(id);

  useEffect (()=> {
    const fetchHandler = async() => {
     
      await axios
      .get(`http://localhost:3005/books/${id}`)
      .then((res)=> res.data)
      .then(data=>{
        setTitle(data.book.title);
        setImg(data.book.img);
        setAuthor(data.book.author);
        setDescription(data.book.description);
        setViewsCount(data.book.viewsCount);
        setPrice(data.book.price);
        setISBN(data.book.ISBN);
        setPuplication(data.book.puplication);
        setCategory(data.book.category);
        setPublisher(data.book.publisher);
        setPages(data.book.pages);
      })
      // .then((res)=> console.log(res.data));
         // setBook(res.data) 
         
  
    };
     fetchHandler();
    },[id]) 


 return (
      <div className="content">
         <div className="title">
            <img src={img} alt={title} height="150px"/>
            {/* <FavoriteIcon book={openBook} /> */}
          </div>
          <div className="title">
            <h2>{title} </h2>
          </div>

          <div className="views">
            <p><AiFillEye />Views: {viewsCount}</p>
            <p></p>
          </div>          

          <div className="author">
            <h5>{author}</h5>
          </div>

          <div className="description">
            <p>{description}</p>
          </div>

          <div className="price">
            <h4>Price: {price} €</h4>
          </div>

        <div className="rest-info">
            <div className="isbn">
              <p>ISBN: {ISBN}</p>
            </div>
            <div className="publicationDate">
              <p>Public: {puplication}</p>
            </div>
            <div className="category">
              <p>Genre: {category}</p>
            </div>
            <div className="publisher">
              <p>Verlag: {publisher}</p>
            </div>
            <div className="pages">
              <p>Pages: {pages}</p>
            </div>
        </div>
           
    </div>
  );
};
