import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const transactionInstance = (dashboard_object: any) => {
  const { path, method, body } = dashboard_object;
  const bearer_token = `Bearer ${useCookie("token").value}`;
  return useFetch(`${useRuntimeConfig().public.api_url}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer_token,
    },
    ...(body && { body: body }),
  });
};

export const useTransactionStore = defineStore("transaction", {
  state: () => ({}),
  actions: {
    async listTransaction() {
      const response: any = await transactionInstance({
        path: `customer/transaction?order_by=desc`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async listWalletHistory(payload: any) {
      const response: any = await transactionInstance({
        path: `customer/wallet?order_by=desc`,
        method: "get",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },
  },
});
