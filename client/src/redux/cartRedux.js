import initialState from "./initialState";

export const getCart = state => state.cart.items;

const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CLEAR_CART = createActionName('CLEAR_CART');
const UPDATE_CART_QUANTITY = createActionName('UPDATE_CART_QUANTITY');

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const updateCartQuantity = (productId, variant, quantity) => ({ type: UPDATE_CART_QUANTITY, payload: { productId, variant, quantity }});
export const removeFromCart = (productId, variant) => ({ type: REMOVE_FROM_CART, payload: { productId, variant } });

const cartReducer = (statePart = initialState.cart, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = statePart.items.find(item => item.id === action.payload.id && item.variant === action.payload.variant);
            if (existingItem) {
                return {
                    ...statePart,
                    items: statePart.items.map(item => item.id === action.payload.id && item.variant === action.payload.variant ? { ...item, quantity: item.quantity + 1 } : item ),
                    total: statePart.total + action.payload.price
                };
            } else {
                return {
                    ...statePart,
                    items: [...statePart.items, { ...action.payload, quantity: 1 }],
                    total: statePart.total + action.payload.price
                };
            }
        case UPDATE_CART_QUANTITY:
            return {
                ...statePart,
                items: statePart.items.map(item => item.id === action.payload.productId && item.variant === action.payload.variant ? { ...item, quantity: Math.max(action.payload.quantity, 1) } : item ),
                total: statePart.items.reduce((total, item) => item.id === action.payload.productId && item.variant === action.payload.variant ? total + (action.payload.quantity - item.quantity) * item.price : total, statePart.total)
            };
        case REMOVE_FROM_CART:
            const itemToRemove = statePart.items.find(item => item.id === action.payload.productId && item.variant === action.payload.variant);
            return {
                ...statePart,
                items: statePart.items.filter(item => !(item.id === action.payload.productId && item.variant === action.payload.variant)),
                total: itemToRemove ? statePart.total - (itemToRemove.price * itemToRemove.quantity) : statePart.total
            };
        case CLEAR_CART:
            return { ...initialState };
        default:
            return statePart;
    }
};

export default cartReducer;