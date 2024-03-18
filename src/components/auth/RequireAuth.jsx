import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();


  return(
    auth?.roleArray?.find(role => allowedRoles?.includes(role))
    ? <Outlet />
    : auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace /> //remplazar por el login
    
        
  );    
};

export default RequireAuth;
