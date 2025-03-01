import initialState from "./initialState";

export const getCart = state => state.cart.items;

const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CLEAR_CART = createActionName('CLEAR_CART');
const UPDATE_CART_QUANTITY = createActionName('UPDATE_CART_QUANTITY');

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: { ...product, image: product.colorVariantImage } });
export const updateCartQuantity = (productId, colorVariantId, quantity) => ({
    type: UPDATE_CART_QUANTITY, payload: { productId, colorVariantId, quantity }
});
export const removeFromCart = (productId, colorVariantId) => ({
    type: REMOVE_FROM_CART, payload: { productId, colorVariantId }
});
export const clearCart = () => ({ type: CLEAR_CART });

const cartReducer = (statePart = initialState.cart, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = statePart.items.find(
                item => item.id === action.payload.id && item.colorVariantId === action.payload.colorVariantId
            );
            if (existingItem) {
                return {
                    ...statePart,
                    items: statePart.items.map(item =>
                        item.id === action.payload.id && item.colorVariantId === action.payload.colorVariantId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...statePart,
                    items: [...statePart.items, { 
                        ...action.payload, 
                        quantity: 1,
                        image: action.payload.colorVariantImage
                    }],
                };
            }
        case UPDATE_CART_QUANTITY:
            return {
                ...statePart,
                items: statePart.items.map(item =>
                    item.id === action.payload.productId && item.colorVariantId === action.payload.colorVariantId
                        ? { ...item, quantity: Math.min(Math.max(action.payload.quantity, 1), 99) }
                        : item
                )
            };
        case REMOVE_FROM_CART:
            return {
                ...statePart,
                items: statePart.items.filter(item =>
                    !(item.id === action.payload.productId && item.colorVariantId === action.payload.colorVariantId)
                )
            };
        case CLEAR_CART:
            return { ...statePart, items: [] };
        default:
            return statePart;
    }
};

export default cartReducer;