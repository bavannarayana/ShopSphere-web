import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import type { Dispatch, SetStateAction } from "react";

const NavBar = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const toggleDarkMode = () => toggleTheme();

  const handleLogout = async () => {
    const res = await api.get("/logout");
    if (res.status === 200) {
      setUser(null);
      navigate("/login");
      localStorage.removeItem("theme");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-10 bg-bg text-primary border-b border-b-borderMain">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          ☰
        </button>

        <img
          src="/assets/Logo.webp"
          alt="brand logo"
          aria-label="brand logo"
          className="h-8 sm:h-10"
        />
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => toggleDarkMode()} className="cursor-pointer">
          {darkMode ? "☀️" : "🌙"}
        </button>

        <Link to="/dashboard/cart" className="flex items-center gap-1">
          Cart
        </Link>
        <Link to="/profile" className="flex items-center gap-1">
          Profile
        </Link>

        <button
          className="bg-main text-primary px-3 py-1 rounded cursor-pointer border border-borderMain"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
