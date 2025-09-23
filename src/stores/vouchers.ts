// stores/userStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import {
 getVouchers,
 getVoucherById,
 getCategories,
 getPurchasedVouchers,
 verifyVoucherByReference
} from "./actions";

export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}


export const useVouchersStore = defineStore("vouchers", () => {

  const getVouchersList = async (): Promise<ApiResponse<any>> => {
    try {
      const response = await getVouchers();
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

  const getSingleVoucher = async (id: number | string): Promise<ApiResponse<any>> => {
    try {
      const response = await getVoucherById(id);
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




    const getAllCategories = async (): Promise<ApiResponse<any>> => {
    try {
      const response = await getCategories();
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

  const getVouchersByUser = async (): Promise<ApiResponse<any>> => {
    try {
      const response = await getPurchasedVouchers();
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
  
  const verifyVoucher = async (transaction_ref: string): Promise<ApiResponse<any>> => {
    try {
      const response = await verifyVoucherByReference(transaction_ref);
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
   getVouchersList,
   getSingleVoucher,
   getAllCategories,
   getVouchersByUser,
   verifyVoucher
  };
});
