import { API_URL } from "../config";
import axios from 'axios';
import initialState from "./initialState";

/* SELECTORS */
export const getOrders = ({ orders }) => orders.data;
export const getOrderById = ({ orders }, id) => orders.data.find(ord => ord._id === id);
// export const getProductSearched = ({ advertisements }, searchPhrase) => advertisements.data.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()) || ad.location.toLowerCase().includes(searchPhrase.toLowerCase()) );

/* ACTIONS */
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_ORDERS = createActionName('LOAD_ORDERS');
const START_REQUEST = createActionName('START_REQUEST');

// Action name creator
export const loadOrders = payload => ({ type: LOAD_ORDERS, payload });
export const startRequest = () => ({ type: START_REQUEST });

export const loadOrdersRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/api/orders`);
            dispatch(loadOrders(res.data));
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
const ordersReducer = (statePart = initialState.orders, action) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...statePart, loading: true };
        case LOAD_ORDERS: 
            return { data: [...action.payload], loading: false };
        default:
            return statePart;
    };   
};

export default ordersReducer;