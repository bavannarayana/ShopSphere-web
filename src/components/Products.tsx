import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "./Card";
import { useCallback, useRef } from "react";
import type { Product, ProductsResponse } from "../hooks/useProducts";
import fetchProducts from "../hooks/useProducts";

const Products = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<ProductsResponse>({
      queryKey: ["products"],
      queryFn: fetchProducts,
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasMore) return undefined;

        return {
          id: lastPage.nextCursorId!,
          date: lastPage.nextCursorDate!,
        };
      },
    });

  // Flatten
  const products = data?.pages.flatMap((page) => page.data) || [];

  // ✅ Limit DOM (VERY IMPORTANT)
  const MAX_RENDER = 20;
  const visibleProducts = products.slice(-MAX_RENDER);

  // Intersection Observer
  const observer = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef(false);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      // if already exist then disconnect
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry.isIntersecting && hasNextPage && !isFetchingRef.current) {
            isFetchingRef.current = true;

            fetchNextPage().finally(() => {
              // 🔥 small delay prevents instant retrigger
              setTimeout(() => {
                isFetchingRef.current = false;
              }, 300);
            });
          }
        },
        {
          rootMargin: "150px",
          threshold: 0.5,
        },
      );

      observer.current.observe(node);
    },
    [hasNextPage, fetchNextPage],
  );

  return (
    <div className="min-h-[80vh] mt-15">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-primary">
          Products
        </h1>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-60 rounded-xl bg-gray-200 dark:bg-zinc-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {visibleProducts.map((item: Product, index: number) => {
            if (index === visibleProducts.length - 1) {
              return (
                <div ref={lastElementRef} key={item.id}>
                  <Card item={item} priority={index < 2} />
                </div>
              );
            }

            return <Card key={item.id} item={item} priority={index < 2} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
