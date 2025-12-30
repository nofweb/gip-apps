import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import { PlusIcon, EditIcon, TrashIcon, CheckIcon, EyeIcon, XIcon, ArrowBackUpIcon,  HeartIcon, PhotoIcon, UserCircleIcon, UsersIcon  } from 'vue-tabler-icons';

const vehicleInstance = (dashboard_object: any) => {
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

export const useVehicleStore = defineStore("vehicle", {
  state: () => ({
    vehicle_makes: [],
  }),
  actions: {
    async vehicleMakes(payload: any) {
      const response: any = await vehicleInstance({
        path: `vehicle/all-makes/all`,
        method: "get",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        this.vehicle_makes = data.calue
        return data.value;
      }
      return error;
    },
  },
});
