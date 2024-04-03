import { Link, useLocation } from 'react-router-dom';


const Header = () => {

    const styles = {
        navStyle: {
            display: 'inline',
            listStyleType: 'none',
            paddingTop: '75px',
            height: '75px',
            borderStyle: 'none'
        },
        navLinks: {
            backgroundColor: 'lightgrey',
            color: 'black',
            fontSize: '25px',
            fontWeight: 'bold',
            justifyContent: 'center'
        }
    };

    const currentPage = useLocation().pathname;

    return (
        <header className="header">

            <h1>Read Radar</h1>

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
                <li className="nav-item">
                    <Link
                        style={styles.navLinks}
                        to="/Login"
                        className={currentPage === '/Portfolio' ? 'nav-link active' : 'nav-link'}
                    >
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        style={styles.navLinks}
                        to="/Signup"
                        className={currentPage === '/Resume' ? 'nav-link active' : 'nav-link'}
                    >
                        Sign Up
                    </Link>
                </li>
                
            </ul>


        </header>
    )
}

export default Header;