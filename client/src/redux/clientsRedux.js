import { API_URL } from "../config";
import axios from 'axios';
import initialState from "./initialState";

/* SELECTORS */
export const getClients = ({ clients }) => clients.data;
export const getClientById = ({ clients }, id) => clients.data.find(client => client._id === id);
// export const getProductSearched = ({ advertisements }, searchPhrase) => advertisements.data.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()) || ad.location.toLowerCase().includes(searchPhrase.toLowerCase()) );

/* ACTIONS */
const reducerName = 'clients';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_CLIENTS = createActionName('LOAD_CLIENTS');
const START_REQUEST = createActionName('START_REQUEST');

// Action name creator
export const loadClients = payload => ({ type: LOAD_CLIENTS, payload });
export const startRequest = () => ({ type: START_REQUEST });

export const loadClientsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/api/clients`);
            dispatch(loadClients(res.data));
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
const clientsReducer = (statePart = initialState.clients, action) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...statePart, loading: true };
        case LOAD_CLIENTS: 
            return { data: [...action.payload], loading: false };
        default:
            return statePart;
    };   
};

export default clientsReducer;