import { useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";
import { AuthContext, type User } from "./AuthContext";
import { useLocation } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");

        const isAuthPage =
          location.pathname === "/login" || location.pathname === "/signup";

        if (!token || isAuthPage) return;

        const res = await api.get("/auth/me");
        setUser(res.data.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
