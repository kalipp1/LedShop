import { API_URL } from "../config";
import axios from 'axios';
import initialState from "./initialState";

/* SELECTORS */
export const getClients = ({ clients }) => clients.data;
export const getClientById = ({ clients }, id) => clients.data.find(client => client.id === id);

/* ACTIONS */
const reducerName = 'clients';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_CLIENTS = createActionName('LOAD_CLIENTS');
const GET_CLIENT = createActionName('GET_CLIENT');
const START_REQUEST = createActionName('START_REQUEST');

// Action name creator
export const loadClients = payload => ({ type: LOAD_CLIENTS, payload });
export const getClient = (client) => ({ type: GET_CLIENT, payload: client });
export const startRequest = () => ({ type: START_REQUEST });

export const loadClientsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            const token = localStorage.getItem("token");
            let res = await axios.get(`${API_URL}/api/clients`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(loadClients(res.data));
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const loadClientByIdRequest = (clientId) => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            const token = localStorage.getItem("token");
            let res = await axios.get(`${API_URL}/api/clients/${clientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(getClient(res.data));
        } catch (err) {
            console.log(err.message);
        }
    }
}

//Reducer
const clientsReducer = (statePart = initialState.clients, action) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...statePart, loading: true };
        case LOAD_CLIENTS: 
            return { data: [...action.payload], loading: false };
        case GET_CLIENT:
            return {  ...statePart, data: [action.payload]};
        default:
            return statePart;
    };   
};

export default clientsReducer;