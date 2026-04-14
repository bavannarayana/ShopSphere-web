import type { QueryFunctionContext } from "@tanstack/react-query";
import api from "../api/axios";

export interface Product {
  id: string; // API gives string, not number
  title: string;
  description: string;
  category: string;

  price: number;
  originalPrice: number;

  rating: number;
  reviews: number;

  image: string; // main image
  images: string[]; // gallery images

  inStock: boolean;
  featured: boolean;

  createdAt: string; // ISO date string
  updatedAt: string;
}

type Cursor = {
  id: string;
  date: string;
} | null;

export type ProductsResponse = {
  data: Product[];
  nextCursorId: string | null;
  nextCursorDate: string | null;
  hasMore: boolean;
};

const fetchProducts = async (
  context: QueryFunctionContext,
): Promise<ProductsResponse> => {
  const pageParam = context.pageParam as Cursor;

  const params: Record<string, string | number> = { limit: 6 };

  if (pageParam) {
    params.cursorId = pageParam.id;
    params.cursorDate = pageParam.date;
  }

  const res = await api.get("/products", { params });
  return res.data;
};

export default fetchProducts;
