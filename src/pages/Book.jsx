import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import FavoriteIcon from "../../components/FavoriteIcon";

export const Book = (props) => {
    const {_id, author, img, title, description, price, ISBN, 
        puplication, category, publisher, pages, viewsCount} = props.book;
                
        const { handleDeleteBook, onOpenEditForm, openSingleBook, placeholderImage } =
        useContext(AppContext);
       
        const { book } = props;
        
        return <div className="card-container">
            <div className="card">
            <NavLink to={`/books/${_id}`} onClick={() => openSingleBook()}>
            <img src={img} alt={title} height="150px"/>
            <h6>{author}</h6>
            <h5>{title}</h5>
            <h4>{price} € </h4>
            {/* <p>{description}</p> 
            <p>{ISBN}</p>
            <p>{puplication}</p>
            <p>{category}</p>
            <p>{publisher}</p>
            <p>{pages}</p>
            <p>{viewsCount}</p> */} 
        {/* <Button LinkComponent = {Link}  to={`/books/${_id}`} sx= {{mt:"auto", padding:0, margin:0}}>Details</Button> */}
        </NavLink>
        <FavoriteIcon book={book} className="favorite-icon"/>
            </div>
        
        <div className='edit-delete-buttons'>
            <button  className="deleteButton" onClick={() => handleDeleteBook(book)} >Delete</button>
            <button className="editButton" onClick={() => onOpenEditForm(book)}>Edit</button>
        </div>
        
        </div>
       

 
};
