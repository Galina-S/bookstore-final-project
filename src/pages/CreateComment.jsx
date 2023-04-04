import { useContext, useState, useEffect } from "react";
import { baseURL } from "../../components/axios";
import { AppContext } from "../AppContext";
import React from "react";
import axios from "axios";

export const CreateComment = ({ bookId, handleAddCommentForm}) => {
const  { currentUser, loadComments } = useContext(AppContext);

const [submitted, setSubmitted] = useState(false); // add submitted state
const [showCommentForm, setShowCommentForm] = useState(true);

const BACKEND_URL= 'https://elegant-rose-outerwear.cyclic.app';

const [formData, setFormData] = useState({
    commentId: Date.now().toString(),
    userId: currentUser._id,
    bookId: bookId,
    title: "",
    content: "",
    dateCreated: new Date(),
    dateModified: new Date()
  });

  const [newComment, setNewComment] = useState(null);
  const [data, setData] = useState({});
  
    async function handleSubmit(event) {
        event.preventDefault();

        try {
        const response = await fetch(`${BACKEND_URL}/books/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      window.location.reload();
     

      setFormData({
        commentId: Date.now().toString(),
        userId: currentUser._id,
        bookId: bookId,
        title: "",
        content: "",
        dateCreated: new Date(),
        dateModified: new Date(),
      });
    

      setSubmitted(true); // set submitted to true after submitting the form
      setShowCommentForm(false);


      // fetch the updated comment data from the server and display it
    const commentResponse = await fetch(`${BACKEND_URL}/books/${bookId}/comments/${data.commentId}`);
    const commentData = await commentResponse.json();
    handleAddCommentForm(commentData);

    } catch (error) {
      console.error(error);
    }
    
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
}


useEffect(() => {
  const fetchBook = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/books/${bookId}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchBook();

  if (newComment) {
    setComments([...comments, newComment]);
  }
}, [bookId]);



useEffect(() => {
  loadComments(bookId);
}, [bookId]);


  return (
        <div className="createComment">
            <br></br>
            
            {showCommentForm && (
            <form onSubmit={handleSubmit}>
            <h3>Wie hat Ihnen der Artikel gefallen?</h3>
            <div>
                <div className="row">
                    <div>
                        <input
                        required
                        name="title"
                        value={formData.title}
                       // defaultValue={formData.title}
                        type="text"
                        maxLength={100}
                        onChange={handleChange}
                        placeholder="Titel Ihrer Bewertung*"
                        />
                    </div>
                </div>
                <div className="row">
                    <div>
                        <textarea
                        required
                        name="content"
                        value={formData.content}
                        rows={5}
                        minLength={10}
                        maxLength={6000}
                        onChange={handleChange}
                        placeholder="Ihr Bewertungstext*"
                        />
                    </div>
                  <p>Mindestens 10, höchstens 6000 Zeichen</p>
                  <p>*Pflichtfelder</p>
                  <button type="submit" className="btn" >Bewertung speichern</button>
                </div>
            </div>
           
            </form>
            
         )}
        {submitted && (<h3>Vielen Dank für Ihre Bewertung!</h3>)} 
        </div>
    )
}

export default CreateComment;