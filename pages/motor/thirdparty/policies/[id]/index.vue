<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">View Policy</h1>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>

    <v-row>
      <UiChildCard>
        <v-row>
          <!-- LEFT SIDE: POLICY DETAILS -->
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title">Policy Details</v-card-title>
            </v-card-item>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Policy Number:</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.policy_number ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Effective from</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.effective_cover_date ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Expired in:</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.expiration_date ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Certificate Number:</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.certificate_number ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Vehicle Make</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.vehicle_make?.name ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Vehicle Color</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.vehicle_color ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Vehicle Type</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.vehicle_type ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Vehicle Model</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.vehicle_model?.name ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Year of Make</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.year_of_make ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Registration Number</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.registration_number ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Chasis Number</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.chasis_number ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Engine Number</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.engine_number ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <!-- PAYMENT DETAILS (moved under Policy Details) -->
            <v-card-item class="pt-8 pb-4">
              <v-card-title class="card-title">Payment Details</v-card-title>
            </v-card-item>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Payment Status</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.payment_status ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Payment Method</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.payment_method ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">Premium</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.premium ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>

            <v-row class="pb-12 pt-6">
              <v-col cols="12" md="6">
                <BaseButton mode="colored">Modify Policy</BaseButton>
              </v-col>
            </v-row>
          </v-col>

          <!-- RIGHT SIDE: NIID POLICY DETAILS -->
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title">NIID Policy Details</v-card-title>
            </v-card-item>

            <!-- NIID STATUS with chip label -->
            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">NIID status</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <div v-if="details?.niid_status === 'N'">
                    <v-chip small color="warning" dark>Not Sent</v-chip>
                  </div>

                  <div v-else-if="details?.niid_status === 'Y'">
                    <v-chip small color="green" dark>Sent</v-chip>
                  </div>

                  <div v-else>
                    <v-chip small color="grey" dark>Unknown</v-chip>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>

            <!-- NIID RESPONSE -->
            <v-row>
              <v-col cols="4">
                <v-card-text><h2 class="card-text-bold">NIID Response</h2></v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text><h3 class="card-text-light">{{ details?.niid_response ?? '-' }}</h3></v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </UiChildCard>
    </v-row>
  </div>
</template>

<script>
definePageMeta({
  layout: "motor",
});

import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import BaseBadge from "@/components/ui-components/badge/BaseBadge";
import { usePolicyStore } from "~/store/motor/thirdparty/policy";

import { ref, onMounted } from "vue";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
    BaseBadge,
  },
  setup() {
    const route = useRoute();
    const details = ref(null);
    const store = usePolicyStore();

    const viewPolicy = async () => {
      try {
        const id = route.params.id;
        const getPolicy = await store.viewPolicy(id);

        if (getPolicy?.status == "success") {
          // ✅ fixed assignment
          details.value = getPolicy.data;
        } else {
          console.log("Could not fetch data", getPolicy);
        }
      } catch (error) {
        console.log("Error fetching policy:", error);
      }
    };

    onMounted(() => {
      viewPolicy();
    });

    return {
      details,
      route,
      viewPolicy,
      store,
    };
  },
});
</script>

<style scoped></style>
