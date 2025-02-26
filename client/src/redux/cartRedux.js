import initialState from "./initialState";

export const getCart = state => state.cart.items;

const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CLEAR_CART = createActionName('CLEAR_CART');

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });

const cartReducer = (statePart = initialState.cart, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...statePart,
                items: [...statePart.items, action.payload],
                total: statePart.total + action.payload.price
            };
        case REMOVE_FROM_CART:
            return {
                ...statePart,
                items: statePart.items.filter(item => item.id !== action.payload.id),
                total: statePart.total - action.payload.price
            };
        case CLEAR_CART:
            return { ...initialState };
        default:
            return statePart;
    }
};

export default cartReducer;