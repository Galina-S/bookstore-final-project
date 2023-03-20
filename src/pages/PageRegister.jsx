//import axios from "../../components/axios.jsx";
import axios from 'axios';
import { AppContext } from "../AppContext";
import React, { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineExclamationCircle } from  'react-icons/ai';
import {
  faInfoCircle,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { baseURL } from '../../components/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const PageRegister = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { navigate } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    matchPassword: "",
  });

  const [validMatch, setValidMatch] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

    useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/home");
      }, 4000);
    }
  }, [success]);

  useEffect(() => {
    const result = USER_REGEX.test(formData.username);
    console.log(result);
    console.log(formData);
    setValidName(result);
  }, [formData.username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(formData.password));
    //if matched password and password are the same
    setValidMatch(formData.password === formData.matchPassword);
  }, [formData.password, formData.matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [formData.username, formData.password, formData.matchPassword]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
   // if button enabled with JS hack
    const v1 = USER_REGEX.test(formData.username);
    const v2 = PWD_REGEX.test(formData.password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    
    try {
      const res = await axios.post(`${baseURL}/register`,  {
        ...formData,
      });
      console.log(res.data);
      setSuccess(true);
      setFormData( {username: "",
      email: "",
      password: "",
      matchPassword: ""})
 // handle error response
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Die E-Mail-Adresse bzw. Username ist leider schon vergeben. Bitte geben Sie eine andere E-Mail-Adresse oder Username an.");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  
   
    
        // errRef.current.focus();    
  };

  return (
    <div className="container">
      {success ? (
       
        <div>
          <h1>Die Registrierung war erfolgreich!</h1>
          <p>Sie werden jetzt auf die Homepage weitergeleitet.</p>

          <button
            type="button"
            className="link-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Hier geht es zur Anmeldung
          </button>
        </div>
      ) : (
        <div className="auth-form-container">
          <div className='errMsg-container'>
           <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              <AiOutlineExclamationCircle size={15} /> {errMsg}</p>
          </div>
          <h2>Willkommen bei BookShopify</h2>
          <p>
            Legen Sie sich hier unkompliziert ein Kundenkonto bei BookShopify
            an.
          </p>
          <br />

          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !formData.username ? "hide" : "invalid"}
              />
            </label>
            <input
             ref={userRef}
              required
              id="username"
              defaultValue={formData.username}
              type="text"
              name="username"
              aria-invalid={validName ? "false" : "true"}
              onChange={handleInputChange}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p
              id="uidnote"
              className={
                userFocus && formData.username && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              {/* 4 to 24 characters. <br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hypens allowed. */}
              4 bis 24 Zeichen.
              <br />
              Muss mit einem Buchstaben beginnen.
              <br />
              Buchstaben, Zahlen, Unterstriche, Bindestriche erlaubt.
            </p>

            <label htmlFor="email">Email:</label>
            <input
              required
              defaultValue={formData.email}
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
            />

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !formData.password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={formData.password}
              onChange={handleInputChange}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              {/* 8 to 24 characters.<br />
              Must include uppercase and lowercase letters, <br />
              a number and a special character.<br />
              Allowed special characters:  */}
              8 bis 24 Zeichen.
              <br />
              Muss Groß- und Kleinbuchstaben enthalten, <br />
              eine Zahl und ein Sonderzeichen.
              <br />
              Erlaubte Sonderzeichen:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="password">Confirm Password:</label>
            <input
              required
              type="password"
              name="matchPassword"
              id="confirm_pwd"
              defaultValue={formData.matchPassword}
              onChange={handleInputChange}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              {/* Must match the first password input field. */}
              Muss mit dem ersten Passwort-Eingabefeld übereinstimmen.
            </p>

            <button
              type="submit"
              className="btn-register"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Register
            </button>
          </form>
          <div className="login-link">
            <p>Haben Sie bereits ein Kundenkonto?</p>
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Hier anmelden.
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
