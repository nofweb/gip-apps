<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="12" md="6">
        <h1 class="primary-text">Renew Third Party Policy</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <UiChildCard>
          <v-row class="align-end">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="registrationNumber"
                label="Vehicle registration number"
                prepend-inner-icon="mdi-car"
                clearable
                hide-details
                @keyup.enter="runSearch"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                color="primary"
                :loading="searching"
                :disabled="searching"
                block
                @click="runSearch"
              >
                Search policy
              </v-btn>
            </v-col>
          </v-row>

          <v-row v-if="policyFound" class="mt-4">
            <v-col cols="12">
              <v-alert type="info" variant="tonal" class="mb-4">
                <div v-if="summaryPolicyNumber">
                  Policy found: <strong>{{ summaryPolicyNumber }}</strong>
                </div>
                <div v-else>
                  Policy found. Update the fields below and submit renewal.
                </div>
              </v-alert>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="renewForm.variance"
                label="Variance"
                :items="policyStore.policyData.variants"
                item-value="value"
                item-title="name"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="renewForm.policy_type"
                label="Policy type"
                :items="policyStore.policyData.classOfInsurance"
                item-value="value"
                item-title="name"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="renewForm.identification"
                label="Identification"
                :items="identificationItems"
                item-value="value"
                item-title="name"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="renewForm.id_number"
                label="Identification number"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-btn
                id="renew_submit_btn"
                color="primary"
                :loading="submitting"
                :disabled="submitting"
                block
                @click="submitRenewal"
              >
                Renew policy
              </v-btn>
            </v-col>
          </v-row>
        </UiChildCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
definePageMeta({
  layout: "motor",
});

import { defineComponent, ref, computed, onUnmounted } from "vue";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import { usePolicyStore } from "~/store/motor/thirdparty/policy";

export default defineComponent({
  components: {
    UiChildCard,
  },
  setup() {
    const { notify } = useNotification();
    const policyStore = usePolicyStore();

    const registrationNumber = ref("");
    const searching = ref(false);
    const submitting = ref(false);

    const renewForm = ref({
      variance: "",
      id_number: "",
      policy_type: "",
      identification: "",
    });

    const policyFound = computed(() => !!policyStore.renewalSearchPolicy);

    const summaryPolicyNumber = computed(
      () => policyStore.renewalSearchPolicy?.policy_number || ""
    );

    const identificationItems = computed(() => {
      const ind = policyStore.policyData.individualIdentification.filter(
        (i) => i.value
      );
      const corp = policyStore.policyData.CorporateIdentification;
      return [...ind, ...corp];
    });

    const applyPolicyToForm = (p) => {
      if (!p) return;
      renewForm.value = {
        variance: p.variance || "",
        id_number: p.id_number || "",
        policy_type: p.policy_type || "",
        identification: p.identification || "",
      };
    };

    const runSearch = async () => {
      const reg = registrationNumber.value?.trim();
      if (!reg) {
        notify({
          title: "Validation",
          text: "Enter a vehicle registration number",
          type: "warning",
        });
        return;
      }

      searching.value = true;
      try {
        const response = await policyStore.searchPolicyForRenewal(reg);

        if (response?.status === "success" && policyStore.renewalSearchPolicy) {
          applyPolicyToForm(policyStore.renewalSearchPolicy);
          notify({
            title: "Success",
            text: response?.message || "Policy found",
            type: "success",
          });
        } else {
          notify({
            title: "Not found",
            text:
              response?.message ||
              "No policy found for this registration number",
            type: "error",
          });
        }
      } catch (e) {
        console.error(e);
        notify({
          title: "Error",
          text: "Search failed. Please try again.",
          type: "error",
        });
      } finally {
        searching.value = false;
      }
    };

    const validateRenew = () => {
      const f = renewForm.value;
      if (!f.variance) {
        notify({ title: "Validation", text: "Select variance", type: "error" });
        return false;
      }
      if (!f.policy_type) {
        notify({
          title: "Validation",
          text: "Select policy type",
          type: "error",
        });
        return false;
      }
      if (!f.identification) {
        notify({
          title: "Validation",
          text: "Select identification",
          type: "error",
        });
        return false;
      }
      if (!f.id_number?.trim()) {
        notify({
          title: "Validation",
          text: "Enter identification number",
          type: "error",
        });
        return false;
      }
      return true;
    };

    const submitRenewal = async () => {
      if (!validateRenew()) return;

      const id = policyStore.renewalSearchPolicy?.id;
      if (!id) {
        notify({
          title: "Error",
          text: "Search for a policy before renewing",
          type: "error",
        });
        return;
      }

      submitting.value = true;
      try {
        const payload = {
          variance: renewForm.value.variance,
          id_number: renewForm.value.id_number.trim(),
          policy_type: renewForm.value.policy_type,
          identification: renewForm.value.identification,
        };

        const response = await policyStore.renewPolicy(id, payload);

        if (response?.status === "success") {
          notify({
            title: "Success",
            text: response?.message || "Policy renewed successfully",
            type: "success",
          });
          policyStore.clearRenewalSearch();
          registrationNumber.value = "";
          renewForm.value = {
            variance: "",
            id_number: "",
            policy_type: "",
            identification: "",
          };
        } else {
          notify({
            title: "Error",
            text: response?.message || "Renewal failed",
            type: "error",
          });
        }
      } catch (e) {
        console.error(e);
        notify({
          title: "Error",
          text: "Renewal request failed",
          type: "error",
        });
      } finally {
        submitting.value = false;
      }
    };

    onUnmounted(() => {
      policyStore.clearRenewalSearch();
    });

    return {
      policyStore,
      registrationNumber,
      searching,
      submitting,
      renewForm,
      policyFound,
      summaryPolicyNumber,
      identificationItems,
      runSearch,
      submitRenewal,
    };
  },
});
</script>
