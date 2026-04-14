import type { Dispatch, SetStateAction } from "react";

type SideBarType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: (sort: string) => void;
};
const SidebarMobile = ({
  isOpen,
  setIsOpen,
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
}: SideBarType) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 text-primary bg-bg border-t border-borderMain rounded-t-2xl p-4 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-400 rounded-full mx-auto mb-4" />

        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          {["All", "Clothing", "Electronics", "Shoes"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-brand text-white"
                  : "hover:bg-card"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full mt-4 p-2 border rounded"
        >
          <option value="">Default</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        {/* Clear */}
        <button
          onClick={() => {
            setSelectedCategory("All");
            setSort("");
          }}
          className="w-full mt-4 px-3 py-2 border rounded"
        >
          Clear Filters
        </button>
      </div>
    </>
  );
};

export default SidebarMobile;
