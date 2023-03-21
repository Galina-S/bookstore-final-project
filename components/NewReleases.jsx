import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppContext } from "../src/AppContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";





export const NewReleases = () => {

  const { rawBooks} = useContext(AppContext);

  const filteredBooks = rawBooks.filter(book => new Date(book.puplication) > new Date('2023-01-01'));

  const handleClick = (id) => {
    window.location.href = `/books/${id}`;

  };
  

  return (
    <div className="new-releases">
      <div className="title">
        <span>
             Neucheiten <br />
        </span>
      </div>
      <div className="link-to-books">
         <NavLink to="/new-books" className='link-new-books'>See All</NavLink> 
      </div>

      <Carousel showThumbs={false} showArrows={true} 
            showIndicators={true}
            showStatus={false} centerMode={true} 
            centerSlidePercentage={15} 
            swipeable={true} 
            className="carousel-new-releases">
        {filteredBooks.map(book => {
          return (
            <div className="container-new-releases" key={book._id}>
                <div className="slide" onClick={()=>{ handleClick(book._id)}} >
                     <img src={book.img} alt=""/>
                </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  );
};

