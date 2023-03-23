import React, { useState, useEffect, useContext } from 'react';
import {  BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { AppContext } from "../src/AppContext";

const FavoriteIcon = ({ book }) => {
    const [isFavorite, setIsFavorite] = useState(false);
      const { currentUser, favorites, setFavorites } = useContext(AppContext);
  
      console.log(favorites)
    // useEffect(() => {
    //   const favorite = localStorage.getItem(book?.title);
    //   console.log("favorite", favorite)
    //   if ((favorite !== null)) {
    //     setIsFavorite(favorite === 'true');
    //   }
    // }, [book?.title]);

    // useEffect(() => {
    //   localStorage.setItem(book?.title, isFavorite);
    // }, [book?.title, isFavorite]);

    // const handleFavoriteClick = () => {
    //   setIsFavorite(!isFavorite);
    // };


        useEffect(() => {
      setIsFavorite(favorites.includes(book?._id));
    }, [favorites, book?._id]);
  
    const handleFavoriteClick = () => {
      if (isFavorite) {
        setFavorites(favorites.filter((id) => id !== book?._id));
      } else {
        setFavorites([...favorites, book?._id]);
      }
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
  
  export default FavoriteIcon;
  