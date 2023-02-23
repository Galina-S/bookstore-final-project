import { createContext } from "react";
import { useState, useEffect } from "react";
import instance from "../components/axios";
import { useNavigate } from 'react-router-dom';
import {anonymousUser, blankLoginForm } from './pages/Interfaces'
import { cloneDeep } from 'lodash-es';

import instance from "../components/axios";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [rawBooks, setRawBooks] = useState([]);
  const [editingElementId, setEditingElementId] = useState(null);
  const [formData, setFormData] = useState([]);

  const [loginForm, setLoginForm] = useState(cloneDeep(blankLoginForm));
  const [currentUser, setCurrentUser] = useState(anonymousUser);
  // const [memberInfo, setMemberInfo] = useState(blankMemberInfo);
  // const [adminInfo, setAdminInfo] = useState(blankAdminInfo);
  
 const navigate = useNavigate();
  const loadBooks = async () => {
    const books = (await instance.get("/books")).data;
    const _books = [];
    books.forEach((rawBook) => {
      const _book = {
        ...rawBook,
      };
      _books.push(_book);
    });
    setRawBooks(_books);
  };

  const handleDeleteBook = async (_book) => {
    try {
      const res = await instance.delete(`/books/${_book._id}`);
      if ((res.status = 200)) {
        await loadBooks();
        console.log(_book._id);
      }
    } catch (e) {
      console.error(`ERROR: ${e}`);
    }
  };

  const handleEditBook = (id, _book) => {
    setRawBooks(
      rawBooks.map((book) => (book._id === id ? { ...book, _book } : book))
    );
    setEditingElementId(null);
  };

  const onOpenEditForm = (book) => {
    setEditingElementId(book._id);
    setFormData(book);
  };

  const handleChangeFormField = (e, key) => {
    e.preventDefault();
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const sendEditBook = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.put(`/books/${editingElementId}`, formData);
      if ((res.status = 200)) {
        await loadBooks();
      }
    } catch (e) {
      console.error(`ERROR: ${e}`);
    }
    setEditingElementId(null);
  };

  const changeLoginFormField = (fieldIdCode, value) => {
		loginForm.fields[fieldIdCode] = value;
		setLoginForm({ ...loginForm });
	};

  const submitLoginForm = async (onBadLogin) => {
		try {
			const response = await axios.post(
				`${backendUrl}/login`,
				{
					username: loginForm.fields.username,
					password: loginForm.fields.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
      console.log(response.data)
			const user = response.data;

			// if (user.accessGroups.includes('loggedInUsers')) {
			setCurrentUser({ ...user });
      setLoginForm({ ...blankLoginForm });
      navigate('/books');
              
			//navigate('/');
			// } else {
			// 	loginForm.fields.password = '';
			 	// loginForm.message = 'Bad login, try again.';
			 	// setLoginForm(cloneDeep(loginForm));
			 	// onBadLogin(); 
        		// }
     
		} catch (e) {
			console.log(`GENERAL ERROR: ${e.message}`);
      if (e.message==="Request failed with status code 401") {
        loginForm.message = 'Bad login, try again.';
			 	setLoginForm(cloneDeep(loginForm));
			 	onBadLogin(); 
      }
		}
	};

  const logUserOut = () => {
		setCurrentUser({ ...anonymousUser });
		(async () => {
			try {
				await axios.get(`${backendUrl}/logout`, {
					withCredentials: true,
				});
				getCurrentUser();
			} catch (e) {
				console.log('GENERAL ERROR');
			}
		})();
	};

const clearLoginForm = () => {
  setLoginForm(cloneDeep(blankLoginForm));
};

const getCurrentUser = () => {
  (async () => {
    try {
      const user = (
        await axios.get(`${backendUrl}/get-current-user`, {
          withCredentials: true,
        })
      ).data;
      setCurrentUser({ ...user });
    } catch (e) {
      console.log('GENERAL ERROR');
    }
  })();
};


useEffect(() => {
  getCurrentUser();
}, []);

useEffect(() => {
  (async () => {
    try {
      const user = (
        await axios.get(`${backendUrl}/get-current-user`, {
          withCredentials: true,
        })
      ).data;
      setCurrentUser({...user});
      
    } catch (e) {
      console.log('General error')
    } 
})();
},[]);




  //Tracking The Window Size
 const getWindowSize = () =>{
  const innerWidth = window.innerWidth;
  return innerWidth
 }


 const [windowSize, setWindowSize] = useState(getWindowSize());

 useEffect(()=> {
  const handleWindowResize = () => {
    setWindowSize(getWindowSize())
  }

  window.addEventListener('resize',handleWindowResize);

  return () => {
    window.removeEventListener('resize', handleWindowResize)
  }
 }, [])

//console.log(windowSize);


  


  return (
    <AppContext.Provider
      value={{
        rawBooks,
        handleDeleteBook,
        handleEditBook,
        onOpenEditForm,
        editingElementId,
        loadBooks,
        setFormData,
        handleChangeFormField,
        sendEditBook,

        loginForm,
        changeLoginFormField,
        submitLoginForm,
        clearLoginForm,
        currentUser,
        logUserOut,
         windowSize

      }}
    >
      {children}
    </AppContext.Provider>
  );
};
    