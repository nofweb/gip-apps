import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import { $fetch } from "ofetch";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  EyeIcon,
  XIcon,
  ArrowBackUpIcon,
  HeartIcon,
  PhotoIcon,
  UserCircleIcon,
  UsersIcon,
} from "vue-tabler-icons";
const policyInstance = (dashboard_object: any) => {
  const { path, method, body, params } = dashboard_object;
  const bearer_token = `Bearer ${useCookie("token").value}`;

  return useFetch(`${useRuntimeConfig().public.api_url}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer_token,
    },
    // ✅ only send body for non-GET
    ...(body && method?.toLowerCase() !== "get" && { body }),
    // ✅ use params for GET querystring
    ...(params && { params }),
  });
};

const policyRequest = async (opts: {
  path: string;
  method: string;
  body?: Record<string, unknown>;
  params?: Record<string, unknown>;
}) => {
  const method = (opts.method || "GET").toUpperCase();
  const url = `${useRuntimeConfig().public.api_url}/${opts.path}`;
  const bearer = `Bearer ${useCookie("token").value}`;
  const headers: Record<string, string> = { Authorization: bearer };
  if (method !== "GET" && method !== "HEAD") {
    headers["Content-Type"] = "application/json";
  }
  try {
    return await $fetch(url, {
      method,
      headers,
      body: method !== "GET" && method !== "HEAD" ? opts.body : undefined,
      query: method === "GET" && opts.params ? opts.params : undefined,
    });
  } catch (err: any) {
    const data = err?.data ?? err?.response?._data;
    if (data && typeof data === "object") return data;
    return { status: "error", message: err?.message || "Request failed" };
  }
};

export type EzdriveRenewPolicyPayload = {
  variance: string;
  id_number: string;
  policy_type: string;
  identification: string;
};

// 🔹 Initial state factory
const createInitialState = () => ({
  renewalSearchPolicy: null as Record<string, any> | null,

  tableActionData: [
    {
      icon: "EyeIcon",
      listtitle: "View",
    },

    {
      icon: "TrashIcon",
      listtitle: "Print Certificate",
    },
  ],

  policyData: {
    holderType: "",
    variant: "",
    payment_plan: "",
    first_name: "",
    surname: "",
    phone_number: "",
    email: "",
    contact_address: "",
    company_name: "",
    company_address: "",
    corporate_identification: "",
    individual_identification: "",
    identification_selected: "",
    identification_number: "",
    bounce_customers: [] as any[],
    status: null as string | null,
    vehicle_makes: [] as any[],
    vehicle_models: [] as any[],
    all_vehicle_models: [] as any[],
    all_states: [] as any[],
    all_local_government: [] as any[],
    all_policies: [] as any[],
    years: [] as any[],
    name: "",
    niid_status: "",
    insured_name: "",
    policy_type: "",
    year_of_make: "",
    registration_number: "",
    engine_number: "",
    chasis_number: "",
    vehicle_color: "",
    vehicle_make_id: "",
    vehicle_model_id: "",
    vehicle_type: "",
    geographical_zone: "",
    cv_type: "",
    colors: [] as any[],
    policy_number: "",
    policy_id: "",
    show_renew: 0,
    payment_method: "",
    transaction_reference: "",
    amount: 0,
    car_value: "",
    premium: "",

    holderTypes: [
      { name: "Select Holder Type", value: "" },
      { name: "Individual", value: "Individual" },
      { name: "Corporate", value: "Corporate" },
    ],

    variants: [
      { name: "Select Variant", value: "" },
      { name: "Comprehemsive", value: "Comprehensive" },
      { name: "EZ Drive", value: "EZ Drive" },
      { name: "EZ Drive Plus", value: "EZ Drive Plus" },
      { name: "EZ Drive Elite", value: "EZ Drive Elite" },
    ],

    paymentPlan: [
      {name: "Annually", value: "Annually"},
      {name: "Quaterly", value: "Quaterly"},
      {nam: "Half a Year", value: "Half a Year"}
    ],

    individualIdentification: [
      { name: "Select Identification", value: "" },
      { name: "NIN", value: "NIN" },
      { name: "Drivers License", value: "Drivers License" },
      { name: "International Passport", value: "International Passport" },
      { name: "Voters Card", value: "Voters Card" },
    ],

    CorporateIdentification: [
      { name: "Rc Number", value: "Rc Number" },
      { name: "Government", value: "Government" },
    ],

    classOfInsurance: [
      { name: "Select Insurance class", value: "" },
      { name: "Private Motor", value: "PM" },
      { name: "Commercial Vehicle", value: "CV" },
      { name: "Tricycle", value: "TR" },
      { name: "Truck", value: "TK" },
      { name: "Staff Bus", value: "SB" },
    ],

    typeOfVehiclePm: [
      { name: "Convertible", value: "convertible" },
      { name: "Coupe", value: "coupe" },
      { name: " Hatchback", value: "hatchback" },
      { name: "Saloon", value: "saloon" },
      { name: "Suv", value: "suv" },
      { name: "Wagon", value: "wagon" },
      { name: "Jeep", value: "jeep" },
      { name: "Truck", value: "truck" },
    ],

    typeOfVehicleCv: [
      { name: "Bus", value: "bus" },
      { name: "Pickup", value: "pickup" },
      { name: "Mini-Truck", value: "minitruck" },
      { name: "Mini-Van", value: "minivan" },
    ],

    typeOfVehicleTr: [{ name: "Tricycle", value: "tricycle" }],

    typeOfVehicleMc: [{ name: "Motor-Cycle", value: "motorcycle" }],

    purpose: [
      { name: "Own Goods", value: "Own Goods" },
      { name: "General Cartage", value: "General Cartage" },
    ],

    paymentMethods: [
      { name: "WALLET PAYMENT", value: "WALLET" },
      { name: "CARD/BANK PAYMENT", value: "PAYSTACK" },
    ],
  },
});

export const usePolicyStore = defineStore("comprehensive", {
  state: () => createInitialState(),

  actions: {
    async buyPolicy(payload: any) {
      const response: any = await policyInstance({
        path: `variance/ez-drive`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async myPolicy(payload: any) {
      const response: any = await policyInstance({
        path: `variance/my-policies`,
        method: "get",
        params: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },


    async viewPolicy(id: number) {
      const response: any = await policyInstance({
        path: `variance/policy/${id}`,
        method: "get",
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    

    async generateTransactionReference(payload: any) {
      const response: any = await policyInstance({
        path: `wallet/generate-transaction-reference`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async getPremium(payload: any) {
      const response: any = await policyInstance({
        path: `variance/premium`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },

    async saveVehicleDetails(payload: any) {
      const response: any = await policyInstance({
        path: `variance/save-vehicle-info`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        console.log("The data is", data.value);
        return data.value;
      }
      console.log("The error is", error);
      return error;
    },

    async verifyId(payload: any) {
      const response: any = await policyInstance({
        path: `verifyid`,
        method: "post",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        console.log("The data is", data.value);
        return data.value;
      }
      console.log("The error is", error);
      return error;
    },

    clearRenewalSearch() {
      this.renewalSearchPolicy = null;
    },

    async searchEzdrivePolicyForRenewal(registrationNumber: string) {
      this.renewalSearchPolicy = null;
      const trimmed = String(registrationNumber || "").trim();
      if (!trimmed) {
        return { status: "error", message: "Registration number is required" };
      }

      const data: any = await policyRequest({
        path: `ezdrive/search-policy`,
        method: "post",
        body: { registration_number: trimmed },
      });

      const raw = data?.data ?? data;
      const policyRecord = Array.isArray(raw)
        ? raw[0]
        : raw?.data && Array.isArray(raw.data)
          ? raw.data[0]
          : raw;

      if (policyRecord && typeof policyRecord === "object") {
        this.renewalSearchPolicy = policyRecord;
      }

      return data;
    },

    async renewEzdrivePolicy(
      id: number | string,
      payload: EzdriveRenewPolicyPayload
    ) {
      return (await policyRequest({
        path: `ezdrive/renew-policy/${id}`,
        method: "post",
        body: { ...payload },
      })) as any;
    },

    // 🔹 Reset everything back to initial state
    resetStore() {
      Object.assign(this.$state, createInitialState());
    },
  },
});
