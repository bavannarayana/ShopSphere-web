import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";
import Sidebar from "../components/SideBar";
import SidebarMobile from "../components/SideBarMobile";

const HomeLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="bg-white dark:bg-zinc-950 min-h-screen">
      <div className="max-w-360 mx-auto transition-colors duration-300">
        <NavBar setIsOpen={setIsOpen} />

        <div className="flex">
          <div className="hidden md:block w-52 lg:w-60 xl:w-64 shrink-0">
            <Sidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sort={sort}
              setSort={setSort}
            />
          </div>
          <div className="md:hidden">
            <SidebarMobile
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sort={sort}
              setSort={setSort}
            />
          </div>
          {/* ✅ FIXED */}
          <div className="flex-1 min-w-0 p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeLayout;
