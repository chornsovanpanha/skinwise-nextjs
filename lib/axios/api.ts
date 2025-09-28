import { AppEnv } from "@/config/env";
import { PaginationMeta } from "@/types";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  Method,
} from "axios";
import { cookies } from "next/headers";
export type BaseResponse<T> = {
  title: string;
  message: string;
  data: T;
  success: boolean;
  code: string;
  headers?: Record<string, string | string[]>;
  totalRecords?: number;
  totalPages?: number;
  page?: number;
  perPage?: number;
};

export interface ApiErrorResponse {
  error: string;
  message: string;
  [key: string]: unknown;
}

export class ApiError<T = ApiErrorResponse> extends Error {
  title?: string;
  status?: number;
  data?: T;

  constructor(message: string, title?: string, status?: number, data?: T) {
    super(message);
    this.name = "ApiError";
    this.title = title;
    this.status = status;
    this.data = data;
  }
}

const api: AxiosInstance = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: `${AppEnv.apiUrl + "/api"}`,
  timeout: 40000,
  withCredentials: true,
});
axios.defaults.withCredentials = true;
api.interceptors.request.use(async (config) => {
  try {
    const cookieHeader = await cookies();
    if (cookieHeader && config.headers) {
      config.headers.set("cookie", cookieHeader?.toString());
    }
  } catch {}
  return config;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    console.log("Axios interceptor error", error.response);
    return Promise.reject(error);
  }
);

export type ApiResponse<T> = AxiosResponse<T>;

export interface RequestResult<T> extends Partial<PaginationMeta> {
  success: boolean;
  error: string | null;
  data: T | null;
  headers?: Partial<AxiosResponseHeaders>;
}

export const requester = async <T, D = Record<string, unknown>>(
  url: string,
  method: Method = "GET",
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<RequestResult<T>> => {
  try {
    console.log("API>>> URL", url);
    const response: BaseResponse<T> = await api.request<T, BaseResponse<T>, D>({
      url,
      method,
      data,
      ...config,
      withCredentials: true,
      headers: {
        ...config?.headers,
        apiKey: AppEnv.apiKey,
        Cookie: config?.headers?.Cookie ?? "",
      },
    });

    // console.log("Aixios header is ", config?.headers?.Cookie ?? "");
    return {
      success: true,
      data: response.data,
      error: null,
      headers: response.headers,
      // page: response?.data?.page,
      // perPage: response?.data?.perPage,
      // totalPages: response?.data?.totalPages,
      // totalRecords: response.data?.totalRecords,
    };
  } catch (err) {
    return handleAxiosError<T>(err as AxiosError<AxiosErrorResponse<T>>);
  }
};

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<RequestResult<T>> =>
  requester<T, Record<string, never>>(url, "GET", undefined, config);

interface AxiosErrorResponse<T = unknown> {
  data?: T;
  error?: string;
}
export const handleAxiosError = <T = unknown>(
  err: AxiosError<AxiosErrorResponse<T>>
): RequestResult<T> => {
  console.log("Axios function call error:", err?.response?.data);

  if (err.response?.data) {
    const errData = err.response.data;
    return {
      success: false,
      data: errData.data ?? null,
      error: errData.error ?? "API Error",
      headers: err.response.headers,
    };
  }

  // Fallback if AxiosError has no response data
  return {
    success: false,
    data: null,
    error: err.message ?? "Unknown Axios error",
    headers: undefined,
  };
};
