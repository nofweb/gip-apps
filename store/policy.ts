import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import { PlusIcon, EditIcon, TrashIcon, CheckIcon, EyeIcon, XIcon, ArrowBackUpIcon,  HeartIcon, PhotoIcon, UserCircleIcon, UsersIcon  } from 'vue-tabler-icons';

const policyInstance = (dashboard_object: any) => {
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

export const usePolicyStore = defineStore("policy", {
  state: () => ({
    tableActionData: [
      {
          icon: "EyeIcon",
          listtitle: 'View'
      },
      {
          icon: "EditIcon",
          listtitle: 'Resend'
      },
      {
          icon: "TrashIcon",
          listtitle: 'Print Certificate'
      }
  ],
  }),
  actions: {
    async listPolicy(payload: any) {
      const response: any = await policyInstance({
        path: `marine/policy?order_by=desc`,
        method: "get",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async viewPolicy(id: number) {
      const response: any = await policyInstance({
        path: `marine/policy/${id}`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },
    async listTransactions(payload: any) {
      const response: any = await policyInstance({
        path: `marine/policy/transactions/payment?order_by=desc`,
        method: "get",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async viewTransactions(id: number) {
      const response: any = await policyInstance({
        path: `marine/policy/transactions/payment/${id}`,
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
