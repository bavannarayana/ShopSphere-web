import {
  PiMoonBold,
  PiShoppingCartBold,
  PiSunBold,
  PiUserBold,
} from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const toggleDarkMode = () => toggleTheme();

  const handleLogout = async () => {
    const res = await api.get("/logout");
    if (res.status === 200) {
      setUser(null);
      navigate("login");
      localStorage.removeItem("theme");
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-10 bg-white dark:bg-zinc-950 text-black dark:text-white shadow-[0_3px_10px_-6px_rgba(0,0,0,0.25)] border-b border-b-gray-200 dark:border-b-zinc-700 ">
      <div>
        <img src="/assets/Logo.png" alt="Logo" className="max-w-50 h-10" />
      </div>
      <div className="flex gap-5 items-center">
        <button
          className="hover:cursor-pointer transition-all"
          onClick={() => toggleDarkMode()}
        >
          {darkMode ? <PiSunBold size={20} /> : <PiMoonBold size={20} />}
        </button>
        <div className="flex gap-5">
          <Link to="/dashboard/cart" className="flex items-center gap-1">
            <PiShoppingCartBold size={20} /> Cart
          </Link>
          <Link to="/profile" className="flex items-center gap-1">
            <PiUserBold size={20} /> Profile
          </Link>
          <button
            className="hover:cursor-pointer bg-error px-4 py-1 rounded-md text-white"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
