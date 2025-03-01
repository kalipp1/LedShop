import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./SuccessPage.module.scss";

const SuccessPage = () => {
    const { orderId } = useParams();

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.successContainer}>
            <h1>Order placed successfully!</h1>
            <p>Your order number: <span className={styles.strongOrderId}>{orderId}</span></p>
            <p>Please don't let any stranger to see your order number</p>
            <p>You can use this order number to cancel your order later.</p>
            <button onClick={copyToClipboard} className={styles.button}>
                {copied ? "Copied!" : "Copy Order Number"}
            </button>
            <Link to="/" className={styles.button}>Back to Home</Link>
        </div>
    );
};

export default SuccessPage;