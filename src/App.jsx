import './App.scss';
//import './App.css';


import { NavbarPage } from './pages/NavbarPage';
import { useContext } from 'react';
import { AppContext } from './AppContext';

//const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
 const { currentUser } = useContext(AppContext);

  return (
    <div className="App"> 
      <NavbarPage/>
    </div>
  )
}

export default App
