import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    const isOnAdmin = location.pathname.startsWith("/admin");
    const isOnCancelOrderOrAdmin = location.pathname === "/cancelOrder" || location.pathname.startsWith("/admin");

    return (
      <div className={styles.footer}>
        <h1>
          LedShopProject ©APP
          {!isOnAdmin && (
          <Link to="/admin/login" className={styles.buttonAdmin}></Link>
          )}
        </h1>
        <h1>
            {!isOnCancelOrderOrAdmin && (
              <Link to="/cancelOrder" className={styles.button}>Cancel your order</Link>
            )}
            <a href='#'><FontAwesomeIcon icon={faSquareFacebook} /> </a>
            <a href='#'><FontAwesomeIcon icon={faSquareInstagram} /> </a>
        </h1>
      </div>
    );
  };

  export default Footer;