import { PiShoppingCartBold, PiUserBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-10 shadow">
      <div>
        <img src="/assets/Logo.png" alt="Logo" className="max-w-50 h-12" />
      </div>
      <div className="flex gap-5">
        <Link to="/cart" className="flex items-center gap-1">
          <PiShoppingCartBold size={20} /> Cart
        </Link>
        <Link to="/profile" className="flex items-center gap-1">
          <PiUserBold size={20} /> Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
