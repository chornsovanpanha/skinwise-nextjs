import { AppEnv } from "@/config/env";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  Method,
} from "axios";

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
  timeout: 30000,
  withCredentials: true,
});
axios.defaults.withCredentials = true;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const data = error.response.data;

      console.log("Axios error", data);
      const message =
        data?.error ||
        data?.message ||
        error.response.statusText ||
        "Unknown API error";
      return Promise.reject(
        new ApiError<ApiErrorResponse>(
          message,
          "API Error",
          error.response.status,
          data
        )
      );
    } else if (error.request) {
      return Promise.reject(
        new ApiError("No response from server", "API Error")
      );
    } else {
      return Promise.reject(new ApiError(error.message, "API Error"));
    }
  }
);

export type ApiResponse<T> = AxiosResponse<T>;

export interface RequestResult<T> {
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
    const response: ApiResponse<T> = await api.request<T, AxiosResponse<T>, D>({
      url,
      method,
      data,
      ...config,
      withCredentials: true,
      headers: {
        ...config?.headers,
        Cookie: config?.headers?.Cookie ?? "",
      },
    });
    return {
      success: true,
      data: response.data,
      error: null,
      headers: response.headers,
    };
  } catch (err) {
    const error = err as ApiError;
    return { success: false, data: null, error: error?.message };
  }
};

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<RequestResult<T>> =>
  requester<T, Record<string, never>>(url, "GET", undefined, config);
