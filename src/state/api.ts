/* eslint-disable @typescript-eslint/no-unused-vars */

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export interface Products {
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}

export interface NewProduct {
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalValue: number;
  changePercentage: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Products[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "./dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Products[], string | void>({
      query: (search) => ({
        url: "./products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Products, NewProduct>({
      query: (newProduct) => ({
        url: "./products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
} = api;
