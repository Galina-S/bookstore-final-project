import { useContext } from "react";
import { AppContext } from "../AppContext";
import { EditBook } from "../../src/pages/EditBook";
import { useEffect, useRef } from "react";
import { DisplayBook } from "../../components/DisplayBook";

export const PageBooks = () => {
  const {
    rawBooks,
    editingElementId,
    loadBooks,
    cleanFormData,
    setEditingElementId,
    currentUserIsAdmin,
    currentUser,
    currentUserIsInAccessGroup,
    loadAccessGroupData
  } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      loadBooks();
    })();
  }, []);

  const componentWillUnmount = useRef(false);

  // This is componentWillUnmount
  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      // This line only evaluates to true after the componentWillUnmount happens
      if (componentWillUnmount.current) {
        cleanFormData();
        setEditingElementId(null);
      }
    };
  }, []);

  return (
    <div className="pageBooks">
         
     {currentUserIsAdmin() && (
      <>
       <h2 style={{textAlign: "center"}}>Hi Admin!</h2>
        <br></br>
        <h3 style={{textAlign: "center"}}>Es gibt {rawBooks.length} Bücher in unserem BookStore</h3>
      <div className="books">
       
        {rawBooks.map((_book) => {
          return (
            <div key={_book._id} className="all-displayed-books">
              {_book._id === editingElementId ? (
                <EditBook book={_book } />
              ) : (
                <DisplayBook book={_book} />
              )}
            </div>
          );
        })}
      </div>
      </>
    )     
    }
      
    </div>
  );
};
