import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const rateInstance = (dashboard_object: any) => {
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

export const useRateStore = defineStore("rate", {
  state: () => ({}),
  actions: {
    async addRate(payload: any) {
      const response: any = await rateInstance({
        path: `marine/admin/rate`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async addBrokerRate(payload: any) {
      const response: any = await rateInstance({
        path: `marine/admin/broker-rate`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async getRate(payload: any) {
      const response: any = await rateInstance({
        path: `marine/rates`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async myRate(payload: any) {
      const response: any = await rateInstance({
        path: `marine/my-rates`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },
  },
});
