"use server";
import { BrandQueryParams } from "@/hooks/api/brands/useBrand";
import { ApiError, ApiResponse, fetcher, requester } from "@/lib/axios/api";
import { defaultState } from "@/lib/axios/data";
import { Brand } from "@/types";
import { filteredParams } from "@/utils/helpers/SearchParams";
import { BrandFormValues } from "@/utils/schema";

export const brandListingAction = async (params?: BrandQueryParams) => {
  const searchParams = params
    ? new URLSearchParams(filteredParams(params))
    : "";
  const { data, error, success, totalRecords } = await fetcher<
    ApiResponse<Brand[]>
  >(`/brands?${searchParams}`);

  if (!success) {
    throw new ApiError(error ?? "Something went wrong");
  }
  return { data: data?.data, totalRecords: totalRecords ?? 10 };
};
export const getBrandIdAction = async (params?: { id: string }) => {
  const { data, error, success } = await fetcher<ApiResponse<Brand>>(
    `/brands/${params?.id}`
  );

  if (!success) {
    throw new ApiError(error ?? "Something went wrong");
  }
  return { data: data?.data };
};

export const brandUpdateAction = async (
  id: string,
  payload: BrandFormValues
) => {
  const { data, error, success } = await requester<ApiResponse<Brand>>(
    `/brands/${id}`,
    "PUT",
    { ...payload }
  );

  console.log("UPdate action is", error, success, data);
  if (!success) {
    return { ...defaultState, success, error };
  }
  return { ...defaultState, data: data?.data, success, error: error };
};

export const brandCreateAction = async (payload?: BrandFormValues) => {
  const { data, error, success } = await requester<ApiResponse<Brand[]>>(
    `/brands`,
    "post",
    { ...payload }
  );

  if (!success) {
    return { ...defaultState, success, error };
  }
  return { ...defaultState, data: data?.data, success, error: error };
};

export const brandDeleteAction = async (params?: { id: string }) => {
  const { data, error, success } = await requester<ApiResponse<Brand>>(
    `/brands/${params?.id}`,
    "DELETE"
  );

  if (!success) {
    return { ...defaultState, success, error };
  }
  return { ...defaultState, data: data?.data, success, error: error };
};
