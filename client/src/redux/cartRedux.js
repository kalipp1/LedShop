import initialState from "./initialState";

const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CLEAR_CART = createActionName('CLEAR_CART');

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: [...state.items, action.payload],
                total: state.total + action.payload.price
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                total: state.total - action.payload.price
            };
        case CLEAR_CART:
            return { ...initialState };
        default:
            return state;
    }
};

export default cartReducer;