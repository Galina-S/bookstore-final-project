import React, {useState, useRef, useEffect, useContext} from 'react';
import { AppContext } from '../AppContext';
import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import axios from 'axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const PageRegister = () => {
    const { navigate, setDropdownOpen, dropdownOpen } = useContext(AppContext);
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

   	useEffect(() => {
        userRef.current.focus();
    }, [])

	useEffect (() => {
		const result = USER_REGEX.test(user);
		console.log(result);
		console.log(user);
		setValidName(result);
	}, [user])

	useEffect (() => {
		console.log(pwd);
		setValidPwd(PWD_REGEX.test(pwd));
		//if matched password and password are the same
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd])

	useEffect (() => {
		setErrMsg('');
	}, [user, pwd, matchPwd])

	const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

		 console.log(user, pwd);
		// setSuccess(true);

        try {
            const response = await axios.post(
				'/register',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }


	return (
		<div className='container'>


{success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
		<div className='auth-form-container'>
	
		<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
		<h2>Registrieren</h2>
		<form className='register-form' onSubmit = {handleSubmit}>
			<label htmlFor="username">
				Username:
				<FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
			</label>

			<input 
				type="text" 
				id="username"
				ref={userRef} 
				autoComplete='off'
				onChange={(e)=> setUser(e.target.value)}  
				required
				aria-invalid={validName ? 'false' : 'true'}
				aria-describedby='uidnote'
				onFocus={() => setUserFocus(true)}
				onBlur={() => setUserFocus(false)} />

			<p id='uidnote' className={userFocus && user &&
				!validName ? 'instructions' : 'offscreen' }>
				<FontAwesomeIcon icon={faInfoCircle} />
				4 to 24 characters. <br />
				Must begin with a letter.<br />
				Letters, numbers, underscores, hypens allowed.
			</p>
            



			<label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />

			<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

			<label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
						<button className ="btn-register" disabled={!validName || !validPwd || !validMatch ? true : false}>Registrieren</button>
                    </form>

             <button type= "button" className='link-btn' onClick ={() => {navigate('/login')}}>Hier anmelden.</button>
        </div>)}
		</div>
	)
}