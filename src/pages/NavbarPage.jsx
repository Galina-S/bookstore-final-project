import { useState } from "react";

import { NavLink, Routes, Route, Navigate} from "react-router-dom";
import { PageBooks } from '../pages/PageBooks';
import { PageHome } from '../pages/PageHome';
import { PageRegister } from '../pages/PageRegister'
import { PageLogin } from '../pages/PageLogin'
import { NewBooksPage } from "./NewBooksPage";
import { Bestsellers } from "./BestsellersPage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from  '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from  '@fortawesome/free-solid-svg-icons';
import { faHeart } from  '@fortawesome/free-regular-svg-icons';




export const NavbarPage = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    name: "",
    accessGroups: [],
  });

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };


  return (
    <div>
      <nav className="header-content">
        <div className="logo">
          <NavLink to="/home">LOGO</NavLink>
        </div>

        <div className="header-customer">
            <NavLink to="/home" className="account">
                <FontAwesomeIcon className="account_icon" icon={faUser}/>
                <span>Mein Konto</span>   
            </NavLink>   
            <NavLink to="/home" className="wish-list">
                <FontAwesomeIcon className="wish-list-icon" icon={faHeart}/>
                <span>Merkzettel</span>   
            </NavLink>
            <NavLink to="/home" className="shopping-cart">
                <FontAwesomeIcon className="shopping-cart-icon" icon={faCartShopping}/>
                <span>Warenkorb</span>   
            </NavLink>  
        </div>

        

      </nav>

      <nav className="navbar">
        <div className="navigation">
          <NavLink to="/books">Bücher</NavLink>
          <NavLink to="/new-books">Neuheiten</NavLink>
          <NavLink to="/bestsellers">Bestseller</NavLink>
        </div>

        <div className="auth">
          <NavLink to="/login">Anmelden</NavLink>
          <NavLink to="/register">Registrieren</NavLink>
        </div>
        {/* {currentForm ==='login' 
              ? <PageLogin onFormSwitch = { toggleForm }/> 
              : <PageRegister onFormSwitch = { toggleForm} /> } */}

      </nav>

      <Routes>
        <Route path="/books" element={<PageBooks />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/new-books" element={<NewBooksPage/>} />
        <Route path="/bestsellers" element={<Bestsellers />} />

        


        <Route
          path="/login"
          element={<PageLogin setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/register"
          element={<PageRegister setCurrentUser={setCurrentUser} />}
        />

        {/* <Route path="/login" element={<PageLogin onFormSwitch = { toggleForm }/>}/>
<Route path="/register" element={<PageRegister onFormSwitch = { toggleForm} />}/> */}
      </Routes>
    </div>
  );
};
