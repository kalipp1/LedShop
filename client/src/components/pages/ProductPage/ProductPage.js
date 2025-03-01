import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../../../redux/productsRedux";
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Button from "components/common/Button/Button";
import { IMGS_URL } from "config";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartRedux";
import { Toast, ToastContainer } from "react-bootstrap";

const ProductPage = () => {
    const { id } = useParams();
    const prod = useSelector(state => getProductById(state, id));
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!prod?.colorVariants?.length) return;

        const whiteVariant = prod.colorVariants.find(variant => variant.color.toLowerCase() === "white");
        setSelectedVariant(whiteVariant || prod.colorVariants[0]);
    }, [prod]);

     if (!prod) {
        return <Navigate to='/' />;
    }

    const handleAddToCart = () => {
        if (!prod) return; 
        const productToAdd = {
            id: prod.id,
            colorVariantId: selectedVariant.id,
            name: prod.name,
            price: selectedVariant ? selectedVariant.price : prod.price,
            imageUrl: selectedVariant ? selectedVariant.imageUrl : prod.imageUrl,
            variant: selectedVariant ? selectedVariant.color : "default",
            quantity: 1
        };
        dispatch(addToCart(productToAdd));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className={styles.allPage}>
            <h1 className={styles.bigH1}>
                {prod.name}
            </h1>
            <section className={styles.prodSection}>
                <div className={styles.leftSide}>
                    <img className={styles.prodImage} src={`${IMGS_URL}${selectedVariant ? selectedVariant.imageUrl : prod.imageUrl}`} alt={prod.name} />
                </div>
                <div className={styles.rightSide}>
                    <p><span className={styles.big}>Description:</span> {prod.description}</p>
                    <p><span className={styles.big}>Price:</span> {selectedVariant ? `$${selectedVariant.price}` : `$${prod.price}`}</p>

                    {prod.colorVariants && prod.colorVariants.length > 0 && (
                        <div className={styles.variants}>
                            <p className={styles.big}>Available colors:</p>
                            <div className={styles.variantList}>
                                {prod.colorVariants.map(variant => (
                                    <button key={variant.id} className={`${styles.variantButton} ${selectedVariant?.id === variant.id ? styles.selected : ''}`} onClick={() => setSelectedVariant(variant)}>
                                    <img src={`${IMGS_URL}${variant.imageUrl}`} alt={variant.color} className={styles.variantImage} />
                                </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={styles.button}>
                        <Button variant={'addTo'} action={handleAddToCart} content={'Add to Cart!'} />
                    </div>
                </div>
            </section>
            <ToastContainer position="top-center" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Success!</strong>
                    </Toast.Header>
                    <Toast.Body className={styles.toastDark}>{prod.name} has been added to your cart!</Toast.Body>
                </Toast>
            </ToastContainer>
      </div>
    )

}

export default ProductPage;