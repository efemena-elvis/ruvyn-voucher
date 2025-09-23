
import {  useApi } from "@/composables/useApi";


export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

const { processApiRequest } = useApi();

const getAuthHeader = () => {
  const token = localStorage.getItem("auth_token");
  return token ? {"Content-Type"
        : "application/json", "Authorization": `Bearer ${token}` } : {};
};


// auth
export const register = async (payload: any) => {
  return await processApiRequest("/auth/register", {
    method: "POST",
    data: payload,
  });
}

export const login = async (payload: any) => {
  return await processApiRequest("/auth/login", {
    method: "POST",
    data: payload,
  });
}


// vouchers
export const getVouchers = async () => {
  return await processApiRequest("/vouchers");
}

  export const getVoucherById = async (id: number | string) => {
    return await processApiRequest(`/vouchers/${id}`);
  }

  export const getCategories = async () => {
    return await processApiRequest("/categories");
  }

  export const getPurchasedVouchers = async () => {
    return await processApiRequest("/dashboard/vouchers",
    {
      headers: getAuthHeader()
    }
  )

  }


// payment
export const checkout = async (payload: any) => {
  return await processApiRequest("/checkout", {
    method: "POST",
    data: payload,
    headers: getAuthHeader()
  });
}


export const verifyVoucherByReference = async (transaction_ref: string) => {
  return await processApiRequest(`/token/${transaction_ref}`,
{    headers: getAuthHeader()}
  )
}

