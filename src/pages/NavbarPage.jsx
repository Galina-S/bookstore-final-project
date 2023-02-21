import { useState } from "react";

import { NavLink, Routes, Route, Navigate} from "react-router-dom";
import { PageBooks } from '../pages/PageBooks';
import { PageHome } from '../pages/PageHome';
import { PageRegister } from '../pages/PageRegister'
import { PageLogin } from '../pages/PageLogin'


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
      <nav className="navbar1">
        <div className="logo">
          <NavLink to="/home">LOGO</NavLink>
        </div>

        <div className="auth">
          <NavLink to="/login">Anmelden</NavLink>
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
