import { createContext } from "react";
import { useState } from "react";
import instance from "./pages/axios";
import axios from "axios";



export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [rawBooks, setRawBooks] = useState([]);
    const [editingElementId, setEditingElementId] = useState(null)
    const [formData, setFormData] = useState([]);


    const loadBooks = async () => {
        const books = (await instance.get("/books")).data;
        const _books = [];
        books.forEach(rawBook =>{
            const _book = {
                ...rawBook,
/**                editItem: {
                    title: rawBook.title,
                    author: rawBook.author,
                    img: rawBook.img,
                    price: rawBook.price,
                    isbn: rawBook.ISBN,
                    category: rawBook.category,
                    publication: rawBook.publication,
                    age: rawBook.age,
                    pages: rawBook.pages,
                }     
*/              
            }   
            _books.push(_book);
        
        })
        setRawBooks(_books);
    };


    const handleDeleteBook = async (_book) => {
        try {
            const res = await instance.delete(`/books/${_book._id}`)
            if (res.status = 200) {
                await loadBooks();
                console.log(_book._id);
            }
        } catch (e) {
            console.error(`ERROR: ${e}`);
        }
    }

    const handleEditBook = (id, _book) => {
        setRawBooks(
            rawBooks.map((book)=>
                book._id === id ? {...book, _book} : book
            ) 
        )
        setEditingElementId(null)
    }

    const onOpenEditForm = (id) => {
        setEditingElementId(id)
    }


    const handleChangeFormField = (e, key) => {
        e.preventDefault();
        const value = e.target.value;
        const _formData = value
        setFormData({ _formData });
        console.log(formData);
    }

    const sendEditBook = async (_book) => {
        const res = await axios.put(`${instance}/books`, _book)
        console.log(res);
    }



    
    return (
        <AppContext.Provider value = {{
            rawBooks,            
            handleDeleteBook,
            handleEditBook,
            onOpenEditForm,
            editingElementId,
            loadBooks,
            setFormData,
            handleChangeFormField,
            sendEditBook
        }}>
            {children}
        </AppContext.Provider>
    );
};