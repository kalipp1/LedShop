import initialState from "./initialState";

const reducerName = 'admin';
const createActionName = name => `app/${reducerName}/${name}`;
const ADMIN_LOGIN_REQUEST = createActionName('ADMIN_LOGIN_REQUEST');
const ADMIN_LOGIN_SUCCESS = createActionName('ADMIN_LOGIN_SUCCESS');
const ADMIN_LOGIN_FAILURE = createActionName('ADMIN_LOGIN_FAILURE');
const ADMIN_LOGOUT = createActionName('ADMIN_LOGOUT');

export const adminLoginRequest = () => ({ type: ADMIN_LOGIN_REQUEST });

export const adminLoginSuccess = (adminData) => ({
    type: ADMIN_LOGIN_SUCCESS,
    payload: adminData,
});

export const adminLoginFailure = (error) => ({
    type: ADMIN_LOGIN_FAILURE,
    payload: error,
});

export const adminLogout = () => ({
    type: ADMIN_LOGOUT,
});


const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return { ...state, loading: true, error: null };

        case ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
                error: null
            };

        case ADMIN_LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: action.payload
            };

        case ADMIN_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: null
            };

        default:
            return state;
    }
};

export default adminReducer;