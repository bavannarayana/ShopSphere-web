import {
  PiMoonBold,
  PiShoppingCartBold,
  PiSunBold,
  PiUserBold,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import useTheme from "../customs/useTheme";

const NavBar = () => {
  const { darkMode, setDarkMode } = useTheme();

  const toggleDarkMode = () =>
    setDarkMode((prev: boolean) => {
      console.log("toggling:", !prev);
      return !prev;
    });

  return (
    <nav className="flex items-center justify-between py-4 px-10 bg-white dark:bg-gray-950 text-black dark:text-white shadow-[0_3px_10px_-6px_rgba(0,0,0,0.25)] transition-colors duration-300">
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
          <Link to="/cart" className="flex items-center gap-1">
            <PiShoppingCartBold size={20} /> Cart
          </Link>
          <Link to="/profile" className="flex items-center gap-1">
            <PiUserBold size={20} /> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
