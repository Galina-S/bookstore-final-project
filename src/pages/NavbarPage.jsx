import { useState, useEffect, useRef } from "react";
import { AppContext } from "../AppContext";
import { useContext } from "react";

import { NavLink, Routes, Route, Navigate} from "react-router-dom";
import { PageBooks } from '../pages/PageBooks';
import { PageHome } from '../pages/PageHome';
import { PageRegister } from '../pages/PageRegister'
import { PageLogin } from '../pages/PageLogin'
import { NewBooksPage } from "./NewBooksPage";
import { Bestsellers } from "./BestsellersPage";
import { WishListPage } from "./WishListPage";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from  '@fortawesome/free-regular-svg-icons';
import { faBagShopping } from  '@fortawesome/free-solid-svg-icons';
import { faHeart } from  '@fortawesome/free-regular-svg-icons';




export const NavbarPage = () => {

    const {windowSize} = useContext(AppContext);

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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  let dropdownRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }; 
    document.addEventListener('mousedown', handler)
  })

  return (
    <div>
      <nav className="header-content">
        <div className="logo">
          <NavLink to="/home">LOGO</NavLink>
        </div>

        <div className="header-customer">
            <div className="dropdown" ref = {dropdownRef}>
              <button className="dropdown-trigger" onClick={() => {setDropdownOpen(!dropdownOpen)}}>
                  <FontAwesomeIcon className="account_icon" icon={faUser}/>
                  <span className = {`${windowSize < 600 ? 'none': null}`}>Mein Konto</span>
              </button>  
                  <div className={`auth  ${dropdownOpen ? 'active' : 'inactiv'}` }>
                    <div>
                      <PageLogin/>
                    </div>
                    {/** <div className="register">
                      <NavLink to="/register">Konto anlegen</NavLink>
                    </div> */}
                  </div>   
            </div>
            <NavLink to="/wish-list" className="wish-list">
                <FontAwesomeIcon className="wish-list-icon" icon={faHeart}/>
                <span className = {windowSize < 600 ? 'none': null}>Merkzettel</span>   
            </NavLink>
            <div to="/home" className="shopping-cart">
                <FontAwesomeIcon className="shopping-cart-icon" icon={faBagShopping}/>
                <span className = {windowSize < 600 ? 'none' : null} >Warenkorb</span>   
            </div>  
        </div>
      </nav>

      <nav className="navbar">
        <div className="navigation">
          <NavLink to="/books">Bücher</NavLink>
          <NavLink to="/new-books">Neuheiten</NavLink>
          <NavLink to="/bestsellers">Bestseller</NavLink>
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
        <Route path="/wish-list" element={<WishListPage />} />


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
