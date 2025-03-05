import styles from './NavBar.module.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShoppingCart, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { adminLogout } from '../../../redux/adminRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CartDropdown from 'components/features/CartDropdown/CartDropdown';


const NavBar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

    const isSuccessPage = matchPath("/success/:orderId", location.pathname);

    const isOnCartOrPaymentPageOrSuccessPageOrAdmin = location.pathname === "/cart" || location.pathname === "/payment" || location.pathname.startsWith("/admin") || isSuccessPage !== null;
    const logoutBTN = location.pathname.startsWith("/admin");

    const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(adminLogout());
      navigate("/admin/login", { state: { logoutMessage: "You have been logged out successfully." } });
    };

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
            {!isOnCartOrPaymentPageOrSuccessPageOrAdmin && (
              <button className={styles.cartButton} onClick={() => setIsCartOpen(!isCartOpen)}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            )}
            {logoutBTN && (
              <button className={styles.logOutButton} onClick={handleLogout}>
              <FontAwesomeIcon icon={faXmarkCircle} /> Log Out
              </button>
            )}
          </Nav>
        </Container>
        {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
      </Navbar>
    );
  };

  export default NavBar;