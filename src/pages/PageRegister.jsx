import React, {useState} from 'react';

export const PageRegister = (props) => {
	const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

	return (
		<div className='container'>
		<div className='auth-form-container'>
			 <h2>Registrieren</h2>
			 <br></br>
		<form onSubmit={handleSubmit} className='register-form'>

			<label htmlFor="name">Username:</label>
			<input value={name} onChange={(e)=> setEmail(e.target.value)} type="text" name="name" id="name" ></input>
            
			<label htmlFor="email">E-Mail-Adresse</label>
            <input value = {email} onChange={(e)=> setEmail(e.target.value)} type="email" id="email" name="email"/>

            <label htmlFor="password">Passwort</label>
            <input value = {pass} onChange={(e)=> setPass(e.target.value)} type="password" id="password" name="password"/>

            <button className='btn-register' type="submit">Kundenkonto anlegen</button>
        </form>

        <button className='link-btn' onClick ={() => props.onFormSwitch('login')}>Bereits ein Konto? Hier anmelden.</button>
        </div>
		</div>
	)
}