<template>
  <div>
    <v-row>
      <v-col cols="2">
        <h1 class="primary-text">Generate Quotation</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard title="New Rate">
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
          <v-row>
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
              <v-text-field :value="premium" label="Premium"> </v-text-field>
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
import { useQuotationStore } from "~/store/quotation";

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

    const getRates = ref([]);
    const myRates = ref([]);
    const coverTypes = ref([]);

    const quotationData = ref({
      holder_type: "",
      policy_type: "",
      email: "",
      phone_number: "",
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
    });

    const premium = ref("");

    const policy_holder_type = ref([
      { name: "Individual", value: "individual" },
      { name: "Cooperate", value: "cooperate" },
      { name: "Government", value: "government" },
    ]);
    const cover_type = ref([
      { name: "Individual", value: "individual" },
      { name: "Cooperate", value: "cooperate" },
      { name: "Government", value: "government" },
    ]);
    const policy_type = ref([
      { name: "Single Transit", value: "single_transit" },
      { name: "Open Cover Type", value: "open_cover_type" },
    ]);
    const packaging_type = ref([
      { name: "Containerized", value: "containerized" },
      { name: "Non Containerized", value: "non_containerized'" },
    ]);
    const currency = ref([
      { name: "NGN", value: "NGN" },
      { name: "USD", value: "USD" },
    ]);

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
      // if (quotationData.value.rate_id) {
      //   quotationData.value.quotation_rate_id = quotationData.value.rate_id;
      // } else {
      //   quotationData.value.quotation_rate_id =
      //     quotationData.value.broker_rate_id;
      // }
      // console.log(quotationData.value.quotation_rate_id);
      if (
        quotationData.value.holder_type == "" ||
        quotationData.value.policy_type == "" ||
        quotationData.value.email == "" ||
        quotationData.value.phone_number == "" ||
        quotationData.value.tin == "" ||
        quotationData.value.contact_address == "" ||
        quotationData.value.cover_type == "" ||
        quotationData.value.port_of_departure == "" ||
        quotationData.value.port_of_destination == "" ||
        quotationData.value.cargo_currency == "" ||
        quotationData.value.invoice_value == "" ||
        quotationData.value.basic_rate == "" ||
        quotationData.value.first_name == "" ||
        quotationData.value.last_name == "" ||
        quotationData.value.bank_name == "" ||
        quotationData.value.exchange_rate == ""
      ) {
        notify({
          title: "Error",
          text: "All fields are required",
          type: "error",
        });
        return;
      }
      const submit_btn = document.getElementById("submit_btn");
      const submit_btn_selector = document.querySelector("#submit_btn");
      submit_btn.disabled = true;
      submit_btn_selector.innerHTML = "Generating Quotation......";
      try {
        let data = {
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
          // rate_id: quotationData.value.rate_id,
          bank_name: quotationData.value.bank_name,
          exchange_rate: quotationData.value.exchange_rate,
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
            text: "Quotation Generated Successfully",
            type: "success",
          });
          router.push("/quotations");
        } else {
          submit_btn.disabled = false;
          submit_btn_selector.innerHTML = "Submit";
          const error =
            generate?.value?.message || "Failed to generate quotation";
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
      quotationData,
      premium,
      calculate,
      router,
      invoiceValueKeyup,
      basicRateKeyup,
      changeCoverType,
      changeCargoCurrency,
      generateQuotation,
    };
  },
});
</script>
