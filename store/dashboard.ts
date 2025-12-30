import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const dashboardInstance = (dashboard_object: any) => {
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

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({}),
  actions: {
    async dashboard_object(payload: any) {
      const response: any = await dashboardInstance({
        path: `marine`,
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
