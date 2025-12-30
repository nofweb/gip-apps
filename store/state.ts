import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import { PlusIcon, EditIcon, TrashIcon, CheckIcon, EyeIcon, XIcon, ArrowBackUpIcon,  HeartIcon, PhotoIcon, UserCircleIcon, UsersIcon  } from 'vue-tabler-icons';

const stateInstance = (dashboard_object: any) => {
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

export const useStateStore = defineStore("state", {
  state: () => ({
    all_state: [],
  }),
  actions: {
    async allState(payload: any) {
      const response: any = await stateInstance({
        path: `state/all/info`,
        method: "get",
        body: payload,
      });
      const { data, pending, error } = response;

      if (data.value) {
        this.all_state = data.calue
        return data.value;
      }
      return error;
    },
  },
});
