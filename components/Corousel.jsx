
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppContext } from "../src/AppContext";
import { useContext, useEffect} from "react";

export const Corousel = () => {
    const { rawBooks, loadBooks } = useContext(AppContext)

    useEffect(() => {
        (async () => {
            loadBooks();        
        })();
    }, []);
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
            <div className="container-corousel slide1">
               <div className="content content-slide1">
                <h3>Slide1</h3>
                <button className="btn" >Show more</button>
                </div>
            </div>

            <div className="container-corousel slide2">
                                
                <div className="content content-slide2">
                    <p>Finden Sie jetzt Ihre Frühlingsstimmung</p>
                    <button className="btn">Mehr...</button>
                </div>
               {rawBooks.map(book => {
                    return (
                        <div key={book._id} className="spring-books">                                 
                           <div className="box">
                                {book.title === "Berühre mich. Nicht." && 
                                    <div className= "spring-book1">
                                        <img src={book.img} alt="" />
                                    </div>
                                }
                           </div>
                           <div className="box">
                                {book.title === "Wer wir sind" && 
                                    <div className="spring-book2">
                                        <img src={book.img} alt="" />
                                    </div>
                                }
                           </div>
                           <div className="box">
                                {book.title === "Das Liebespaar des Jahrhunderts" && 
                                    <div className="spring-book2">
                                        <img src={book.img} alt="" />
                                    </div>
                                }
                           </div>
                        </div>
                    )       
                })}


            </div>
            <div className="container-corousel slide3">
                <h3>Slide3</h3>
            </div>
        


        {/**     <div className="corousel">
                <div className="contents"></div>
                <button className="previous" onClick={handlePreviuos}>Previous</button>
                <button className="next" onClick={handleNext}>Next</button>
                <p>{index}</p>
        </div>*/}
       </Carousel>
        

    )

}