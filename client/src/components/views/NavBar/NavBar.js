import styles from './NavBar.module.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CartDropdown from 'components/features/CartDropdown/CartDropdown';


const NavBar = () => {
    const location = useLocation();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const isSuccessPage = matchPath("/success/:orderId", location.pathname);

    const isOnCartOrPaymentPageOrSuccessPage = location.pathname === "/cart" || location.pathname === "/payment" || isSuccessPage !== null;

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
            {!isOnCartOrPaymentPageOrSuccessPage && (
              <button className={styles.cartButton} onClick={() => setIsCartOpen(!isCartOpen)}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            )}
          </Nav>
        </Container>
        {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
      </Navbar>
    );
  };

  export default NavBar;