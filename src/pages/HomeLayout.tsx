import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <main className="bg-white dark:bg-zinc-950 min-h-screen">
      <div className="max-w-310 mx-auto  transition-colors duration-300">
        <NavBar />
        <Outlet />
      </div>
    </main>
  );
};

export default HomeLayout;
