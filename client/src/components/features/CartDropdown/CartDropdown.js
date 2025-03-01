import { useSelector } from 'react-redux';
import { getCart, updateCartQuantity, removeFromCart } from '../../../redux/cartRedux';
import { Link } from 'react-router-dom';
import styles from './CartDropdown.module.scss';
import { IMGS_URL } from 'config';
import { useDispatch } from 'react-redux';

const CartDropdown = ({ onClose }) => {
    const cart = useSelector(getCart);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

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

    const handleMouseLeave = () => {
        onClose();
    };
    return (
        <div className={styles.cartDropdown} onMouseLeave={handleMouseLeave}>
            {cart.length === 0 ? (
                <p className={styles.empty}>Your cart is empty</p>
            ) : (
                <>
                    <div className={styles.cartItems}>
                        {cart.map((item, index) => (
                            <div key={index} className={styles.cartItem}>
                                <img src={`${IMGS_URL}${item.imageUrl}`} alt={item.name} className={styles.cartItemImage} />
                                <div className={styles.quantityBox}>
                                    <button onClick={() => addQuantity(item)}>+</button>
                                    {item.quantity}
                                    <button onClick={() => lowerQuantity(item)}>-</button>
                                </div>
                                <div className={styles.cartItemDetails}>
                                    <p className={styles.cartItemName}>{item.name}</p>
                                    <p className={styles.cartItemPrice}>${item.price} x {item.quantity}</p>
                                    <button onClick={() => clearItem(item)} className={styles.deleteProdBtn}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totalPrice}>
                        <h5>Total Price: <span>${totalPrice.toFixed(2)}</span></h5>
                    </div>
                    <Link to="/cart" className={styles.cartButton}>Go to Cart</Link>
                </>
            )}
        </div>
    );
};

export default CartDropdown;