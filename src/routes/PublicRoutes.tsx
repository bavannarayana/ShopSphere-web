import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PublicRoutes = () => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default PublicRoutes;
