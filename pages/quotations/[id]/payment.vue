<template>
  <div>
    <v-row>
      <v-col cols="2">
        <h1 class="primary-text">Make Payment</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard title="">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="proforma_invoice_number"
                label="Proforma Invoice Number"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-file-input
                label="Upload Proforma Invoice"
                id="proforma_invoice"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row class="pb-8">
            <v-col cols="12" md="2">
              <BaseButton @click="makePayment()" id="make_payment_btn" mode="colored"
                >Make Payment</BaseButton
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

    const proforma_invoice_number = ref("");

    const makePayment = async () => {
      const fileInput = document.getElementById("proforma_invoice");
      const selectedFile = fileInput.files[0];
      if(!proforma_invoice_number.value) {
        notify({
          title: "Error",
          text: "Proforma invoice number is required",
          type: "error",
        });
        return;
      }
      if (!selectedFile) {
        notify({
          title: "Error",
          text: "Please Select a File to Upload",
          type: "error",
        });
        return;
      }

      const submit_btn = document.getElementById("make_payment_btn");
      const submit_btn_selector = document.querySelector("#make_payment_btn");
      submit_btn.disabled = true;
      submit_btn_selector.innerHTML = "Please wait ...";


      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", "marine");
      const upload = await uploadStore.upload(formData);
    //   console.log(upload)
      if(upload.status === "success") {
        const paymentData = {
            proforma_invoice_number: proforma_invoice_number.value,
            proforma_invoice_file: upload.data.file_url
        }

        const make_payment = await quotationStore.makePayment(route.params.id, paymentData);
        if(make_payment.status === "success") {
            // console.log(make_payment.message)
            notify({
                title: "Success",
                text: make_payment.message,
                type: "success",
            });
            router.push("/policy");
            return
        }
        // console.log(make_payment)
        notify({
            title: "Error",
            text: make_payment.value?.data?.message || 'Failed to make payment',
            type: "error",
        });
        submit_btn.disabled = false;
        submit_btn_selector.innerHTML = "Make Payment";
        return
      }
      notify({
        title: "Error",
        text: upload.value?.data?.message || 'Failed to upload file',
        type: "error",
      });
      submit_btn.disabled = false;
      submit_btn_selector.innerHTML = "Make Payment";
    };

    return {
      notify,
      router,
      quotationStore,
      proforma_invoice_number,
      makePayment,
      uploadStore,
    };
  },
});
</script>
