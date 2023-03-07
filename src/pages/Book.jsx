import react from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

export const Book = (props) => {
    const {_id, author, img, title, description, price, ISBN, 
        puplication, category, publisher, pages, viewsCount} = props.book;

        return <div className="card">
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
        <Button LinkComponent = {Link}  to={`/books/${_id}`} sx= {{mt:"auto", padding:0, margin:0}}>Details</Button>
        <Button sx= {{mt:"auto", padding:0, margin:0}}>Delete</Button>
 </div>
};
