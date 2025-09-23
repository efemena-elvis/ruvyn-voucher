import { ref } from "vue";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const baseURL = ref(import.meta.env.VITE_API_BASE_URL);
const apiVersion = ref(import.meta.env.VITE_API_VERSION);

export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}


export function useApi<T = any>() {
  const setBaseURL = (url: string) => {
    baseURL.value = url;
  };

  const processApiRequest = async (
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axios({
        url,
        baseURL: `${baseURL.value}/${apiVersion.value}`,
        method: config.method || "GET",
        ...config,
      });

      return {
        status: response.status,
        data: response.data,
        message: response.statusText,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
        message: err.message || "An error occurred",
      };
    }
  };

  return {
    processApiRequest,
    setBaseURL,
  };
}
