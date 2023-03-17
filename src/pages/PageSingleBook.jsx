import { useContext, useState, useEffect } from "react";
import FavoriteIcon from "../../components/FavoriteIcon";
import { AiFillEye, AiOutlineShoppingCart, AiOutlineArrowRight} from 'react-icons/ai';
import axios from 'axios';
import {baseURL} from '../../components/axios'
import {useParams} from 'react-router-dom'
import { AppContext } from "../AppContext";

import { Dialog, DialogContent, DialogTitle } from '@mui/material';


import ImageZoom from '../pages/ImageZoom';

export const PageSingleBook = ()  => {
  const [openDialog, setOpenDialog] = useState(false);

  const { id } = useParams();
  const [data, setData] = useState({});
      useEffect(() => {
        (async () => {
            axios
           .get(`${baseURL}/books/${id}`)
           .then(res => {  <img src={data.book?.img} alt={data.book?.title} height="150px"/>
           {/* <FavoriteIcon book={openBook} /> */}
            setData(res.data)
          })
          .catch((err)=>{
            console.error(err);
          })
        })()
    }, [id]);
    console.log(data);


    
 return (
      <div className="content">
        <div className="content-wrapper">
         <div className="medien-shadow-box">
            <ImageZoom src={data.book?.img}  alt={data.book?.title} height="200px" />
            {/* <img src={data.book?.img} alt={data.book?.title} height="200px"/> */}
            {/* <FavoriteIcon book={data.book} /> */}
          </div>
        
          <div className="artikel-informationen">
            <div className="title">
              <h1>{data.book?.title} </h1>
            </div>
            <div className="author">
               <p>{data.book?.author}</p>
            </div>
            
            <div className="price">
            <p>{data.book?.price && data.book.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} <span className="span">inkl. gesetzl. MwSt.</span></p> 
             
            </div>
            <div className="lieferbarkeit-versandkosten">
              <a className="element-link-standard versandkosten-link" href="#">Versandkostenfrei</a></div>
            <button className="element-button-primary">
              <span><AiOutlineShoppingCart /></span>
                In den Warenkorb</button>
        </div>
        </div>
         
        <div className="content-below-the-fold">
            <div className="inhalt-beschreibung">
            <h2>Beschreibung</h2>
                    <div className="description">
                        <p> {data.book?.description.substring(0, 200)+' ...'}</p>
                    </div>
                    <br/>
                    {/* <button interaction="zusatztexte-overlay-oeffnen" data-dialog="zusatztexte"> Weiterlesen</button> */}

                    <dialog className="element-overlay-slide-in" data-dialog-name="zusatztexte" open></dialog>
                    <div>
                     
                    <button className = "button-full-description"variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                      Weiterlesen <AiOutlineArrowRight />
                    </button>

                      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                      <DialogTitle><strong>Beschreibung</strong></DialogTitle>
                      <DialogContent>
                      <p style={{ 
                        fontSize: '12px', 
                        lineHeight: '1.5', 
                        textAlign: "justify"
                      }}>{data.book?.description}</p>
                      </DialogContent>
                    </Dialog>
                  </div>
                    
            </div> 
            <div className="details-default">
                   <h2>Details</h2>
                   <div className="publisher">
                    <p><span className="details-name">Verlag: </span>{data.book?.publisher}</p>
                  </div>
                  <div className="publicationDate">
                    <p><span className="details-name">Erscheinungsdatum: </span>
                      {data.book?.puplication 
                      && new Date(data.book.puplication).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric'})}
                    </p>
                    
                  </div>
                  <div className="category">
                    <p><span className="details-name">Genre: </span>{data.book?.category && data.book.category.join(', ')}</p>
                  </div>
                 
                  <div className="pages">
                    <p><span className="details-name">Seitenzahl: </span>{data.book?.pages}</p>
                  </div>
                  <div className="isbn">
                    <p><span className="details-name">ISBN: </span>{data.book?.ISBN}</p>
                  </div>
                <br />
                  <div className="views">
                  <p><AiFillEye />Ansichten: {data.book?.viewsCount}</p>
                  </div>                  
        </div>        
        </div>           
    </div>
  );
};
