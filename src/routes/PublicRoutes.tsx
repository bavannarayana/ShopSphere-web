import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Spinner from "../components/Spinner";

const PublicRoutes = () => {
  const { user, loading } = useAuthContext();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg text-primary">
        <Spinner />
      </div>
    );

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default PublicRoutes;
