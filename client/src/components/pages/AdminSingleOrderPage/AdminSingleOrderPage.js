import styles from "./AdminSingleOrderPage.module.scss";
import { useSelector } from "react-redux";
import { getOrderById, loadOrderByIdRequest } from "../../../redux/ordersRedux";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IMGS_URL } from "config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from "components/common/Button/Button";

const AdminSingleOrderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderId } = useParams();

    const order = useSelector(state => getOrderById(state, orderId));

    useEffect(() => {
        if (orderId) {
            dispatch(loadOrderByIdRequest(orderId));
        }
    }, [orderId, dispatch]);

    if (!order) {
        return (
            <div className={styles.loading}>
                <Spinner animation="border" />
                <p>Loading order details...</p>
            </div>
        );
    }

    return (
        <div className={styles.allPage}>
            <Button variant={'backButton'} action={() => navigate(-1)} content={<FontAwesomeIcon icon={faCircleArrowLeft} />} />
            <div className={styles.orderDetails}>
                <h1>Order Details</h1>
                <p><span className={styles.bold}>Order ID:</span> {order.id}</p>
                <h1>Client Details</h1>
                <p><span className={styles.bold}>Client ID:</span> {order.client.id}</p>
                <p><span className={styles.bold}>Client Name:</span> {order.client.name}</p>
                <p><span className={styles.bold}>Client Email:</span> {order.client.email}</p>
                <p><span className={styles.bold}>Client Phone:</span> {order.client.phone}</p>
                <p><span className={styles.bold}>Client Address:</span> {order.client.address}</p>
                <h1>Products Details</h1>
                <div className={styles.orderItems}>
                {order.items.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                        <img src={`${IMGS_URL}${item.colorVariant.imageUrl}`} alt={item.product.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                            <p><span className={styles.bold}>Name:</span> {item.product.name}</p>
                            <p><span className={styles.bold}>Color:</span> {item.colorVariant.color}</p>
                            <p><span className={styles.bold}>Quantity:</span> {item.quantity}</p>
                            <p><span className={styles.bold}>Price:</span> ${item.product.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default AdminSingleOrderPage;