import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';



const Profile = () => {


  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (
    Auth.loggedIn() &&
    Auth.getProfile().username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        Login to view your profile!
      </h4>
    );
  }



  return (
    <div>
      <h1>User Profile</h1>
      <h2>Saved Books</h2>
      <ul>
        {data.user.savedBooks.map(book => (
          <li key={book.bookId}>
            <h3>{book.title}</h3>
            <p>Author: {book.authors.join(', ')}</p>
            <p>Description: {book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Profile;