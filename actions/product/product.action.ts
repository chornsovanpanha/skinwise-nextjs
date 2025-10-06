"use server";
import { ApiError, ApiResponse, fetcher } from "@/lib/axios/api";
import { ProductIngredientResponse, ProductWithBrandAndImages } from "@/types";

export const globalSearchAction = async (params: { search: string }) => {
  const { data, error, success } = await fetcher<
    ApiResponse<ProductIngredientResponse>
  >(`/global?search=${params?.search}`);

  if (!success) {
    throw new ApiError(error ?? "Something went wrong");
  }
  return { data: data?.data };
};

export const productSearchAction = async (params: { search: string }) => {
  const { data, error, success } = await fetcher<
    ApiResponse<ProductWithBrandAndImages[]>
  >(`/products?search=${params?.search}`);

  if (!success) {
    throw new ApiError(error ?? "Something went wrong");
  }

  return { data: data?.data };
};
