import React, { useRef, useContext, useEffect, useState} from 'react';
import { AppContext } from '../AppContext';
import { AiOutlineExclamationCircle } from  'react-icons/ai';
import axios from 'axios';
import { baseURL } from '../../components/axios';

export const PageLogin = () => {
  const {
    loginForm,
    changeLoginFormField,
    submitLoginForm,
    clearLoginForm,
    dropdownOpen,
    setDropdownOpen,
    currentUser, navigate,
    setFavorites,
  } = useContext(AppContext);
  const passwordRef = useRef();


  const [isLoading, setIsLoading] = useState(true);

  const userId  = currentUser._id;
  const onBadLogin = () => {
    if (passwordRef.current !== null) {
      passwordRef.current.focus();
    }
  };

  const submitLoginFormWrapper = () => {
		submitLoginForm(onBadLogin);
	};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitLoginForm(onBadLogin);
      setDropdownOpen(!dropdownOpen);
    }
  };

  useEffect(() => {
    clearLoginForm();
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await axios.get(`${baseURL}/users/${userId}/favorites`);
        setFavorites(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    // Fetch favorites when the component mounts
    fetchFavorites();
  }, [userId]);

  return (
    <div className="container">
      <div className="auth-form-container">
        <h2>Ich bin bereits Kunde</h2>
        <br></br>
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => changeLoginFormField("username", e.target.value)}
            value={loginForm.fields.username}
            onKeyDown={(e) => handleKeyDown(e)}
            autoFocus
            type="text"
          />

          <label htmlFor="password">Passwort</label>
          <input
            ref={passwordRef}
            onChange={(e) => changeLoginFormField("password", e.target.value)}
            value={loginForm.fields.password}
            onKeyDown={(e) => handleKeyDown(e)}
            type="password"
          />
          <div className='signin-container'>
            <div className="message">
              
              <p className={loginForm.message ? "message" : "offscreen"} aria-live="assertive">
              <AiOutlineExclamationCircle size={15} /> {loginForm.message}</p></div>
            <button
              className="btn-login"
              disabled={!loginForm.fields.username || !loginForm.fields.password  ? true : false}
              type="button"
              onClick={() => {submitLoginFormWrapper()
              currentUser ? setDropdownOpen(!dropdownOpen)
              : null; 
              
              (loginForm.message.isEmpty) ? null:  setDropdownOpen(dropdownOpen)
              }}>
              {" "}
              Anmelden
            </button>
            <div className="register-link">
              <p>Noch kein Konto? </p>
              <button type= "button" className='link-btn' onClick ={() => {navigate('/register'); 
              (dropdownOpen=="true")
                ?
              setDropdownOpen(!dropdownOpen) 
              :setDropdownOpen(false) }
              }>Hier registrieren.</button>
           
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


