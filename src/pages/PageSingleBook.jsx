import { useState, useEffect } from "react";
import FavoriteIcon from "../../components/UserFavorites";
import CreateComment from "./CreateComment";
import { AiFillEye, AiOutlineArrowRight } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { baseURL } from "../../components/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import ImageZoom from "../pages/ImageZoom";
import { AppContext } from "../AppContext";

export const PageSingleBook = (props) => {
  
  const [openDialog, setOpenDialog] = useState(false);
  const [comments, setComments] = useState([]);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState(null);


  const { id } = useParams();
  const [data, setData] = useState({});

  const { loadComments, cart, addToCart, removeFromCart, increaseQty, decreaseQty, currentUser,handleAddCommentForm 
    } =
    useContext(AppContext); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${baseURL}/books/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();

    if (newComment) {
      setComments([...comments, newComment]);
    }
  }, [id]);



  useEffect(() => {
    loadComments(id);
  }, [id]);



 useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseURL}/books/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [id]);

  const quantity = getItemQuantity(data.book?._id);
  
  

  function getItemQuantity(id) {
    return cart.find((item) => item._id === id)?.quantity || 0;
  }


  async function deleteComment(commentId) {
    const userId = id
    
    try {
      await fetch(`${baseURL}/books/${userId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      // Refresh the comments after deleting
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="content">
      <div className="content-wrapper">
        <div className="medien-shadow-box">
          <div className="image-container">
            <ImageZoom
              src={data.book?.img}
              alt={data.book?.title}
              height="200px"
            />
            <FavoriteIcon
              book={data.book}
              className="favorite-icon-single-book"
            />
          </div>
        </div>
        <div className="artikel-informationen">
          <div className="title">
            <h1>{data.book?.title} </h1>
          </div>
          <div className="author">
            <Link to={`/authors/${data.book?.author}`}>
              <p>{data.book?.author}</p>
            </Link>
          </div>

          <div className="price">
            <p>
              {data.book?.price &&
                data.book.price.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}{" "}
              <span className="span">inkl. gesetzl. MwSt.</span>
            </p>
          </div>
          <div className="lieferbarkeit-versandkosten">
            <Link className="element-link-standard versandkosten-link" to='/shop/hilfe-versand'>
                Versandkostenfrei
            </Link>
          </div><br/>
          <div>
            {cart.some((p) => p._id === data.book?._id) ? (
              <div>
                <div>
                  <button onClick={() => decreaseQty(data.book)}>-</button>
                  <div>
                    <span>{quantity}</span> in cart
                  </div>
                  <button onClick={() => increaseQty(data.book)}>+</button>
                </div>
                <button onClick={() => removeFromCart(data.book)}>
                  Remove
                </button>
              </div>
            ) : (
              <button className ="btn" onClick={() => addToCart(data.book)}>Add to Cart</button>
            )}
          </div>
          <div>

          </div>
        </div>
      </div>

      <div className="content-below-the-fold">
        <div className="inhalt-beschreibung">
          <h2>Beschreibung</h2>
          <div className="description">
            <p> {data.book?.description.substring(0, 200) + " setShowCommentForm..."}</p>
          </div>
          <br />
          {/* <button interaction="zusatztexte-overlay-oeffnen" data-dialog="zusatztexte"> Weiterlesen</button> */}

          <dialog
            className="element-overlay-slide-in"
            data-dialog-name="zusatztexte"
            open
          ></dialog>
          <div>
            <button
              className="button-full-description"
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Weiterlesen
              <AiOutlineArrowRight />
            </button>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>
                <strong>Beschreibung</strong>
              </DialogTitle>
              <DialogContent>
                <p
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.5",
                    textAlign: "justify",
                  }}
                >
                  {data.book?.description}
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="details-default">
          <h2>Details</h2>
          <div className="publisher">
            <p>
              <span className="details-name">Verlag: </span>
              {data.book?.publisher}
            </p>
          </div>
          <div className="publicationDate">
            <p>
              <span className="details-name">Erscheinungsdatum: </span>
              {data.book?.puplication &&
                new Date(data.book.puplication).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
            </p>
          </div>
          <div className="category">
            <p>
              <span className="details-name">Genre: </span>
              {data.book?.category && data.book.category.join(", ")}
            </p>
          </div>

          <div className="pages">
            <p>
              <span className="details-name">Seitenzahl: </span>
              {data.book?.pages}
            </p>
          </div>
          <div className="isbn">
            <p>
              <span className="details-name">ISBN: </span>
              {data.book?.ISBN}
            </p>
          </div>
          <br />
          <div className="views">
            <p>
              <AiFillEye /> Ansichten: {data.book?.viewsCount}
            </p>
          </div>
        </div>
      </div>

      <div className="comments"><div className="comments-wrapper">
      <h2>Bewertungen</h2>
      <p>({comments.length} Bewertungen)</p>

        {comments.map(comment => (
        <div key={comment.commentId} className="single-comment">
          
          <h4>{comment.title}</h4>
            {/* Vom {comment.username}  */}
          <div className="delete-comment">
              <p> Bewertet  am: {comment?.dateCreated                      
              && new Date(comment.dateCreated).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric'})}</p>

              {currentUser && currentUser._id === comment.userId && (
              <button  onClick={() => {
                if (
                  window.confirm(
                    "Sind Sie sicher, dass Sie dieses Kommentar entfernen möchten?"
                  )
                ) {
                  deleteComment(comment._id);
                }
              }} ><BsFillTrashFill /> Kommentar entfernen</button>
              )}
          </div>

          <p>{comment.content}</p>
          
          {/* <p>Geändert am: {comment.dateModified}</p> */}
        
        </div>
      ))}
     
      <br/>
        <button onClick={() => setShowCommentForm(!showCommentForm)} className="btn">Eigene Bewertung verfassen</button>

         {showCommentForm && <CreateComment bookId={id} handleAddCommentForm={handleAddCommentForm} />}
            
    </div>
    </div>
    </div>
  );
};
