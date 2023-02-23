import React, {useState, useRef, useContext, useEffect} from 'react';
import { AppContext } from '../AppContext';
export const PageLogin = () => {
const { loginForm, changeLoginFormField, submitLoginForm, clearLoginForm  } = useContext(AppContext);
const passwordRef = useRef()
const onBadLogin = () => {
  if (passwordRef.current !== null) {
    passwordRef.current.focus();
  }
};
const submitLoginFormWrapper = () => {
  submitLoginForm(onBadLogin);
};
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    submitLoginForm(onBadLogin);
  }
};
useEffect(() => {
  clearLoginForm();
}, []);
    return (
      <div className='container'>
      <div className='auth-form-container'>
          <h2>Ich bin bereits Kunde</h2>
          <br></br>
          <form className='login-form'>
              <label htmlFor="username">Username</label>
              <input onChange={(e) =>
                changeLoginFormField(
                  'username',
                  e.target.value
                )
              }
              value={loginForm.fields.username}
              onKeyDown={(e) => handleKeyDown(e)}
              autoFocus type="text" />
          <label htmlFor="password">Passwort</label>
          <input ref={passwordRef}
              onChange={(e) =>
                changeLoginFormField(
                  'password',
                  e.target.value
                )
              }
              value={loginForm.fields.password}
              onKeyDown={(e) => handleKeyDown(e)}
              type="password"/>
        <div>
        <div className="message">{loginForm.message}</div>
        <button className='btn-login' type="button" onClick={() => submitLoginFormWrapper()}> Anmelden</button>
        </div>
      </form>
      <div>
      <button type= "button" className='link-btn' onClick ={() => (null)}>Noch kein Konto? Hier Konto anlegen.</button>
      </div>
      </div>
      </div>
)
}