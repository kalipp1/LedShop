import { API_URL } from "../config";
import axios from 'axios';
import initialState from "./initialState";

/* SELECTORS */
export const getAllProducts = ({ products }) => products.data;
export const getProductById = ({ products }, id) => products.data.find(prod => prod.id === id);

/* ACTIONS */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
const START_REQUEST = createActionName('START_REQUEST');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
const ADD_PRODUCT = createActionName('ADD_PRODUCT');

// Action name creator
export const loadProducts = payload => ({ type: LOAD_PRODUCTS, payload });
export const startRequest = () => ({ type: START_REQUEST });
export const removeProduct = id => ({ type: REMOVE_PRODUCT, payload: id });
export const addProduct = product => ({ type: ADD_PRODUCT, payload: product });

export const loadProductsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/api/products`);
            console.log("RESPONSE FROM API:", res.data);
            dispatch(loadProducts(res.data));
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const removeProductRequest = (productId) => async dispatch => {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.delete(`${API_URL}/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.status === 200) throw new Error("Failed to delete product");

        dispatch(removeProduct(productId));
    } catch (err) {
        console.error("Error removing product:", err.message);
    }
};

export const addProductRequest = (productData) => async dispatch => {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.post(`${API_URL}/api/products`, productData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status !== 201) throw new Error("Failed to add product");

        dispatch(addProduct(res.data));
    } catch (err) {
        console.error("Error adding product:", err.message);
    }
};


//Reducer
const productsReducer = (statePart = initialState.products, action) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...statePart, loading: true };
        case LOAD_PRODUCTS: 
            return { data: [...action.payload], loading: false };
        case REMOVE_PRODUCT:
            return { 
                ...statePart, 
                data: statePart.data.filter(product => product.id !== action.payload)
            };
        case ADD_PRODUCT:
            return {
                ...statePart,
                data: [...statePart.data, action.payload]
            };
        default:
            return statePart;
    };   
};

export default productsReducer;