import { useEffect } from "react";
import styles from "./AdminClientSinglePage.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { loadClientByIdRequest, getClientById } from "../../../redux/clientsRedux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Button from "components/common/Button/Button";

const AdminClientSinglePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { clientId } = useParams();
    const [clientPhone, setClientPhone] = useState('');

    const client = useSelector(state => getClientById(state, clientId));

    useEffect(() => {
        dispatch(loadClientByIdRequest(clientId));
    }, [dispatch, clientId]);

    useEffect(() => {
        if (client) {
            setClientPhone(client.phone ? client.phone : "Client hasn't given his phone number");
        }
    }, [client]);

    if (!client) {
        return (
            <div className={styles.loading}>
                <Spinner animation="border" />
                <p>Loading client details...</p>
            </div>
        );
    }

    return (
        <div className={styles.clientPageContainer}>
            <Button variant={'backButton'} action={() => navigate(-1)} content={<FontAwesomeIcon icon={faCircleArrowLeft} />} />
            <h1>Client Details</h1>
            <p>Client: {client.id}</p>
            <p>Client name: {client.name}</p>
            <p>Client address: {client.address}</p>
            <p>Client phone: {clientPhone}</p>

            <h1>Client orders</h1>
                {client.orders && Array.isArray(client.orders) && client.orders.length > 0 ? (
                <ul className={styles.clientOrdersList}>
                {client.orders.map((order) => (
                    <li key={order.id} className={styles.orderItem}>
                        <h3>Order</h3>
                        <p>Order ID: {order.id}</p>
                    </li>
                ))}
                </ul>
                ) : (
                    <p>No orders found</p>
                )}
        </div>
    );
};

export default AdminClientSinglePage;