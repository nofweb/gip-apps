import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const claimInstance = (dashboard_object: any) => {
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

export const useClaimStore = defineStore("claim", {
  state: () => ({}),
  actions: {
    async listClaims() {
      const response: any = await claimInstance({
        path: `marine/claim?order_by=desc`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async viewClaim(id: number) {
      const response: any = await claimInstance({
        path: `marine/claim/${id}`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async addClaim(id: any, claimtData: any) {
      const response: any = await claimInstance({
        path: `marine/policy/${id}/file-claim`,
        method: "post",
        body: claimtData,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },
  },
});
