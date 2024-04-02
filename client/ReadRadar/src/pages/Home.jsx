import { useState } from 'react';

function BookSearch() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [results, setResults] = useState('');




  const handleSearch = async (e) => {

    const { search, value } = e.target;

    return search === 'title' ? setTitle(value) : search === 'genre' ? setGenre(value) : search === 'author' ? setAuthor(value) : null;

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


      setResults(data);
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
    </div>
  );
}
export default BookSearch;













