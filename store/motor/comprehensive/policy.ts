import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
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

// 🔹 Initial state factory
const createInitialState = () => ({
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

    // 🔹 Reset everything back to initial state
    resetStore() {
      Object.assign(this.$state, createInitialState());
    },
  },
});
