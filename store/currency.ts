import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const currencyInstance = (dashboard_object: any) => {
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

export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    currency: {},
  }),
  actions: {
    async getCurrency(payload: any) {
      const response: any = await currencyInstance({
        path: `marine/currency`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        this.currency = data.value;
        return data.value;
      }
      return error;
    },
  },
});
