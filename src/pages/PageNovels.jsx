import { useState, useEffect } from "react";
import instance from "../../components/axios";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "../../components/FavoriteIcon";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageNovels = () => {
  const [novels, setNovels] = useState([]);

  const {openSingleBook} =
    useContext(AppContext);

  useEffect(() => {
    const fetchNovels = async () => {
      const response = await instance.get("/novels");
      setNovels(response.data);
    };
    fetchNovels();
  }, []);

  console.log(`${novels.length} Books`, novels);
  return (
    <div>
      <h1>Novels</h1>
      <h1>There are {novels.length} Books</h1>

      <div className="novels-page ul">
        {novels.map((book) => (
          <div className="li" key={book._id}>
            <div className="card-container" >
              <div className="card">
                <NavLink
                  to={`/books/${book._id}`}
                  onClick={() => openSingleBook()}
                >
                  <div className="image">
                    <img src={book.img} alt={book.title} height="150px" />
                  </div>
                </NavLink>
                <div className="artikel-details">
                  <h6>{book.author}</h6>
                  <h5>{book.title}</h5>
                  <h4>{book.price} € </h4>
                </div>
                <FavoriteIcon book={book} className="favorite-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
