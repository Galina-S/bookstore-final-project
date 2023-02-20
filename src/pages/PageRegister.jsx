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
			 <h2>Register</h2>
		<form onSubmit={handleSubmit} className='register-form'>

			<label htmlFor="name">Fullname:</label>
			<input value={name} onChange={(e)=> setEmail(e.target.value)} type="text" name="name" id="name" placeholder="Full Name"></input>
            
			<label htmlFor="email">Email:</label>
            <input value = {email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="user@gmail.com" id="email" name="email"/>

            <label htmlFor="password">Password:</label>
            <input value = {pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder="******" id="password" name="password"/>

            <button className='btn-register' type="submit">Register</button>
        </form>

        <button className='link-btn' onClick ={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
		</div>
	)
}