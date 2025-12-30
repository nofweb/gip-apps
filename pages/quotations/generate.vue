<template>
  <div>
    <v-row>
      <v-col cols="6">
        <h1 class="primary-text">Generate Quotation</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard title="">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="quotationData.holder_type"
                label="Policy Holder Type"
                :items="policy_holder_type"
                item-value="value"
                item-title="name"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="quotationData.policy_type"
                label="Policy  Type"
                :items="policy_type"
                item-value="value"
                item-title="name"
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="quotationData.policy_type == 'open_cover'">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="quotationData.policy_number"
                label="Policy Number"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="quotationData.holder_type == 'individual'">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.first_name"
                label="First Name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="quotationData.last_name" label="Last Name">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row
            v-if="
              quotationData.holder_type == 'corporate' ||
              quotationData.holder_type == 'government'
            "
          >
            <v-col cols="12" md="6">
              <v-text-field
                v-model="quotationData.company_name"
                label="Company Name"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="quotationData.email" label="Email">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.phone_number"
                label="Phone Number"
                type="number"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.tin"
                label="TIN(Tax Identification Number)"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.contact_address"
                label="Contact Address"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="quotationData.cover_type"
                label="Cover Type"
                :items="coverTypes"
                item-value="value"
                item-title="text"
                id="cover_type"
                @update:modelValue="changeCoverType"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.port_of_departure"
                label="Port Of Departure"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.port_of_destination"
                label="Port of Destination"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.vessel_name"
                label="Vessel Name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.cargo_description"
                label="Cargo Description"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="quotationData.packaging_type"
                label="Packaging Type"
                :items="packaging_type"
                item-value="value"
                item-title="name"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="quotationData.cargo_currency"
                label="Cargo Currency"
                :items="currency"
                item-value="value"
                item-title="name"
                id="cargo_currency"
                @update:modelValue="changeCargoCurrency"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.invoice_value"
                label="Invoice Value"
                id="invoice_value"
                type="number"
                :onkeyup="invoiceValueKeyup()"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" v-if="myRates.length > 0">
              <v-select
                v-model="quotationData.broker_rate_id"
                label="Nature Of Cargo"
                :items="myRates"
                item-value="id"
                item-title="condition"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3" v-else>
              <v-select
                v-model="quotationData.rate_id"
                label="Nature Of Cargo"
                :items="getRates"
                item-value="id"
                item-title="condition"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="quotationData.bank_name" label="Bank Name">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.exchange_rate"
                label="Exchange Rate"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="quotationData.basic_rate"
                label="Basic Rate"
                id="basic_rate"
                type="number"
                :onkeyup="basicRateKeyup()"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <label class="label pb-2 ml-2">Premium</label>
              <v-text-field :value="premium" disabled> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="quotationData.proforma_invoice_number"
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
              <BaseButton
                id="submit_btn"
                @click="generateQuotation()"
                mode="colored"
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
import { useRateStore } from "~/store/rate";
import { useCurrencyStore } from "~/store/currency";
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

    const rateStore = useRateStore();
    const quotationStore = useQuotationStore();
    const currencyStore = useCurrencyStore();
    const uploadStore = useUploadStore();

    const getRates = ref([]);
    const myRates = ref([]);
    const coverTypes = ref([]);

    const quotationData = ref({
      holder_type: "",
      policy_type: "",
      email: "",
      phone_number: "",
      company_name: "",
      tin: "",
      contact_address: "",
      cover_type: "",
      port_of_departure: "",
      port_of_destination: "",
      vessel_name: "",
      cargo_description: "",
      packaging_type: "",
      cargo_currency: "",
      invoice_value: "",
      basic_rate: "",
      first_name: "",
      last_name: "",
      rate_id: "",
      broker_rate_id: "",
      quotation_rate_id: "",
      bank_name: "",
      exchange_rate: "",
      proforma_invoice_number: "",
      policy_number: "",
    });

    const premium = ref("");

    const policy_holder_type = ref([
      { name: "Individual", value: "individual" },
      { name: "Corporate", value: "corporate" },
      { name: "Government", value: "government" },
    ]);
    const cover_type = ref([
      { name: "Individual", value: "individual" },
      { name: "Cooperate", value: "cooperate" },
      { name: "Government", value: "government" },
    ]);
    const policy_type = ref([
      { name: "Single Transit", value: "single_transit" },
      { name: "Open Cover Type", value: "open_cover" },
    ]);
    const packaging_type = ref([
      { name: "Containerized", value: "containerized" },
      { name: "Non Containerized", value: "non containerized" },
    ]);
    const currency = ref([
      { name: "NGN", value: "NGN" },
      { name: "USD", value: "USD" },
    ]);

    const list_currency = ref([]);

    const quotation = ref({});

    // Get Rates
    rateStore
      .getRate()
      .then((rates) => {
        if (rates.status === "success") {
          getRates.value = rates.data.data;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    //get currency
    currencyStore.getCurrency().then((currency) => {
      list_currency.value = currency.data.cover_types;
      console.log(list_currency.value);
    });

    //My Rates
    rateStore
      .myRate()
      .then((rates) => {
        if (rates.status === "success") {
          myRates.value = rates.data.data;
        }
        // console.log(myRates.value);
      })
      .catch((e) => {
        console.log(e);
      });

    // Get Cover types
    quotationStore
      .coverTypes()
      .then((cover) => {
        if (cover.status === "success") {
          const coverTypesData = cover.data.cover_types;
          for (const key in coverTypesData) {
            if (+key || +key === 0) {
              const option = {
                text: coverTypesData[key],
                value: key,
              };
              coverTypes.value.push(option);
            }
          }
          // console.log(coverTypes.value);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    //Calculate premium
    const calculate = async () => {
      // if (
      //   quotationData.value.invoice_value &&
      //   quotationData.value.cover_type &&
      //   quotationData.value.cargo_currency &&
      //   quotationData.value.bank_name
      // )
      try {
        const data = {
          invoice_value: quotationData.value.invoice_value,
          currency: quotationData.value.cargo_currency,
          rate: quotationData.value.basic_rate,
          cover_type: quotationData.value.cover_type,
          exchange_rate: quotationData.value.exchange_rate,
        };
        const calc = await quotationStore.calculatePremium(data);
        if (calc.status == "success") {
          premium.value = calc.data.premium;
          console.log(calc.data.premium);
        } else {
          console.log("Nothing to calculate");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // On key up function to calculate ptrmium
    // const keyUp = () => {
    //   if (
    //     quotationData.value.invoice_value !== "" ||
    //     quotationData.value.basic_rate !== ""
    //   ) {
    //     quotationData.value.invoice_value =
    //       document.getElementById("invoice_value").value;
    //     quotationData.value.basic_rate =
    //       document.getElementById("basic_rate").value;
    //   }
    //   console.log(quotationData.value.invoice_value);
    //   console.log(quotationData.value.basic_rate);
    // };

    // Invoice value onkeyup to calculate premium
    const invoiceValueKeyup = () => {
      if (quotationData.value.invoice_value) {
        calculate();
      }
    };

    // Invoice value onkeyup to calculate premium
    const basicRateKeyup = () => {
      if (quotationData.value.basic_rate) {
        calculate();
      }
    };

    // Change cover type to calculate premium
    const changeCoverType = () => {
      if (quotationData.value.cover_type) {
        calculate();
      }
    };

    // Change cargo currency type to calculate premium
    const changeCargoCurrency = () => {
      if (quotationData.value.cargo_currency) {
        calculate();
      }
    };

    // Generate Quotation
    const generateQuotation = async () => {
      const fileInput = document.getElementById("proforma_invoice");
      const selectedFile = fileInput.files[0];
      if (!selectedFile) {
        notify({
          title: "Error",
          text: "Please Select a File to Upload",
          type: "error",
        });
        return;
      }
      if (quotationData.value.holder_type == "") {
        notify({
          title: "Error",
          text: "Policy holder type is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.policy_type == "") {
        notify({
          title: "Error",
          text: "Policy  type is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.email == "") {
        notify({
          title: "Error",
          text: " Email is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.phone_number == "") {
        notify({
          title: "Error",
          text: "Phone number is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.tin == "") {
        notify({
          title: "Error",
          text: "Tax identification number is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.contact_address == "") {
        notify({
          title: "Error",
          text: "Contact address is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.cover_type == "") {
        notify({
          title: "Error",
          text: "Cover type is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.port_of_departure == "") {
        notify({
          title: "Error",
          text: "Port of departure is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.port_of_destination == "") {
        notify({
          title: "Error",
          text: "Port of destination is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.cargo_currency == "") {
        notify({
          title: "Error",
          text: "Cargo currency is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.invoice_value == "") {
        notify({
          title: "Error",
          text: "Invoice value is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.basic_rate == "") {
        notify({
          title: "Error",
          text: "Basic rate is required",
          type: "error",
        });
        return;
      } else if (
        quotationData.value.holder_type == "individual" &&
        quotationData.value.first_name == ""
      ) {
        notify({
          title: "Error",
          text: "First name is required",
          type: "error",
        });
        return;
      } else if (
        quotationData.value.holder_type == "individual" &&
        quotationData.value.last_name == ""
      ) {
        notify({
          title: "Error",
          text: "Last name is required",
          type: "error",
        });
        return;
      } else if (
        quotationData.value.holder_type == "cooperate" &&
        quotationData.value.company_name == ""
      ) {
        notify({
          title: "Error",
          text: "Company name is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.exchange_rate == "") {
        notify({
          title: "Error",
          text: "Exchange rate is required",
          type: "error",
        });
        return;
      } else if (quotationData.value.proforma_invoice_number == "") {
        notify({
          title: "Error",
          text: "Profoma invoice number is required",
          type: "error",
        });
        return;
      }
      const submit_btn = document.getElementById("submit_btn");
      const submit_btn_selector = document.querySelector("#submit_btn");
      submit_btn.disabled = true;
      submit_btn_selector.innerHTML = "Generating Quotation......";

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", "marine");
      const upload = await uploadStore.upload(formData);
      if (upload.status == "success") {
        try {
          let data = {
            proforma_invoice_file: upload.data.file_url,
            proforma_invoice_number:
              quotationData.value.proforma_invoice_number,
            holder_type: quotationData.value.holder_type,
            policy_type: quotationData.value.policy_type,
            email: quotationData.value.email,
            phone_number: quotationData.value.phone_number,
            tin: quotationData.value.tin,
            contact_address: quotationData.value.contact_address,
            cover_type: quotationData.value.cover_type,
            port_of_departure: quotationData.value.port_of_departure,
            port_of_destination: quotationData.value.port_of_destination,
            vessel_name: quotationData.value.vessel_name,
            cargo_description: quotationData.value.cargo_description,
            packaging_type: quotationData.value.packaging_type,
            cargo_currency: quotationData.value.cargo_currency,
            invoice_value: quotationData.value.invoice_value,
            basic_rate: quotationData.value.basic_rate,
            first_name: quotationData.value.first_name,
            last_name: quotationData.value.last_name,
            company_name: quotationData.value.company_name,
            // rate_id: quotationData.value.rate_id,
            bank_name: quotationData.value.bank_name,
            exchange_rate: quotationData.value.exchange_rate,
            open_cover_policy_number: quotationData.value.policy_number,
          };
          if (quotationData.value.rate_id) {
            data.rate_id = quotationData.value.rate_id;
          }
          if (quotationData.value.broker_rate_id) {
            data.broker_rate_id = quotationData.value.broker_rate_id;
          }
          const generate = await quotationStore.generateQuotation(data);
          if (generate.status == "success") {
            notify({
              title: "Success",
              text: generate.message,
              type: "success",
            });
            router.push("/quotations");
          } else {
            submit_btn.disabled = false;
            submit_btn_selector.innerHTML = "Submit";
            const error =
              generate.value?.data?.message || "Failed to generate quotation";
            //   console.log(authUser.value.data.message);
            notify({
              title: "Error",
              text: error,
              type: "error",
            });
          }
        } catch (error) {
          notify({
            title: "Error",
            text: "An error occurred",
            type: "error",
          });
          submit_btn.disabled = false;
          submit_btn_selector.innerHTML = "Submit";
          console.log(error);
        }
      } else {
        notify({
          title: "Error",
          text: upload.value?.data?.message || "Failed to upload file",
          type: "error",
        });
        submit_btn.disabled = false;
        submit_btn_selector.innerHTML = "Submit";
      }
    };

    return {
      policy_holder_type,
      policy_type,
      cover_type,
      packaging_type,
      currency,
      rateStore,
      getRates,
      myRates,
      quotation,
      coverTypes,
      quotationStore,
      currencyStore,
      quotationData,
      premium,
      calculate,
      router,
      invoiceValueKeyup,
      basicRateKeyup,
      changeCoverType,
      changeCargoCurrency,
      generateQuotation,
      uploadStore,
      list_currency,
    };
  },
});
</script>
