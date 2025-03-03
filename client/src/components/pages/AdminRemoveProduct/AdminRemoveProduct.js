import { useEffect, useState } from "react";
import { API_URL } from "config";
import styles from "./AdminRemoveProduct.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getAllProducts, loadProductsRequest, removeProductRequest } from "../../../redux/productsRedux";

const AdminRemoveProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const prods = useSelector(getAllProducts);

    useEffect(() => {
        dispatch(loadProductsRequest());
    }, [dispatch]);

    const handleRemove = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        dispatch(removeProductRequest(id));
    };

    return (
        <div className={styles.productsContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
            <h1>Product Management</h1>

            {prods.length === 0 ? (
                <p>No products found</p>
            ) : (
                <ul className={styles.productList}>
                    {prods.map(product => (
                        <li className={styles.productItem} key={product.id}>
                            <span className={styles.productText}>
                                {product.name} - ${product.price}
                            </span>
                            <button className={styles.buttonRemove} onClick={() => handleRemove(product.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default AdminRemoveProduct;