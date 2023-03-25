import { useContext, useState, useEffect } from "react";
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { baseURL } from "./axios";
import { AppContext } from "../src/AppContext";
import axios from 'axios';

const FavoriteIcon = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser, favorites, setFavorites} = useContext(AppContext);
  const userId = currentUser._id;

  useEffect(() => {
    const favorite = favorites.includes(book?._id);
    setIsFavorite(favorite);
  }, [book?._id, favorites]);

  const handleFavoriteClick = async () => {
    try {
      const isFavoriteBefore = favorites.includes(book._id); // check if the book is already in favorites
      const response = await fetch(`${baseURL}/users/${userId}/favorites/${book._id}`, {
        method: 'POST',
        credentials: 'include', // include cookies in the request
        body: JSON.stringify({ bookId: book._id })
      });
      const data = await response.json();

      console.log('bookId', book._id);


      if (response.ok) {


        if (isFavoriteBefore) {
          // book was already in favorites, so we want to remove it
          const response = await axios.delete(`${baseURL}/users/${userId}/favorites/${book._id}`, { withCredentials: true });
          
          setFavorites(favorites.filter((id) => id !== book._id));
          setIsFavorite(false);

        } else if ((currentUser.username!=="anonymousUser") ){
                    // book was not in favorites, so we want to add it
                    setFavorites([...favorites, book._id]);
                    setIsFavorite(true);
                            
                            } 

                            else if ((currentUser.username === "anonymousUser") && (favorites.length < 6)) {
                              setFavorites([...favorites, book._id]);
                              setIsFavorite(true);
                            }
                              else { alert('You can only save up to 6 favorite books as an anonymous user. Please log in to save more.'); }
             

       
        // console.log(data.message);
        
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
  
  </div>
    
  );
};

export default FavoriteIcon;