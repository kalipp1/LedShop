import { Link, useNavigate } from "react-router-dom";
import styles from "./CancelOrderPage.module.scss";
import { Form } from "react-bootstrap";
import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";
import { IMGS_URL } from "config";
import { cancelOrderRequest, getOrderById, loadOrderByIdRequest } from "../../../redux/ordersRedux";
import { useEffect } from "react";
import clsx from "clsx";

const CancelOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null); // success, loading, clientError, serverError, orderNotFound
    const [confirming, setConfirming] = useState(false);

    const orderDetails = useSelector(state => getOrderById(state, orderId));

    useEffect(() => {
        if (orderId) {
            dispatch(loadOrderByIdRequest(orderId));
        }
    }, [orderId, dispatch]);

    useEffect(() => {
        if (status === "success") {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, [status, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!orderId.trim()) {
            setStatus("clientError");
            return;
        }

        if (!orderDetails) {
            setStatus("orderNotFound");
            return;
        }

        setConfirming(true);
        setStatus(null);
    };

    const confirmCancelOrder = async () => {
        setStatus("loading");

        try {
            await dispatch(cancelOrderRequest(orderId));
            setOrderId(""); 
            setConfirming(false);
            setStatus("success");
        } catch (error) {
            setStatus("serverError");
        }
    };

    return (
        <div className={styles.cancelOrderContainer}>
            <h1>Do you want to cancel your order?</h1>
            <h2>Just type in your order number</h2>
            <h3>How to find your order number?</h3>
            <h4>You could find it after succeed payment or if you haven't save it we sent it on your email!</h4>

            {confirming && orderDetails ? (
                <div className={styles.confirmationBox}>
                    <Alert variant="warning">
                        <Alert.Heading>Are you sure you want to cancel this order?</Alert.Heading>
                        <p>This action cannot be undone.</p>
                    </Alert>

                    <div className={styles.orderPreview}>
                        <h5 className={styles.bolder}>Order Summary</h5>
                        <p><span className={styles.bolder}>Order ID:</span> {orderDetails.id}</p>
                        <p><span className={styles.bolder}>Client:</span> {orderDetails.client.name}</p>
                        <p><span className={styles.bolder}>Email:</span> {orderDetails.client.email}</p>
                        <p><span className={styles.bolder}>Address:</span> {orderDetails.client.address}</p>

                        <div className={styles.itemsList}>
                            {orderDetails.items.map((item, index) => (
                                <div key={index} className={styles.orderItem}>
                                    <img src={`${IMGS_URL}${item.colorVariant.imageUrl}`} alt={item.product.name} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <p className={clsx(styles.bolder, styles.prodName)}>{item.product.name}</p>
                                        <p>Color: {item.colorVariant.color}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.product.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className={styles.totalPrice}>
                            <span className={styles.bolder}>Total Price:</span> ${orderDetails.items.reduce((total, item) => total + item.product.price * item.quantity, 0)}
                        </p>
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button variant="danger" onClick={confirmCancelOrder}>Cancel Order</Button>
                        <Button variant="secondary" onClick={() => setConfirming(false)}>Go Back</Button>
                    </div>
                </div>
            ) : (
            <Form className={clsx("col-12 col-sm-3 mx-auto", styles.formOrder)} onSubmit={handleSubmit}>

            { status === "success" && (<Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                    <p>You have sucesfully cancelled your order! Redirecting to home ...</p>
                </Alert>
            )}

            { status === "serverError" && (<Alert variant="danger">
                <Alert.Heading>Something went wrong ...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>
            )}

            {status === "clientError" && (<Alert variant="danger">
                <Alert.Heading>Not enough data</Alert.Heading>
                    <p>You have to fill all the required fields</p>
                </Alert>
            )}

            {status === "orderNotFound" && (<Alert variant="danger">
                <Alert.Heading>Not found</Alert.Heading>
                    <p>Order with this number not found</p>
                </Alert>
            )}

            { status === "loading" && (<Spinner animation="border" role="status" className="d-block mx-auto">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            <Form.Group className="mb-3" controlId="formOrderId">
                <Form.Label>Order Number</Form.Label>
                <Form.Control type="text" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Enter order number" />
            </Form.Group>

            {status !== "success" && (
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
            )}
            </Form>
            )}
            <Link to="/" className={styles.button}>Back to Home</Link>
        </div>
    );
};

export default CancelOrderPage;