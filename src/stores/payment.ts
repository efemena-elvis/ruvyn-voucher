// stores/userStore.ts
import { defineStore } from "pinia";
import {
 checkout
} from "./actions";
import { ref } from "vue";

export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export interface PaymentResponse {
 status: string;
 amount: any;
 ref: string;
 [key: string] : string
}

export const usePaymentStore = defineStore("payment", () => {

   const paymentResponse = ref<PaymentResponse | null>(null);


  const setPaymentResponse = (response: PaymentResponse) => {
    paymentResponse.value = response;
  };

  const proceedToCheckout = async (payload: any): Promise<ApiResponse<any>> => {
    try {
      const response = await checkout(payload);
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
  proceedToCheckout,
  setPaymentResponse, 
   paymentResponse
  };
});
