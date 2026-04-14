import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Spinner from "../components/Spinner";

const ProtectedRoutes = () => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg text-primary">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
