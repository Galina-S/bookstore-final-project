import './App.css';
import { NavLink, Routes, Route, Navigate} from "react-router-dom";

import { PageBooks } from './pages/PageBooks';
import { PageHome } from './pages/PageHome';


function App() {
  

  return (
    <div className="App">
        <nav>
          <NavLink to="/welcome">Welcome</NavLink>
          <NavLink to="/books">Books</NavLink>
        </nav>

        <Routes>
          <Route path="/books" element={<PageBooks />}/>
          <Route path="/welcome" element={<PageHome/>}/>
          <Route path="/" element={<Navigate to="/welcome"/>}/>


        </Routes>
    </div>
  )
}

export default App
