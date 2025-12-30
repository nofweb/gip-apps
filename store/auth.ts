// store/auth.ts

import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

interface UserPayloadInterface {
  email: string;
  password: string;
}

const authInstance = (auth_object: any) => {
  const { path, method, body } = auth_object;
  // console.log(body)
  return useFetch(`${useRuntimeConfig().public.api_url}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    // name: "Festus",
    auth_user: {},
    token: null,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const payload: any = await authInstance({
        path: "customer/auth/login",
        method: "post",
        body: { email, password },
      });
      const { data, pending, error } = payload;

      this.loading = pending;
      // console.log(data.value);

      if (data.value) {
        console.log("The user data is", data?.value.data);
        let token = useCookie("token");
        let user_first_name = useCookie("user_first_name");
        let user_last_name = useCookie("user_last_name");
        let user_id = useCookie("user_id");

        token.value = data?.value?.data?.access_token;
        user_first_name.value = data.value.data?.user.first_name;
        user_last_name.value = data.value.data?.user.last_name;
        user_id.value = data.value.data?.user.id;

        this.authenticated = true;
        this.auth_user = data.value.data.user;

        this.setToken(data?.value?.data?.access_token);

        return data.value;
      }
      return error;
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },

    setToken(token: any) {
      this.token = token;
    },

    getToken() {},

    async forgotPassword(payload: any) {
      const response: any = await authInstance({
        path: `auth/forgot-password`,
        method: "post",
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
