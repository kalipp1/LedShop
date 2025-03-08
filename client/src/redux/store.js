import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import initialState from './initialState';
import { thunk } from 'redux-thunk';
import productsReducer from './productsRedux';
import ordersReducer from './ordersRedux';
import clientsReducer from './clientsRedux';
import cartReducer from './cartRedux';
import adminReducer from './adminRedux';

const subreducers = {
    products: productsReducer,
    orders: ordersReducer,
    clients: clientsReducer,
    cart: cartReducer,
    admin: adminReducer,
}

const reducer = combineReducers(subreducers);

const composedEnhancers = compose(
    applyMiddleware(thunk),
    composeWithDevTools()    
  );

  const store = createStore(
    reducer,
    initialState,
    composedEnhancers,
  );


export default store;