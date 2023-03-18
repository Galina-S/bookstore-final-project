import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppContext } from "../src/AppContext";
import { useContext, useEffect, useState } from "react";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';




export const Corousel = () => {
  const { rawBooks, loadBooks, setFilteredJugendBooks } = useContext(AppContext);
  const childRefs = {
    book1: useRef({}),
    book2: useRef({}),
    book3: useRef({}),
    book4: useRef({}),
    book5: useRef({}),
    book6: useRef({}),
  };
  
  const navigate = useNavigate();

  const HandleOpenNovelsBooks = () => {
    navigate('/novels')
  };

  useEffect(() => {
    (async () => {
      loadBooks();
    })();
  }, []);


  const handleClick = (id) => {
    window.location.href = `/books/${id}`;
  };


  const handleCategoryJugendBooks = () => {
    const filter = rawBooks.filter((book) =>
      book.category.includes("Jugend")
    );
    setFilteredJugendBooks(filter);
    navigate('/books');
  
  };

  /**    const [index, setIndex] = useState(0);
    const length = 4;

    const handlePreviuos = () => {
        const newIndex = index - 1;
        setIndex(newIndex < 0 ? length - 1 : newIndex);
    }
    const handleNext = () => {
        const newIndex = index + 1;
        setIndex(newIndex >= length ? 0 : newIndex);
    }
     */
  return (
    <Carousel className="carousel" showThumbs={false}>
      {/**Slide1*/} 
            <div className="container-corousel slide1">
               <div className="content content-slide1">
                {/* <h3>Slide1</h3> */}
                <button className="btn" >Show more</button>
                </div>
            </div>
      {/**Slide2 */}
      <div className="container-corousel slide2">
        <div className="content content-slide2">
          <p>Finden Sie jetzt Ihre</p>
          <p className="p2">Frühlingsstimmung</p>
          <button  className="btn" onClick={HandleOpenNovelsBooks} >Mehr...</button>
        </div>
        {rawBooks.map((book) => {
          return (
            <div key={book._id} className="spring-books">
              <div
                className="box box1"
                onClick={() => {
                  handleClick(childRefs.book1.current.id);
                }}
              >
                {book.title === "Lean on Me" && (
                  <div
                    className="spring-books-all spring-book1"
                    id={book._id}
                    ref={childRefs.book1}
                  >
                    <img src={book.img} alt="" />
                  </div>
                )}
              </div>
              <div
                className="box box2"
                onClick={() => {
                  handleClick(childRefs.book2.current.id);
                }}
              >
                {book.title === "Mein Leben in deinem" && (
                  <div
                    className="spring-books-all spring-book2"
                    id={book._id}
                    ref={childRefs.book2}
                  >
                    <img src={book.img} alt="" />
                  </div>
                )}
              </div>
              <div
                className="box box3"
                onClick={() => {
                  handleClick(childRefs.book3.current.id);
                }}
              >
                {book.title === "Wer wir sind" && (
                  <div
                    className="spring-books-all spring-book2"
                    id={book._id}
                    ref={childRefs.book3}
                  >
                    <img src={book.img} alt="" />
                  </div>
                )}
              </div>
              <div
                className="box box4"
                onClick={() => {
                  handleClick(childRefs.book4.current.id);
                }}
              >
                {book.title === "Gewitterleuchten" && (
                  <div
                    className="spring-books-all spring-book4"
                    id={book._id}
                    ref={childRefs.book4}
                  >
                    <img src={book.img} alt="" />
                  </div>
                )}
              </div>
              <div
                className="box box5"
                onClick={() => {
                  handleClick(childRefs.book5.current.id);
                }}
              >
                {book.title === "Das Liebespaar des Jahrhunderts" && (
                  <div
                    className="spring-books-all spring-book5"
                    id={book._id}
                    ref={childRefs.book5}
                  >
                    <img src={book.img} alt="" />
                  </div>
                )}
              </div>
              <div
                className="box box6"
                onClick={() => {
                  handleClick(childRefs.book6.current.id);
                }}
              >
                {book.title === "Where the Hummingbirds Sing" && (
                  <div
                    className="spring-books-all spring-book6"
                    id={book._id}
                    ref={childRefs.book6}
                  >
                    <img src={book.img} alt="" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/**Slide3 */}
      <div className="container-corousel slide3">
        <div className="slide3-container">
          <div className="slide3-content1">
            <p>Spannende Geschichten für</p>
            <p>Teenager</p>
          </div>
          <div className="slide3-content2">
            <p>Findet gleich euer nächstes Must-Read:</p>
            <button className="btn" onClick={handleCategoryJugendBooks}>Zu den Büchern</button>
          </div>
        </div>
      </div>

      {/**     <div className="corousel">
                <div className="contents"></div>
                <button className="previous" onClick={handlePreviuos}>Previous</button>
                <button className="next" onClick={handleNext}>Next</button>
                <p>{index}</p>
        </div>*/}

    </Carousel>
  );
};
