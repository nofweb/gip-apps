<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">View Policy</h1>
      </v-col>
      <v-col cols="2">
        <!-- <nuxt-link
          v-if="details.status == 'pending'"
          :to="`/quotations/${details.id}/payment`"
        >
          <BaseButton mode="colored">Make Payment</BaseButton>
        </nuxt-link> -->
    
      </v-col>
    </v-row>
    <v-row>
      <UiChildCard>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title"
                > Policy Details</v-card-title
              >
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Policy Number:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Effective from</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Expired in:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">NIID status</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Certificate Number:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Vehicle Category</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Vehicle Make</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Vehicle Color</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Vehicle Type</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Vehicle Model</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Year of Make</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Registration Number</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Chasis Number</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Engine Number</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">NIID Response</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row class="pb-12">
              <v-col cols="12" md="6">
                <BaseButton mode="colored">Modify Policy</BaseButton>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-item class="pb-8">
              <v-card-title class="card-title"
                >NIID Policy Details</v-card-title
              >
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Policy Number:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3 class="card-text-light">GIP/PM/09/24/0000749/WPL
                  </h3>
                </v-card-text>
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
  layout: 'motor'
});
import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";

import BaseButton from "@/components/ui-components/buttons/BaseButton";
import BaseBadge from "@/components/ui-components/badge/BaseBadge";
import { usePolicyStore } from "~/store/motor/thirdparty/policy";

import { ref, computed, onMounted } from "vue";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
    BaseBadge,
  },
  setup() {
    const { notify } = useNotification();
    const route = useRoute();
    const details = ref([]);
    const store = usePolicyStore()

    const isActive = ref(null);
    const viewPolicy = async () => {
      try {
        const id = route.params.id;
        const getPolicy = await store.viewPolicy(id);
        if (getPolicy.status == "success") {
          details.value = getQuotation.data;
        }
        console.log("Could not fetch data")
      } catch (error) {}
    };

  

    //     const displayName = computed(() => {
    //   if (details.value?.company_name && !details.value?.first_name && !details.value?.last_name) {
    //     return details.value.company_name;
    //   } else if (!details.value?.company_name && details.value?.first_name && details.value?.last_name) {
    //     return `${details.value.first_name} ${details.value.last_name}`;
    //   } else {
    //     // handle cases where some or all values are missing
    //     return '';
    //   }
    // });

    onMounted(() => {
      viewPolicy()
    })

    const closeDialog = () => {
      isActive.value = false;
      console.log(isActive.value);
    };



   

    return {
      details,
      isActive,
      route,
      closeDialog,
      viewPolicy,
      store
    };
  },
});
</script>

<style scoped></style>
