import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK, ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/Auth';
import '../styles/styles.css';

function BookSearch() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [results, setResults] = useState([]);
  const [savedBookIds, setSavedBookIds] = useState([]);
  const [comments, setComments] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);
  const [addComment] = useMutation(ADD_COMMENT);

  // this will handle the search depending on which search field you are using 
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

  // this is the fetch to the API when you click submit to search for a book title, still working on getting the author search to work
  const handleClick = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
      const data = await response.json();
      setResults(data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // handle the saved books, this allows users to save books if they are logged in 
  const handleSaveBook = async (bookId) => {
    const bookToSave = results.find((book) => book.bookId === bookId);
    console.log(bookToSave)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBook({
        variables: { book: bookToSave }
      });

      if (!data || !data.saveBook) {
        throw new Error('Something went wrong!');
      }

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  // this allows the user to add a comment to a book if they are logged in 

  const handleComments = async (bookId, commentContent) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addComment({
        variables: {
          bookId: bookId,
          username: Auth.getProfile().username,
          content: commentContent,
          date: new Date().toISOString(),
        }
      });

      if (!data || !data.addComment) {
        throw new Error('Something went wrong!');
      }

      const updatedComments = [...comments, data.addComment]; // Add the new comment to existing comments
      setComments(updatedComments);

      //  this will update the results with the new comment
      const updatedResults = results.map(result => {
        if (result.bookId === bookId) {
          return {
            ...result,
            comments: [...(result.comments || []), data.addComment]
          };
        }
        return result;
      });

      setResults(updatedResults);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="container text-center">
      <h1>Search</h1>
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
        {results.map((result) => (
          <div key={result.bookId}>
            <h2>{result.title}</h2>
            <p>Author: {result.authors ? result.authors.join(', ') : 'Unknown'}</p>
            <p>Genre: {result.subject ? result.subject.join(', ') : 'Unknown'}</p>
            {Auth.loggedIn() && (
              <div>
                <button
                  disabled={savedBookIds?.includes(result.bookId)}
                  className='btn-block btn-info'
                  onClick={() => handleSaveBook(result.bookId)}
                >
                  {savedBookIds?.includes(result.bookId)
                    ? 'This book has already been saved!'
                    : 'Save this Book!'}
                </button>
                <button
                  className='btn-block btn-info'
                  onClick={() => handleComments(result.bookId)}
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default BookSearch;