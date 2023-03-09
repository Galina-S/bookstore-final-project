import React, { useState, useEffect } from 'react';
import {  BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';

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
      <div className='favorite-heart'>
        {isFavorite ? (
        <BsSuitHeartFill
          className="favorite-icon"
          onClick={handleFavoriteClick}
          style={{ color: 'green' }}
        />
      ) : (
        <BsSuitHeart
          className="favorite-icon"
          onClick={handleFavoriteClick}
          style={{ color: 'grey' }}
        />
      )}
      </div>
    );
  };
  
  export default Favorite;
  