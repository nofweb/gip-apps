import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

const uploadInstance = (upload_object: any) => {
  const { path, method, body } = upload_object;
  const bearer_token = `Bearer ${useCookie("token").value}`;
  return useFetch(`${useRuntimeConfig().public.api_url}/${path}`, {
    method,
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: bearer_token,
    },
    ...(body && { body: body }),
  });
};

export const useUploadStore = defineStore("upload", {
  state: () => ({}),
  actions: {
    async upload(formData: any) {
      const response: any = await uploadInstance({
        path: `upload-file`,
        method: "post",
        body: formData,
      });
      const { data, pending, error } = response;

      if (data.value) {
        return data.value;
      }
      return error;
    },
  },
});
