import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { BiLoader } from "react-icons/bi";

const PublicRoutes = () => {
  const { user, loading } = useAuthContext();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BiLoader size={30} />
      </div>
    );

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default PublicRoutes;
