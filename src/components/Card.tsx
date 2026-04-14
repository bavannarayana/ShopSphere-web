import { memo, useState } from "react";
import type { Product } from "../hooks/useProducts";

const Card = ({ item, priority }: { item: Product; priority?: boolean }) => {
  const [qty, setQty] = useState(0);

  return (
    <div className="bg-card text-primary rounded-xl p-3 shadow-sm hover:shadow-md transition flex flex-col h-full [content-visibility:auto]">
      {/* Image */}
      <div className="aspect-square overflow-hidden rounded-lg mb-3">
        <img
          src={item.image}
          alt={item.title}
          width={300}
          height={300}
          className="w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </div>

      <h1 className="font-semibold text-sm line-clamp-1">{item.title}</h1>
      <p className="text-lg font-bold mt-1">₹{item.price}</p>
      <p className="text-xs text-muted-foreground line-clamp-2 min-h-8 mt-1">
        {item.description}
      </p>

      {/* 🔥 Actions */}
      <div className="mt-3 flex flex-col gap-2">
        {/* Add to Cart / Qty Control */}
        {qty === 0 ? (
          <button
            onClick={() => setQty(1)}
            className="w-full py-2 rounded-lg bg-brand text-white hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between border border-borderMain rounded-lg px-2 py-1">
            <button
              onClick={() => setQty((prev) => Math.max(0, prev - 1))}
              className="px-3 text-lg font-bold"
            >
              -
            </button>
            <span className="font-medium">{qty}</span>
            <button
              onClick={() => setQty((prev) => prev + 1)}
              className="px-3 text-lg font-bold"
            >
              +
            </button>
          </div>
        )}

        {/* Buy Now */}
        <button className="w-full py-2 rounded-lg border border-borderMain hover:bg-card transition cursor-pointer">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default memo(Card, (prev, next) => {
  return prev.item.id === next.item.id && prev.priority === next.priority;
});
