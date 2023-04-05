import { useContext, useState, useEffect } from "react";
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { BACKEND_URL } from "./axios";
import { AppContext } from "../src/AppContext";
import axios from 'axios';
import { Modal } from "@mui/material";
import {AiFillCloseCircle} from 'react-icons/ai';

const FavoriteIcon = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser, favorites, setFavorites, setModalIsOpen, modalIsOpen} = useContext(AppContext);
  const userId = currentUser._id;


  useEffect(() => {
    const favorite = favorites.includes(book?._id);
    setIsFavorite(favorite);
  }, [book?._id, favorites]);

  const handleFavoriteClick = async () => {
    try {
      const isFavoriteBefore = favorites.includes(book._id); // check if the book is already in favorites
      const response = await fetch(`${BACKEND_URL}/users/${userId}/favorites/${book._id}`, {
        method: 'POST',
        credentials: 'include', // include cookies in the request
        body: JSON.stringify({ bookId: book._id })
      });
      const data = await response.json();
      // console.log('bookId', book._id);

      if (response.ok) {

        if (isFavoriteBefore) {
          // book was already in favorites, so we want to remove it
          const response = await axios.delete(`${BACKEND_URL}/users/${userId}/favorites/${book._id}`, { withCredentials: true });
          
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
                              else { 
                                alert('Du kannst als anonymer Benutzer nur bis zu 6 Lieblingsbücher speichern. Bitte logge dich ein, um mehr zu speichern.');
                                //setModalIsOpen(true)
                               }
             

       
        // console.log(data.message);
        
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    // Close modal message
    setModalIsOpen(false);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'  }} >
    <div  className="user-favorites">
      <Modal className="modal-container"  open = {modalIsOpen} style ={{width: '100%', backgroundColor: 'white', padding: '20px'}}>
      <div className="modal-content">
          <h2>Merkzettel ist leider zu voll</h2>
          <p>Um weitere Artikel auf den Merkzettel zu legen und alle Vorteile zu nutzen, loggen Sie sich ein oder legen Sie jetzt ein Konto an. </p>
          <AiFillCloseCircle onClick={closeModal} className="close-icon" /> 
          {/* <button onClick={closeModal}>Close</button> */}
        </div>
        </Modal>

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
  </div>
  );
};

export default FavoriteIcon;