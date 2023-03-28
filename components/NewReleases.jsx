import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppContext } from "../src/AppContext";
import { useContext} from "react";
import { NavLink } from "react-router-dom";





export const NewReleases = () => {

  const { rawBooks, handleClick } = useContext(AppContext);

  const filteredBooks = rawBooks.filter(book => new Date(book.puplication) > new Date('2023-01-01'));

  return (
    <div className="new-releases">
      <div className="title">
        <span>
             Neuheiten
        </span>
      </div>
      <div className="link-to-books">
         <NavLink to="/new-books" className='link-new-books'>See All</NavLink> 
      </div>

      <Carousel showThumbs={false} showArrows={true} 
            showIndicators={true}
            showStatus={false} centerMode={true} 
            centerSlidePercentage={10} 
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

