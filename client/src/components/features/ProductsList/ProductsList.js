import { getAllProducts, loadProductsRequest } from "../../../redux/productsRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import ProductCard from "../ProductCard/ProductCard";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

const getRandomImages = (products, count = 3) => {
    let allImages = [];

    products.forEach(product => {
        if (product.imageUrl) allImages.push(product.imageUrl);

        console.log("Product:", product.name, "Image:", product.imageUrl);
        console.log("Color Variants:", product.colorVariants);

        
        if (product.colorVariants) {
            product.colorVariants.forEach(variant => {
                if (variant.imageUrl) allImages.push(variant.imageUrl);
            });
        }
    });

    let shuffled = allImages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const ProductsList = () =>{
    const dispatch = useDispatch();

    const prods = useSelector(getAllProducts);

    useEffect(() => {
        console.log("Dispatching loadProductsRequest...");
        dispatch(loadProductsRequest());
    }, [dispatch]);

    const randomImages = prods.length > 0 ? getRandomImages(prods, 3) : [];

    return (
        <section>
            <ProductCarousel images={randomImages} />
            {prods.length < 1 && 
                <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                {prods.map(prod => (
                    <ProductCard key={ prod.id } name={ prod.name } price={ prod.price } minPrice={ prod.minPrice } image={ prod.imageUrl } id={ prod.id } />
                ))}
            </Row>
        </section>
    )
}

export default ProductsList;