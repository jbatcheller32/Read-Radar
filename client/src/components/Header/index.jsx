import { Link, useLocation } from 'react-router-dom';

import Auth from '../../utils/auth'; 

const Header = () => {
    const logout = (e) => {
        e.preventDefault(); 
        Auth.logout();
    }

    const styles = {
        navStyle: {
            display: 'flex',
            justifyContent: 'space-evenly',
            listStyleType: 'none',
            paddingTop: '75px',
            height: '75px',
            borderStyle: 'none'
        },
        navLinks: {
            backgroundColor: 'transparent',
            color: 'black',
            fontSize: '25px',
            fontWeight: 'bold',
            justifyContent: 'center'
        }, 
        headerStyle: {
            width: '1800px',
            backgroundColor: 'darkseagreen',
            borderRadius: '10px'
        },
        titlestyle: {
            display: 'flex',
            justifyContent: 'center'

        },
    };

    const currentPage = useLocation().pathname;

    return (
        <header className="header" style={styles.headerStyle}>

            <h1 className="title" style={styles.titlestyle}>Read Radar</h1>

            <ul style={styles.navStyle} className="nav nav-tabs">
                <li className="nav-item">
                    <Link
                        style={styles.navLinks}
                        to="/"
                        className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                    >
                        Home
                    </Link>
                </li>
                
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username} profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
               <li className="nav-item">
                    <Link
                        style={styles.navLinks}
                        to="/Login"
                        className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
                    >
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        style={styles.navLinks}
                        to="/Signup"
                        className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}
                    >
                        Sign Up
                    </Link>
                </li>
                </>
            
          
          )}
        
        </ul>

        </header>
        
    )
}

export default Header;