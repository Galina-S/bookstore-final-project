import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useEffect, useRef, useState } from "react";
import { Book } from "../pages/Book";

export const PageBooks2 = () => {

  const [sortOrder, setSortOrder] = useState('none');
  const { rawBooks, setRawBooks, loadBooks} = useContext(AppContext);
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  }

  const componentWillUnmount = useRef(false);

  // This is componentWillUnmount
  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

// damit die Bücher geladen sind, wenn man zurückgeht
  useEffect(() => {
    (async () => {
      loadBooks();
    })();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     // This line only evaluates to true after the componentWillUnmount happens
  //     if (componentWillUnmount.current) {
  //       loadBooks();
  //       //cleanFormData();
  //       //setEditingElementId(null);
  //     }
  //   };
  // }, []);

 const sortedBooks = rawBooks.sort((a, b) => {

  switch(sortOrder) {
    case "asc": return a.price - b.price;
    case "desc": return b.price - a.price; 
    case "publ-asc": return new Date(a.puplication) - new Date(b.puplication);
    case "publ-desc":return new Date(b.puplication) - new Date(a.puplication);
    default:
      return 0;
  }
  });


  return (
    <div className="pageBooks2">
      <label>Sortieren:</label>
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="none">keine Sortierung</option>
        <option value="asc">Preis: aufsteigend</option>
        <option value="desc">Preis: absteigend</option>
        <option value="publ-asc">Erscheinungsdatum: aufsteigend</option>
        <option value="publ-desc">Erscheinungsdatum: absteigend</option>
        
      </select>

      <ul>
        {/* {(filteredBooks.length > 0)
          ? filteredBooks.map((_book) => {
              return (
                <li className="book" key={_book._id}>
                  <Book book={_book} />
                </li>
              );
            })
          : rawBooks.map((_book) => {
              return (
                <li className="book" key={_book._id}>
                  {(_book._id === editingElementId   
                    ? (<EditBook book={_book} />) 
                    : (<Book book={_book} />)
                   )
                  }

                </li>
              );
            })} */}

            {sortedBooks.map((_book) => {
              return (
                  <li className="book" key={_book._id}>
                    <Book book={_book} />
                  </li>
               );
            })}
      </ul>
    </div>
  );
};
