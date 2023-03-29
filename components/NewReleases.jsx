import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppContext } from "../src/AppContext";
import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
export const NewReleases = () => {
  const { rawBooks, handleClick, getWindowSize } = useContext(AppContext);
  const [booksPerPage, setBooksPerPage] = useState(6);


  const filteredBooks = rawBooks.filter(
    (book) => new Date(book.puplication) > new Date("2023-01-01")
  );

  //Carousel functionality  
  
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // prev/next button
  const handleClickNext = () => {
    setCurrentPage(currentPage === totalPages - 1 ? 0 : currentPage + 1);
  };
  const handleClickPrev = () => {
    setCurrentPage(currentPage === 0 ? totalPages - 1 : currentPage - 1);
  };

  //Tracking The Window Size
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    console.log(windowSize);

    // Update booksPerPage based on window size
    window.addEventListener("resize", handleWindowResize);

    if (windowSize <= 550) {
      setBooksPerPage(3);
    } else if (windowSize <= 768) {
      setBooksPerPage(4);
    } else if (windowSize <= 1024) {
      setBooksPerPage(5);
    } else {
      setBooksPerPage(7);
    };
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);




  return (
    <div className="new-releases-carousel">
      <div className="title">
        <span>Neuheiten</span>
      </div>
      <div className="link-to-books">
        <NavLink to="/new-books" className="link-new-books">
          mehr...
        </NavLink>
      </div>

      <div className="carousel-new-releases-books">

        <div className="carousel-inner">
          <button className="carousel-control carousel-control-prev" onClick={handleClickPrev}>
            <FontAwesomeIcon icon={faChevronLeft} className="control-icon"/>
          </button>

          {filteredBooks
            .slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage)
            .map((book) => (
              <div
                className="carousel-item"
                key={book._id}
                onClick={() => handleClick(book._id)}
              >
                <img src={book.img} alt="" />
              </div>
            ))}
          <button className="carousel-control carousel-control-next" onClick={handleClickNext}>
            <FontAwesomeIcon icon={faChevronRight} className="control-icon"/>
          </button>
        </div>

      </div>

      {/**<Carousel  showThumbs={false}
                showArrows={true}
                showIndicators={true}
                showStatus={false}
                centerMode={true}
                centerSlidePercentage={10}
                swipeable={true}
                className="carousel-new-releases"
                slidesToShow={6}
                slidesToScroll={6}>
        {filteredBooks.map(book => {
          return (
            <div className="container-new-releases" key={book._id}>
                <div className="slide" onClick={()=>{ handleClick(book._id)}} >
                     <img src={book.img} alt=""/>
                </div>
            </div>
          )
        })}
      </Carousel>*/}
    </div>
  );
};
