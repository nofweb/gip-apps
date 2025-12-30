import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const brokerInstance = (dashboard_object: any) => {
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

export const useBrokerStore = defineStore("broker", {
  state: () => ({}),
  actions: {
    async addBroker(payload: any) {
      const response: any = await brokerInstance({
        path: `marine/admin/broker`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async listBroker(payload: any) {
      const response: any = await brokerInstance({
        path: `marine/admin/broker`,
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
