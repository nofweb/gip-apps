<template>
  <div>
    <v-row>
      <v-col cols="2">
        <h1 class="primary-text">File A Claim</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard title="">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                type="number"
                v-model="claimData.amount"
                label="Amount"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-file-input
                label="Upload Evidence File"
                id="evidence_file"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="claimData.description"
                label="Description"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row class="pb-8">
            <v-col cols="12" md="2">
              <BaseButton @click="addClaim()" id="submit_btn" mode="colored"
                >Submit</BaseButton
              >
            </v-col>
          </v-row>
        </UiChildCard>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import { useQuotationStore } from "~/store/quotation";

import { useClaimStore } from "~/store/claim";

import { useUploadStore } from "~/store/upload";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const { notify } = useNotification();
    const router = useRouter();
    const route = useRoute();

    const quotationStore = useQuotationStore();
    const uploadStore = useUploadStore();
    const claimStore = useClaimStore();

    const claimData = ref({
      amount: "",
      description: "",
    });

    const addClaim = async () => {
      const fileInput = document.getElementById("evidence_file");
      const selectedFile = fileInput.files[0];
      if (claimData.value.amount == "") {
        notify({
          title: "Error",
          text: "Amount is required",
          type: "error",
        });
        return;
      } else if (claimData.value.description == "") {
        notify({
          title: "Error",
          text: "Description is required",
          type: "error",
        });
        return;
      } else if (!selectedFile) {
        notify({
          title: "Error",
          text: "Please Select a File to Upload",
          type: "error",
        });
        return;
      }

      const submit_btn = document.getElementById("submit_btn");
      const submit_btn_selector = document.querySelector("#submit_btn");
      submit_btn.disabled = true;
      submit_btn_selector.innerHTML = "Please wait ...";

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", "marine");
      const upload = await uploadStore.upload(formData);
      //   console.log(upload)
      if (upload.status === "success") {
        const data = {
          amount: claimData.value.amount,
          description: claimData.value.description,
          evidence_file: upload.data.file_url,
        };

        const file_claim = await claimStore.addClaim(route.params.id, data);
        if (file_claim.status === "success") {
          // console.log(make_payment.message)
          notify({
            title: "Success",
            text: file_claim.message,
            type: "success",
          });
          router.push("/claims");
          return;
        }
        // console.log(make_payment)
        notify({
          title: "Error",
          text: file_claim.value?.data?.message || "Failed to make file claim",
          type: "error",
        });
        submit_btn.disabled = false;
        submit_btn_selector.innerHTML = "Submit";
        return;
      }
      notify({
        title: "Error",
        text: upload.value?.data?.message || "Failed to upload file",
        type: "error",
      });
      submit_btn.disabled = false;
      submit_btn_selector.innerHTML = "Submit";
    };

    return {
      notify,
      router,
      quotationStore,
      uploadStore,
      claimStore,
      addClaim,
      claimData,
    };
  },
});
</script>
