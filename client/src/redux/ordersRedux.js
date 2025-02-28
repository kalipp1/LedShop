import { API_URL } from "../config";
import axios from 'axios';
import initialState from "./initialState";

/* SELECTORS */
export const getOrders = ({ orders }) => orders.data;
export const getOrderById = ({ orders }, id) => orders.data.find(ord => ord.id === id);
// export const getProductSearched = ({ advertisements }, searchPhrase) => advertisements.data.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()) || ad.location.toLowerCase().includes(searchPhrase.toLowerCase()) );

/* ACTIONS */
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;
const CREATE_ORDER = createActionName('CREATE_ORDER');
const CANCEL_ORDER = createActionName('CANCEL_ORDER');
const GET_ORDER = createActionName('GET_ORDER');
const LOAD_ORDERS = createActionName('LOAD_ORDERS');
const START_REQUEST = createActionName('START_REQUEST');

// Action name creator
export const loadOrders = payload => ({ type: LOAD_ORDERS, payload });
export const startRequest = () => ({ type: START_REQUEST });
export const createOrder = (order) => ({ type: CREATE_ORDER, payload: order });
export const getOrder = (order) => ({ type: GET_ORDER, payload: order });
export const cancelOrder = (orderId) => ({ type: CANCEL_ORDER, payload: orderId });

export const createOrderRequest = (orderData) => async (dispatch) => {
    try {
        dispatch(startRequest());
        const res = await axios.post(`${API_URL}/api/orders`, orderData);
        dispatch(createOrder(res.data));
    } catch (error) {
        console.error("Error creating order:", error);
    }
};

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

export const cancelOrderRequest = (orderId) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/api/orders/${orderId}`);
        dispatch(cancelOrder(orderId));
    } catch (error) {
        console.error("Error canceling order:", error);
    }
};

//Reducer
const ordersReducer = (statePart = initialState.orders, action) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...statePart, loading: true };
        case LOAD_ORDERS: 
            return { data: [...action.payload], loading: false };
        case CREATE_ORDER:
            return { ...statePart, data: [...(statePart.data || []), action.payload] };
        case GET_ORDER:
            return { ...statePart, data: [action.payload] };
        case CANCEL_ORDER:
            return { ...statePart, data: (statePart.data || []).filter((order) => order.id !== action.payload),};
        default:
            return statePart;
    };   
};

export default ordersReducer;