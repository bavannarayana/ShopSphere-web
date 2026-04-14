import type { Dispatch, SetStateAction } from "react";

const categories = ["All", "Clothing", "Electronics", "Shoes"];

type SideBarType = {
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: (sort: string) => void;
};

const Sidebar = ({
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
}: SideBarType) => {
  return (
    <aside className="h-[calc(100vh-4rem)] sticky top-16 bg-bg border-r border-borderMain text-primary p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Categories */}
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`block w-full text-left px-3 py-2 rounded ${
            selectedCategory === cat
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          {cat}
        </button>
      ))}

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full mt-4 p-2 border border-borderMain rounded"
      >
        <option value="">Default</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>
      {/* 🔥 Clear Filters (Nice UX) */}
      <button
        onClick={() => {
          setSelectedCategory("All");
          setSort("");
        }}
        className="w-full mt-4 px-3 py-2 rounded-lg text-sm border border-borderMain hover:bg-card transition cursor-pointer"
      >
        Clear Filters
      </button>
    </aside>
  );
};
export default Sidebar;
