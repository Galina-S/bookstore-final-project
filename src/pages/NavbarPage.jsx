import { useEffect, useRef, useContext } from "react";
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
  const {currentUser} = useContext(AppContext)
  const {windowSize} = useContext(AppContext)

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

         {currentUser.username==="anonymousUser" ? 
          (  <NavLink to="/login">Anmelden</NavLink>
          )
          :( <NavLink to="/logout">Logout </NavLink>)}
         <NavLink to="/register">Registrieren</NavLink>

        <div className="header-customer">
            <div className="dropdown" ref = {dropdownRef}>
              <div className="dropdown-trigger"  onClick={() => {setDropdownOpen(!dropdownOpen)}}>
                  <FontAwesomeIcon className="account_icon" icon={faUser}/>
                  <span className = {`${windowSize < 600 ? 'none': null}`}>Mein Konto</span>
              </div>  
                  <div className={`auth  ${dropdownOpen ? 'active' : 'inactiv'}` }>
                    <div>
                      <PageLogin/>
                    </div>
                    {/** <div className="register">
                      <NavLink to="/register">Konto anlegen</NavLink>
                    </div> */}
                  </div>   
            </div>
            <div to="/home" className="wish-list">
                <FontAwesomeIcon className="wish-list-icon" icon={faHeart}/>
                <span className = {windowSize < 600 ? 'none': null}>Merkzettel</span>   
            </div>
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
        </div>
      </nav>

      <Routes>
        <Route path="/books" element={<PageBooks />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/" element={<Navigate to="/home" />} />     
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/new-books" element={<NewBooksPage/>} />
        <Route path="/bestsellers" element={<Bestsellers />} />

        <Route
          path="/register" element={<PageRegister />}
        />
        <Route path="/login" element={<PageLogin />}
          />      
        <Route path="logout" element= {<PageLogout />} />
      </Routes>
    </div>
  );
};
