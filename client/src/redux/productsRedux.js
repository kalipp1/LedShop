import { API_URL } from "../config";
import axios from 'axios';
import initialState from "./initialState";

/* SELECTORS */
export const getProducts = ({ products }) => products.data;
export const getProductById = ({ products }, id) => products.data.find(prod => prod._id === id);
// export const getProductSearched = ({ advertisements }, searchPhrase) => advertisements.data.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()) || ad.location.toLowerCase().includes(searchPhrase.toLowerCase()) );

/* ACTIONS */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
const START_REQUEST = createActionName('START_REQUEST');

// Action name creator
export const loadProducts = payload => ({ type: LOAD_PRODUCTS, payload });
export const startRequest = () => ({ type: START_REQUEST });

export const loadProductsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/api/products`);
            dispatch(loadProducts(res.data));
        } catch (err) {
            console.log(err.message);
        }
    }
}

//API Req
// export const fetchAds = () => {
//     return (dispatch) => {
//         fetch(`${API_URL}/api/ads`)
//             .then(res => res.json())
//             .then(advertisements => dispatch(loadAds(advertisements)));
//     };
//   };

//Reducer
const productsReducer = (statePart = initialState.products, action) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...statePart, loading: true };
        case LOAD_PRODUCTS: 
            return { data: [...action.payload], loading: false };
        default:
            return statePart;
    };   
};

export default productsReducer;