import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "config";
import styles from "./AdminAddProduct.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from "components/common/Button/Button";

const AdminAddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [image, setImage] = useState(null);
    const [colorVariants, setColorVariants] = useState([]);
    const [status, setStatus] = useState(null);

    const addVariant = () => {
        setColorVariants([...colorVariants, { color: "", price: "", image: null }]);
    };

    const updateVariant = (index, field, value) => {
        const updatedVariants = [...colorVariants];
        updatedVariants[index][field] = value;
        setColorVariants(updatedVariants);
    };

    const removeVariant = (index) => {
        setColorVariants(colorVariants.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !price || !minPrice || !description || !categoryId || !image || colorVariants.some(v => !v.color || !v.price || !v.image)) {
            setStatus("clientError");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("minPrice", minPrice);
        formData.append("description", description);
        formData.append("categoryId", categoryId);
        formData.append("image", image);

        const colorVariantsData = colorVariants.map(v => ({
            color: v.color,
            price: Number(v.price)
        }));
        formData.append("colorVariants", JSON.stringify(colorVariantsData));

        colorVariants.forEach(variant => {
            formData.append("variantImages", variant.image);
        });

        try {
            const token = localStorage.getItem("token");
            console.log("📡 Wysyłam request z tokenem:", token);
            console.log("📦 Wysyłam FormData:");
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            const res = await fetch(`${API_URL}/api/products`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!res.ok) throw new Error("Server error");

            setStatus("success");
            setTimeout(() => navigate("/admin/products"), 2000);
        } catch (error) {
            setStatus("serverError");
        }
    };

    return (
        <div className={styles.addProductContainer}>
            <Button variant={'backButton'} action={() => navigate(-1)} content={<FontAwesomeIcon icon={faCircleArrowLeft} />} />
            <h1>Add New Product</h1>
            {status === "success" && <p className={styles.success}>Product added successfully! Redirecting...</p>}
            {status === "serverError" && <p className={styles.error}>Something went wrong. Try again.</p>}
            {status === "clientError" && <p className={styles.error}>Please fill in all fields.</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Product Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                <label>Minimum Price:</label>
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Category ID:</label>
                <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />

                <label>Upload Main Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                <h2>Color Variants</h2>
                {colorVariants.map((variant, index) => (
                    <div key={index} className={styles.variantBox}>
                        <label>Color:</label>
                        <input type="text" value={variant.color} onChange={(e) => updateVariant(index, "color", e.target.value)} />

                        <label>Price:</label>
                        <input type="number" value={variant.price} onChange={(e) => updateVariant(index, "price", e.target.value)} />

                        <label>Upload Variant Image:</label>
                        <input type="file" onChange={(e) => updateVariant(index, "image", e.target.files[0])} />

                        <button type="button" className={styles.removeButton} onClick={() => removeVariant(index)}>Remove Variant</button>
                    </div>
                ))}

                <button type="button" onClick={addVariant} className={styles.addButton}>Add Variant</button>
                <button type="submit" className={styles.addButton}>Add Product</button>
            </form>
        </div>
    );
};

export default AdminAddProduct;