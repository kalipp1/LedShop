import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminProductsDashboardPage.module.scss";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from "components/common/Button/Button";

const AdminProductsDashboardPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);

    return (
        <div className={styles.dashboardContainer}>
            <h1>Admin Products Dashboard</h1>
            <Button variant={'backButton'} action={() => navigate(-1)} content={<FontAwesomeIcon icon={faCircleArrowLeft} />} />
            <div className={styles.options}>
                <Link to="/admin/products/add" className={styles.optionCard}>Add Product</Link>
                <Link to="/admin/products/remove" className={styles.optionCard}>Delete Product</Link>
            </div>
        </div>
    );
};

export default AdminProductsDashboardPage;