import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoutes = () => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
