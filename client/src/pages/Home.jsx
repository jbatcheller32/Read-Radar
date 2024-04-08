import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/styles.css';

function BookSearch() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [results, setResults] = useState([]);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setTitle('');
    setAuthor('');

  };

  // this handle click function fetches the book data from the API
  const handleClick = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
      const data = await response.json();

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
      <form className="form" onSubmit={handleSearchSubmit}>
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
          <div key={index}>
            <h2>{result.title}</h2>
            <p>Author: {result.author_name ? result.author_name.join(', ') : 'Unknown'}</p>
            <p>Genre: {result.subject ? result.subject.join(', ') : 'Unknown'}</p>
            {Auth.loggedIn() && (
                      <button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === result.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(result.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === result.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </button>
                       )}
          </div>
        ))}
      </section>
    </div>
  );
}
export default BookSearch;













