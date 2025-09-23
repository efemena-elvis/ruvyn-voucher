// stores/userStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  register,
  login
} from "./actions";

export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}


export const useAuthStore = defineStore("auth", () => {

  const registerUser = async (payload: any): Promise<ApiResponse<any>> => {
    try {
      const response = await register(payload);
      if (response === null) {
        return {
          status: 500,
          data: null,
          message: "No response from server",
        };
      }
      return response;
    
    } catch (err: any) {
      return {
        status: err?.status || 500,
        data: null,
        message: err?.message || "An error occurred",
      };
    }
  }

  const loginUser = async ( payload: any): Promise<ApiResponse<any>> => {
    try {
      const response = await login(payload);
      if (response === null) {
        return {
          status: 500,
          data: null,
          message: "No response from server",
        };
      }
      return response;
    
    } catch (err: any) {
      return {
        status: err?.status || 500,
        data: null,
        message: err?.message || "An error occurred",
      };
    }
  }
  

  return {
    registerUser,
    loginUser
  };
});
