import styles from './NavBar.module.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
    const location = useLocation();

    return (
        <Navbar className={clsx(styles.navbar)}>
        <Container>
          <Navbar.Brand><span className={styles.logo}>
            <img src='http://localhost:8000/public/images/webPageLogo3.png' alt='pageLogo' /> 
            </span></Navbar.Brand>
          <Nav className={styles.nav}>
            <Nav.Link className={clsx(styles.link, location.pathname==="/"&& styles.linkActive)} as={NavLink} to="/">
                <FontAwesomeIcon icon={faHouse} /> Home
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  };

  export default NavBar;