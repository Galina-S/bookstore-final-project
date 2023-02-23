import { useState, useContext } from "react";
import { NavLink, Routes, Route, Navigate} from "react-router-dom";
import { PageBooks } from '../pages/PageBooks';
import { PageHome } from '../pages/PageHome';
import { PageRegister } from '../pages/PageRegister'
import { PageLogin } from '../pages/PageLogin'
import { PageLogout } from "./PageLogout";
import { AppContext } from "../AppContext";


export const NavbarPage = () => {
  // const [currentUser, setCurrentUser] = useState({
  //   email: "",
  //   password: "",
  //   username: "",
  // });

 const {currentUser} = useContext(AppContext)

  return (
    <div>
      <nav className="navbar1">
        <div className="logo">
          <NavLink to="/home">LOGO</NavLink>
        </div>

        <div className="auth">
        
          

        
        
          {currentUser.username==="anonymousUser" ? 
          (  <NavLink to="/login">Anmelden</NavLink>
          )
          :( <NavLink to="/logout">Logout </NavLink>)}
         <NavLink to="/register">Registrieren</NavLink>
        </div>

        {/* {currentForm ==='login' 
              ? <PageLogin onFormSwitch = { toggleForm }/> 
              : <PageRegister onFormSwitch = { toggleForm} /> } */}
      </nav>

      <nav className="navbar2">
        <NavLink to="/books">Bücher</NavLink>
      </nav>

      <Routes>
        <Route path="/books" element={<PageBooks />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/" element={<Navigate to="/home" />} />     
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
