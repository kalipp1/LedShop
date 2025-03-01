import styles from './CartPage.module.scss';
import { getCart, updateCartQuantity, removeFromCart } from '../../../redux/cartRedux';
import { useSelector } from 'react-redux';
import { IMGS_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CartPage = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shipmentPrice, setShipmentPrice] = useState(12);
  const freeShippingThreshold = 200;
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      setIsRedirecting(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  }, [cart.length, navigate]);

  const totalPriceProducts = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  useEffect(() => {
    if (totalPriceProducts > freeShippingThreshold) {
      setShipmentPrice(0);
    } else {
      setShipmentPrice(12);
    }
  }, [totalPriceProducts]);

  const totalPrice = totalPriceProducts + shipmentPrice;

  const progressPercentage = Math.min((totalPriceProducts / freeShippingThreshold) * 100, 100);
  const amountLeft = freeShippingThreshold - totalPriceProducts;

    const addQuantity = (item) => {
      if (item.quantity < 99) {
        dispatch(updateCartQuantity(item.id, item.colorVariantId, item.quantity + 1));
    }
    }

    const lowerQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(updateCartQuantity(item.id, item.colorVariantId, item.quantity - 1));
        }
    }

    const clearItem = (item) => {   
        dispatch(removeFromCart(item.id, item.colorVariantId));
    }

    const goToPayment = () => {
      navigate('/payment', { state: { totalPrice } });
    };

    if (isRedirecting) {
      return (
        <div className={styles.redirectContainer}>
          <div className={styles.loader}></div>
          <p>Your cart is empty. Redirecting you to the main page...</p>
        </div>
      );
    }
  
  return (
    <div className={styles.allPage}>
      <h1>Cart</h1>
      <div className={styles.CartPage}>
        <div className={styles.cartItems}>
        {cart.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <div className={styles.leftSide}>
              <img src={`${IMGS_URL}${item.imageUrl}`} alt={item.name} className={styles.cartItemImage} />
              <div className={styles.quantityBox}>
                <button className={styles.buttonQuantity} onClick={() => addQuantity(item)}>+</button>
                {item.quantity}
                <button className={styles.buttonQuantity} onClick={() => lowerQuantity(item)}>-</button>
              </div>
            </div>
            <div className={styles.cartItemDetails}>
              <p className={styles.cartItemName}>{item.name}</p>
              <p className={styles.cartItemPrice}>${item.price} x {item.quantity} piece</p>
              <button onClick={() => clearItem(item)} className={styles.deleteProdBtn}>X</button>
            </div>
          </div>
        ))}
        </div>
        <div className={styles.priceBox}>
          <h5>Total price of products: <span>${totalPriceProducts.toFixed(2)}</span></h5>
          <h5>Shipment: ${shipmentPrice.toFixed(2)}</h5>
          <h5>Total: ${totalPrice.toFixed(2)}</h5>
          <div className={styles.progressContainer}>
            <p className={styles.progressText}>
              {amountLeft > 0 
                ? `Add $${amountLeft.toFixed(2)} more for Free Shipping!`
                : "You have Free Shipping!"}
            </p>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${progressPercentage}%` }}>
              </div>
            </div>
          </div>
          <button onClick={goToPayment} className={styles.paymentButton}>
            Go to Payment
          </button>
        </div>
      </div>
      <Link to="/" className={styles.continueShopping}>Continue Shopping</Link>
    </div>
   );
}
 
export default CartPage; 