import { useState } from 'react';
import '../styles/styles.css';

function BookSearch() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [results, setResults] = useState([]);




  const handleSearch = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'genre':
        setGenre(value);
        break;
      default:
        break;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setTitle('');
    setAuthor('');
    setGenre('');
  };

  const handleClick = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${title}&author=${author}&genre=${genre}`);
      const data = await response.json();
      setResults(data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <input
          value={genre}
          name="genre"
          onChange={handleSearch}
          type="text"
          placeholder="Search By Genre"
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
          </div>
        ))}
      </section>
    </div>
  );
}
export default BookSearch;













