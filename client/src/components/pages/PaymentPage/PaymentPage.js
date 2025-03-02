import { Alert, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCart, clearCart } from "../../../redux/cartRedux";
import { IMGS_URL } from "../../../config";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import clsx from "clsx";
import styles from './PaymentPage.module.scss';

const PaymentPage = () =>{

    const location = useLocation();
    const totalPrice = location.state?.totalPrice || 0;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(getCart);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(null); // success, loading, clientError, serverError

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !address) {
            setStatus("clientError");
            return;
        }

        setStatus("loading");

        const orderData = {
            client: {
                name,
                email,
                phone,
                address,
            },
            items: cart.map(item => ({
                productId: item.id,
                colorVariantId: item.colorVariantId,
                quantity: item.quantity
            })),
            total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        };

        try {
            const res = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) {
                throw new Error("Server error");
            }

            const data = await res.json();
            if (!data.orderId) throw new Error("Order ID not found");

            dispatch(clearCart());
            setStatus("success");
            setTimeout(() => {
                navigate(`/success/${data.orderId}`);
            }, 500); 
        } catch (error) {
            setStatus("serverError");
        }
    };

    if (!cart ) return <Navigate to={'/'} />;

    return (
        <div className={styles.allPage}>
            <h1 className="my-4">Finish your order</h1>
            <div className={styles.finishOrderBox}>
                <div className={styles.orderDisplayWithTotalPrice}>
                    <div className={styles.orderDisplay}>
                        {cart.map((item, index) => (
                            <div key={index} className={styles.cartItem}>
                                <div className={styles.leftSide}>
                                    <img src={`${IMGS_URL}${item.imageUrl}`} alt={item.name} className={styles.cartItemImage} />
                                </div>
                                <div className={styles.cartItemDetails}>
                                    <p className={styles.cartItemName}>{item.name}</p>
                                    <p className={styles.cartItemVariant}>Color: {item.variant}</p>
                                    <p className={styles.cartItemQuantity}>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className={styles.cartTotalPrice}>Total to pay: ${totalPrice.toFixed(2)}</p>
                </div>
            <Form className={clsx("col-12 col-sm-3 mx-auto", styles.formOrder)} onSubmit={handleSubmit}>

                { status === "success" && (<Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                        <p>You have sucesfully ordered!</p>
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

                { status === "loading" && (<Spinner animation="border" role="status" className="d-block mx-auto">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <p className={styles.isNotRequired}>*Phone number is not required*</p>
                    <Form.Control type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
            <Link to="/cart" className={styles.goBackToCart}>Go back</Link>
        </div>
    )
}

export default PaymentPage;