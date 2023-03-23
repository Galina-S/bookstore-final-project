import { useState, useEffect } from "react";
import FavoriteIcon from "../../components/UserFavorites";
import {
  AiFillEye,
  AiOutlineShoppingCart,
  AiOutlineArrowRight,
} from "react-icons/ai";
import axios from "axios";
import { baseURL } from "../../components/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import ImageZoom from "../pages/ImageZoom";
import { AppContext } from "../AppContext";

export const PageSingleBook = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { id } = useParams();
  const [data, setData] = useState({});

  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      axios
        .get(`${baseURL}/books/${id}`)
        .then((res) => {
          (<img src={data.book?.img} alt={data.book?.title} height="150px" />),
            setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  }, [id]);
  console.log(data);

  function getItemQuantity(id) {
    return cart.find((item) => item._id === id)?.quantity || 0;
  }

  const quantity = getItemQuantity(data.book?._id);
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
            <a className="element-link-standard versandkosten-link" href="#">
              Versandkostenfrei
            </a>
          </div>
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
              <button onClick={() => addToCart(data.book)}>Add to Cart</button>
            )}
          </div>
        </div>
      </div>

      <div className="content-below-the-fold">
        <div className="inhalt-beschreibung">
          <h2>Beschreibung</h2>
          <div className="description">
            <p> {data.book?.description.substring(0, 200) + " ..."}</p>
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
    </div>
  );
};
