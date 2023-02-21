import './App.css';
import { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Navigate} from "react-router-dom";

import { useContext } from 'react';
import { AppContext } from './AppContext';

import { PageBooks } from './pages/PageBooks';
import { PageHome } from './pages/PageHome';

import { PageRegister } from './pages/PageRegister'
import { PageLogin } from './pages/PageLogin'

//const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [currentUser, setCurrentUser]  = useState({
		email: '',
		password: '',
		name: '',
		accessGroups: [],
	});

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
        <nav>
          <NavLink to="/welcome">Welcome</NavLink>
          <NavLink to="/books">Bücher</NavLink>

          <NavLink to="/login">Anmelden</NavLink>
          <NavLink to="/register">Registrieren</NavLink>
          
          {/* {currentForm ==='login' 
              ? <PageLogin onFormSwitch = { toggleForm }/> 
              : <PageRegister onFormSwitch = { toggleForm} /> } */}
        
        </nav>
 
        <Routes>
          <Route path="/books" element={<PageBooks />}/>
          <Route path="/welcome" element={<PageHome/>}/>
          <Route path="/" element={<Navigate to="/welcome"/>}/>

          <Route path="/login" element={<PageLogin setCurrentUser={setCurrentUser}/>} />
          <Route path="/register" element= {<PageRegister setCurrentUser={setCurrentUser}/>}/>

{/* <Route path="/login" element={<PageLogin onFormSwitch = { toggleForm }/>}/>
<Route path="/register" element={<PageRegister onFormSwitch = { toggleForm} />}/> */}

        </Routes>
    </div>
  )
}

export default App
