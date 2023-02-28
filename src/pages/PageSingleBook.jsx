export const PageSingleBook = ({ book }) => {
  return (
    <div>
      <div className="book" key={props.book._id}>
        <div className="book-cover">
          <img src={book.img} alt="" />
        </div>
        <div className="content">
          <div className="title">
            <h2>{book.title} </h2>
            <FavoriteIcon book={book} />
          </div>
          <div className="author">
            <h5>{book.author}</h5>
          </div>
          <div className="description">
            <p>{book.description}</p>
          </div>
          <div className="price">
            <h4>Price: {book.price} Є</h4>
          </div>
        </div>
        <div className="rest-info">
          <div className="isbn">
            <p>ISBN: {book.ISBN}</p>
          </div>
          <div className="publicationDate">
            <p>Public: {book.puplication.split("T22:00:00.000=00:00")}</p>
          </div>
          <div className="category">
            <p>Genre: {book.category.join(", ")}</p>
          </div>
          <div className="age">
            <p>Ab {book.age} Jahren</p>
          </div>
          <div className="pages">
            <p>Pages: {book.pages}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
