import { useEffect, useState } from "react";
import { API_URL } from "config";
import styles from "./AdminOrdersPage.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminOrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    const handleReadMore = (id) => {
        navigate(`/admin/order/${id}`);
    };

    const handleRemove = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${API_URL}/api/orders/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to delete order");

            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.ordersContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
            <h1>Orders Management</h1>
            {orders.length === 0 ? <p>No orders found</p> : (
                <ul>
                    {orders.map(order => (
                        <li className={styles.orderListItem} key={order.id}>
                            <button className={styles.buttonMore} onClick={() => handleReadMore(order.id)}>
                                More
                            </button>
                            <span className={styles.orderText}>
                            OrderId: #{order.id} -- {order.client.name} -- {order.items.length} items
                            </span>
                            <button className={styles.buttonRemove} onClick={() => handleRemove(order.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrdersPage;