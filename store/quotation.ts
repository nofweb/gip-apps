import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const quotationInstance = (dashboard_object: any) => {
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

export const useQuotationStore = defineStore("quotation", {
  state: () => ({}),
  actions: {
    async coverTypes(payload: any) {
      const response: any = await quotationInstance({
        path: `marine/cover-type`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async calculatePremium(payload: any) {
      const response: any = await quotationInstance({
        path: `marine/premium`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async generateQuotation(payload: any) {
      const response: any = await quotationInstance({
        path: `marine/quotation`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async listQuotation() {
      const response: any = await quotationInstance({
        path: `marine/quotation?order_by=desc`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },
    async viewQuotation(id: number) {
      const response: any = await quotationInstance({
        path: `marine/quotation/${id}`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async makePayment(id: any, paymentData: any) {
      const response: any = await quotationInstance({
        path: `marine/quotation/${id}/payment`,
        method: "post",
        body: paymentData,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },
  },
});
