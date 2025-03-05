import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
    const isAuthenticated = useSelector(state => state.admin.isAuthenticated);
    const token = localStorage.getItem("token");

    return (isAuthenticated || token) ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;