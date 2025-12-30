<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">View Policy</h1>
      </v-col>
      <v-col cols="2">
        <a :href="`${details.certificate_url}`" target="_blanked">
          <BaseButton mode="colored">Print Certificate</BaseButton>
        </a>
      </v-col>
    </v-row>
    <v-row>
      <UiChildCard>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title">Customer Info</v-card-title>
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Policy Holder Type:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.holder_type }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Name:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.first_name }}
                    {{ details?.quotation?.last_name }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Address:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.contact_address }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Phone Number</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.phone_number }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Email:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.email }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title">KYC Details</v-card-title>
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Marine Policy Type</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.policy_type }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Cover Type :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.cover_type }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Cargo Description:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.cargo_description }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Packaging Type :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.packaging_type }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Bank Name :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.bank_name }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title">Quotations</v-card-title>
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Sum Insured :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.sum_insured }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Premium :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.premium }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Basic Rate :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.basic_rate }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">War And Strike Rate :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light"></h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Total Rate :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light"></h3>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Sailing From :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.port_of_departure }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Vessel Name :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.vessel_name }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Invoice Value :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.invoice_value }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Exchange Rate:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details?.quotation?.exchange_rate }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Co-Insurance :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">None</h3>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title">Policy</v-card-title>
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Certificate Number :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.policy_number }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Date Added :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.created_at }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Condition:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">Good</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Tin:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details?.quotation?.tin }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Nature Of Cargo:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">General Menchanzed</h3>
                </v-card-text>
              </v-col>
            </v-row> -->
          </v-col>
        </v-row>
        <v-row class="pb-12">
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title">Payments</v-card-title>
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Payment ID:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light"></h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Reference Number:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light"></h3>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Proforma Invoice Number:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details.proforma_invoice_number }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pb-8">
          <v-col cols="2">
            <nuxt-link :to="`/certificates/${details.id}/file-claim`">
              <BaseButton mode="colored">File A Claim</BaseButton>
            </nuxt-link>
          </v-col>
        </v-row>
      </UiChildCard>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import { usePolicyStore } from "~/store/policy";

import BaseButton from "@/components/ui-components/buttons/BaseButton";
export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const route = useRoute();
    const policyStore = usePolicyStore();
    const details = ref({});

    policyStore
      .viewPolicy(route.params.id)
      .then((quotation) => {
        if (quotation.status === "success") {
          details.value = quotation.data;
          // console.log(details.value);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      policyStore,
      details,
      route,
    };
  },
});
</script>

<style scoped></style>
