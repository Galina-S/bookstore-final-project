import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppContext } from "../src/AppContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";





export const NewReleases = () => {
  const { rawBooks} = useContext(AppContext);
  const [newReleasesBooks, setNewReleasesBook] = useState([]);



  /** useEffect(() => {
    (async () => {
       rawBooks.map(book => {
        const publicationTimestamp = new Date(book.puplication).getTime();// convert publication date to Unix timestamp 
        const cutoffTimestamp = new Date('01/12/2021').getTime();
        console.log(publicationTimestamp, cutoffTimestamp );
        if (publicationTimestamp >= cutoffTimestamp) {
           setNewReleasesBook(book)        
        }
       })
    })();
  }, []); */

  console.log(newReleasesBooks);


  return (
    <div className="new-releases">
      <div className="title">
      <NavLink to="/new-books" className='link-new-books'>Bücher Neuheiten</NavLink>
      </div>

      <Carousel showThumbs={false} showArrows={true} 
            showIndicators={true}
            showStatus={false} centerMode={true} 
            centerSlidePercentage={15} 
            swipeable={true} 
            className="carousel-new-releases">
        {rawBooks.map(book => {
          return (
            <div className="container-new-releases" key={book._id}>
                <div className="slide">
                     <img src={book.img} alt=""/>
                </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  );
};

