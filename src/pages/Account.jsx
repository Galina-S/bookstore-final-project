import { useState, useEffect} from "react";
import instance from "../../components/axios";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "../../components/UserFavorites";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import axios from 'axios';
import {  AiOutlineMail, AiOutlinePicture, AiOutlinePlus, AiOutlineMinus  } from 'react-icons/ai';
import { baseURL } from "../../components/axios";

export const Account = ({ userId }) => {
    const { currentUser, setCurrentUser, getCurrentUser } =  useContext(AppContext);

    const [newEmail, setNewEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editImg, setEditImg] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = currentUser._id
        try {
            // Make the API call to update the email
            const response = await instance.put(`/users/${userId}/email`, { email: newEmail });
      
            // Check for success response
            if (response.status === 200) {
              setSuccessMessage("Email updated successfully!");

               // Update the state of currentUser with the new email
            const updatedUser = { ...currentUser, email: newEmail };
            setCurrentUser(updatedUser);


            } else {
              setErrorMessage("An error occurred while updating the email. Please try again.");
            }
          } catch (error) {
            setErrorMessage("An error occurred while updating the email. Please try again.");
          }

    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
      };

      const [selectedFile, setSelectedFile] = useState(null);
      const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
          return;
        }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const base64Image = reader.result.split(',')[1];
        
        // setCurrentUser({ ...currentUser});
        // console.log(currentUser._id)
      try {
        const response = await instance.put(`/users/${currentUser._id}/profile-image`, { imageData: base64Image });

        // Update the img field in the currentUser state

        const updatedUser = { ...currentUser, img: base64Image};
        setCurrentUser(updatedUser);

        // console.log(currentUser);
        // console.log(response.data);

      
      } catch (error) {
        console.log(error);
      }
    };
  };

     
  return (
    <div className="mainPage">
    {currentUser.username!=="anonymousUser" &&
    <div className="account-overview">
        <div style= {{padding:'0', margin: '0'}}> 
            <h2> Mein Konto</h2>
            <p>Kundennummer {currentUser._id}</p>
            <h3>Zugangsdaten</h3>
            <p style={{borderBottom:'2px solid lightgray', paddingBottom: '20px'}}>Hier können Sie Ihre E-Mail-Adresse und Profilebild ändern.</p>
        </div>
   
    <div className="email-part" >
        <div style= {{padding: '10px', backgroundColor: 'lightgray',  marginRight: '10px', borderRadius:'8px'}}><AiOutlineMail className="email"/></div>
        <div style ={{ lineHeight: '0.9em', alignItems:'left'}}>
            <p>E-Mail-Adresse ändern</p>
            <p className="current-email">{currentUser.email}</p>
        </div>
        <button onClick={() => setEditMode(!editMode)} className ="button-plus ">
            
        {editMode ? <AiOutlineMinus className="minus minus-btn"/> : <AiOutlinePlus className="plus-btn plus"/>}
        </button>
    </div>
        
    {editMode && (
    <form className="editForm" onSubmit={handleSubmit} >
       
          <div className="email-change-form">
                  <input
                  required
                  name="email"
                  type="email"
                  maxLength={30}
                  placeholder="Neue E-Mail-Adresse"
                  onChange={handleEmailChange}
                />
          </div>
        
          <button type="submit" className="button-email-save btn">E-Mail-Adresse speichern</button>
          {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    )}
  



    <div className="avatar-part" >
        <div style= {{padding: '10px', backgroundColor: 'lightgray', marginRight: '10px', borderRadius:'8px'}}><AiOutlinePicture className="picture" /></div>
        <div style= {{display:'flex', justifyContent:'center', alignItems: 'center'}}>
            <p style= {{justifyContent:'center', alignItems: 'center'}}>Profilebild hochladen</p>
        </div>
        <button onClick={() => setEditImg(!editImg)} className ="button-plus"> 
         {editImg ? <AiOutlineMinus className="minus minus-btn"/> : <AiOutlinePlus className="plus plus-btn"/>}
        </button>
    </div>

    {editImg && (
    <form onSubmit={handleFormSubmit} className="form-img-upload">
      <input className ="" type="file" onChange={handleFileInputChange} />
      <button type="submit" className="btn"> Hochladen </button>
    </form>
    )}
</div>
    }
   

   </div>
  );

};
 