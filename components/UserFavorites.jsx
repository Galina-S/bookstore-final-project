import { useContext, useState, useEffect } from "react";
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { baseURL } from "./axios";
import { AppContext } from "../src/AppContext";
import axios from 'axios';

import { Button, Modal } from "@mui/material";

const FavoriteIcon = ({ book }) => {
  
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser, favorites, setFavorites } = useContext(AppContext);
  const userId = currentUser._id;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const favorite = favorites.includes(book?._id);
    setIsFavorite(favorite);
  }, [book?._id, favorites]);


  const handleOpen = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

        } else {
          // if ((favorites.length < 6) && (currentUser.username === "anonymousUser") ){
          //   // book was not in favorites, so we want to add it
          //   setFavorites([...favorites, book._id]);
          //   setIsFavorite(true);
                    
          //           } 
          //           else { 
          //                 // <Button onClick={() => handleOpen('You can only save up to 6 favorite books as an anonymous user. Please log in to save more.')}>Show Alert</Button>
          //                 // <Modal open={open} onClose={handleClose}>
          //                 // <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#f44336', color: '#fff', padding: '10px' }}>
          //                 //   {message}
          //                 // </div>
          //                 // </Modal>
          //             alert('You can only save up to 6 favorite books as an anonymous user. Please log in to save more.');
          //           // redirect the user to the login page or show a login modal here
          //         }

                  if ((currentUser.username!=="anonymousUser") ){
                    // book was not in favorites, so we want to add it
                    setFavorites([...favorites, book._id]);
                    setIsFavorite(true);
                            
                            } 

                            else if ((currentUser.username === "anonymousUser") && (favorites.length < 6)) {
                              setFavorites([...favorites, book._id]);
                              setIsFavorite(true);
                            }
                              else { alert('You can only save up to 6 favorite books as an anonymous user. Please log in to save more.'); }
                            



                
                   
    }
       
        console.log(data.message);
        
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
  
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
  </>
    
  );
};

export default FavoriteIcon;