
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Book } from "../pages/Book";


const URL = 'http://localhost:3005/books';
const fetchHadler = async() => {
    return await axios.get(URL).then((res)=>res.data)
}
export const PageBooks2 = () => {
  const [books, setBooks] = useState()
    useEffect(()=> {
        fetchHadler().then(data => setBooks(data))
    }, []);
    console.log(books);
  return <div className="pageBooks2">
      <ul>
        {books &&
            books.map((book, i)=>(
            <li className= "book" key={i}>
            <Book book={book} /> 
            </li>
        )) }
      </ul>
    </div>
  
};
