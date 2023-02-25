import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const Favorite = ({ book }) => {
    const [isFavorite, setIsFavorite] = useState(false);
  
    useEffect(() => {
      const favorite = localStorage.getItem(book.title);
      if (favorite !== null) {
        setIsFavorite(favorite === 'true');
      }
    }, [book.title]);

    useEffect(() => {
      localStorage.setItem(book.title, isFavorite);
    }, [book.title, isFavorite]);

    const handleFavoriteClick = () => {
      setIsFavorite(!isFavorite);
    };
    
    return (
      <div>
        <FaHeart size="30px"
          onClick={handleFavoriteClick}
          style={{ color: isFavorite ? 'red' : 'grey' }}
        />
      </div>
    );
  };
  
  export default Favorite;
  