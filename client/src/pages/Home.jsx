import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/styles.css';
import './Home.css'
import { searchGoogleBooks } from '../utils/API'

function BookSearch() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [savedBookIds, setSavedBookIds] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);




  // switch case to handle the search based on the field the user chooses to search

  const handleSearch = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      default:
        break;
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchGoogleBooks("harry+potter");

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const { items } = await response.json();
      const bookData = items.map((book) => ({
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
      console.log(bookData)
      setItems(bookData);
    } catch (err) {
      console.error(err);
    }

  };

  // this handle click function fetches the book data from the API
  const handleClick = async () => {
    try {
      const Imgresponse = await searchGoogleBooks("harry+potter");

      if (!Imgresponse.ok) {
        throw new Error('something went wrong!');
      }
      const { items } = await Imgresponse.json();
      const bookData = items.map((book) => ({
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
      console.log(bookData)
      setItems(bookData);
      const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
      const data = await response.json();
      let img0 = bookData[0].image;
      let img1 = bookData[1].image;
      let img2 = bookData[2].image;
      let img3 = bookData[3].image;
      let img4 = bookData[4].image;
      let img5 = bookData[5].image;
      let img6 = bookData[6].image;
      let img7 = bookData[7].image;
      let img8 = bookData[8].image;
      let img9 = bookData[9].image;
      console.log(data)
      data.docs.img0 = bookData[0].image
      data.docs.img1 = bookData[1].image
      data.docs.img2 = bookData[2].image
      data.docs.img3 = bookData[3].image
      data.docs.img4 = bookData[4].image
      data.docs.img5 = bookData[5].image
      data.docs.img6 = bookData[6].image
      data.docs.img7 = bookData[7].image
      data.docs.img8 = bookData[8].image
      data.docs.img9 = bookData[9].image
      setResults(data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };


  // this function will handle the books the user saved

  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id

    const bookToSave = results.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const input = {
        bookId: bookToSave.bookId,
        authors: bookToSave.authors,
        title: bookToSave.title,
        image: bookToSave.image,
        link: bookToSave.link

      };

      const { data } = await saveBook({
        variables: { input }
      });
      console.log(data);

      if (!data || !data.saveBook) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="container text-center">
      <h1>
        Search
      </h1>
      <form className="form" value={items} onSubmit={handleSearchSubmit}>
        <input
          value={title}
          name="title"
          onChange={handleSearch}
          type="text"
          placeholder="Search By Title"
        />
        <input
          value={author}
          name="author"
          onChange={handleSearch}
          type="text"
          placeholder="Search By Author"
        />
        <button type="submit" value={results} onClick={handleClick}>
          Submit
        </button>
      </form>

      <section className="results">
        {results.map((result, index) => (

          <div className="book-results-container" key={index}>
            <header className="w3-container w3-blue">
              <u><h2>{result.title}</h2></u>
              <img src={result.img0} alt="" />
            </header>

            <div className="w3-container">
              <i><p>Author: {result.author_name ? result.author_name.join(', ') : 'Unknown'}</p></i>
              <p>Genre: {result.subject ? result.subject.join(', ') : 'Unknown'}</p>
            </div>
            <footer className="w3-container w3-blue">
              {Auth.loggedIn() && (
                <button
                  disabled={savedBookIds?.some((savedBookId) => savedBookId === result.bookId)}
                  className=''
                  onClick={() => handleSaveBook(result.bookId)}>
                  {savedBookIds?.some((savedBookId) => savedBookId === result.bookId)
                    ? 'This book has already been saved!'
                    : 'Save this Book!'}
                </button>
              )}
            </footer>

          </div>
        ))}
      </section>
    </div>
  );
}
export default BookSearch;













