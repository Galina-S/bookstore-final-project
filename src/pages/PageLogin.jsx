import React, {useState} from 'react';


export const PageLogin = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    	return (
        <div className='container'>
        <div className='auth-form-container'>
            <h2>Ich bin bereits Kunde</h2>
            <br></br>
		<form onSubmit={handleSubmit} className='login-form'>
            <label htmlFor="email">E-Mail-Adresse</label>
            <input value = {email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="user@gmail.com" id="email" name="email"/>

            <label htmlFor="password">Passwort</label>
            <input value = {pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder="******" id="password" name="password"/>

            <button className='btn-login' type="submit">Anmelden</button>
        </form>

        <button className='link-btn' onClick ={() => props.onFormSwitch('register')}>Noch kein Konto? Hier Konto anlegen.</button>
        </div>
        </div>
	)
}