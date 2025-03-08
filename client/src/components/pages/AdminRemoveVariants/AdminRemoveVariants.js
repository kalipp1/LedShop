import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "config";
import styles from "./AdminRemoveVariants.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from "components/common/Button/Button";

const AdminRemoveVariants = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        const fetchVariants = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`${API_URL}/products/${productId}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setVariants(data.colorVariants || []);
            } catch (error) {
                console.error("Error fetching variants:", error);
            }
        };

        fetchVariants();
    }, [productId]);

    const handleRemoveVariant = async (variantId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this variant?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${API_URL}/products/${productId}/variants/${variantId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to delete variant");

            setVariants(variants.filter(variant => variant.id !== variantId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.variantsContainer}>
            <Button variant={'backButton'} action={() => navigate(-1)} content={<FontAwesomeIcon icon={faCircleArrowLeft} />} />
            <h1>Variants Management</h1>
            {variants.length === 0 ? (
                <p>No variants found</p>
            ) : (
                <ul className={styles.variantsList}>
                    {variants.map(variant => (
                        <li key={variant.id} className={styles.variantItem}>
                            <p>Color: {variant.color} | Price: ${variant.price}</p>
                            <button 
                                className={styles.buttonRemove} 
                                onClick={() => handleRemoveVariant(variant.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminRemoveVariants;