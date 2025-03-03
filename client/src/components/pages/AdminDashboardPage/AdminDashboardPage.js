import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminDashboardPage.module.scss";
import { useEffect } from "react";

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);

    return (
        <div className={styles.dashboardContainer}>
            <h1>Admin Dashboard</h1>
            <div className={styles.options}>
                <Link to="/admin/orders" className={styles.optionCard}>Orders Management</Link>
                <Link to="/admin/products" className={styles.optionCard}>Products Management</Link>
                <Link to="/admin/clients" className={styles.optionCard}>Clients Management</Link>
            </div>
        </div>
    );
};

export default AdminDashboardPage;