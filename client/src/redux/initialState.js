const initialState = {
    products: { data: [], loading: false },
    clients: { data: [], loading: false },
    orders: { data: [], loading: false },
    cart: { items: [], total: 0 },
    admin: { isAuthenticated: false, user: null, loading: false, error: null },
  };
  
  export default initialState;