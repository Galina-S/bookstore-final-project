import { useContext } from "react";
import { AppContext } from "../AppContext";
import { NavLink, Routes, Route, Navigate} from "react-router-dom";
import { PageBooks } from '../pages/PageBooks';
import { PageHome } from '../pages/PageHome';
import { PageRegister } from '../pages/PageRegister'
import { PageLogin } from '../pages/PageLogin'
import { PageLogout } from "./PageLogout";
import { NewBooksPage } from "./NewBooksPage";
import { Bestsellers } from "./BestsellersPage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from  '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from  '@fortawesome/free-solid-svg-icons';
import { faHeart } from  '@fortawesome/free-regular-svg-icons';

export const NavbarPage = () => {
  const {currentUser, dropdownOpen, setDropdownOpen} = useContext(AppContext)
  const {windowSize} = useContext(AppContext)
   let dropdownRef = useRef()

  return (
    <div>
      <nav className="header-content">
        <div className="logo">
          <NavLink to="/home">LOGO</NavLink>
        </div>
        <div className="header-customer">
            <div className="dropdown" ref = {dropdownRef}>
              <div className="dropdown-trigger" onClick={() => {setDropdownOpen(!dropdownOpen)}}>
                  <FontAwesomeIcon className="account_icon" icon={faUser}/>
                  {currentUser ?
                   <span className = {`${windowSize < 600 ? 'none': null}`}>{currentUser.username}</span> 
                   :
                   <span className = {`${windowSize < 600 ? 'none': null}`}>Mein Konto</span>
                   }
              </div>
                  <div className={`auth  ${dropdownOpen ? 'active' : 'inactiv'}` }>
                    <div>
                      <PageLogin/>                      
                    </div>
                    <div className="register-copy">


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
                <FontAwesomeIcon className="shopping-cart-icon" icon={faCartShopping}/>
                <span className = {windowSize < 600 ? 'none' : null} >Warenkorb</span>
            </div>
            </div>
        </nav>

      <nav className="navbar">
        <div className="navigation">
          <NavLink to="/books">Bücher</NavLink>
          <NavLink to="/new-books">Neuheiten</NavLink>
          <NavLink to="/bestsellers">Bestseller</NavLink>
          <NavLink to="/register">Registrieren</NavLink>
          {currentUser.username==="anonymousUser" ? 
          (  null
          )
          :( <NavLink to="/logout">Logout </NavLink>)}
       
        </div>       
      </nav>

      <Routes>
        <Route path="/books" element={<PageBooks />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/" element={<Navigate to="/home" />} />     
        <Route path="/new-books" element={<NewBooksPage/>} />
        <Route path="/bestsellers" element={<Bestsellers />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/login" element={<PageLogin />} />      
        <Route path="logout" element= {<PageLogout />} />
      </Routes>
    </div>
  );
};