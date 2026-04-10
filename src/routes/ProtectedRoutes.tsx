import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { BiLoader } from "react-icons/bi";

const ProtectedRoutes = () => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BiLoader size={30} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
