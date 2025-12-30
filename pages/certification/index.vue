<template>
  <div>
    <v-row>
      <v-col cols="2">
        <h1 class="primary-text">View Certification</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard title="Search policies by policy number">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Policy Nuumber"> </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pb-8">
            <v-col cols="12" md="2">
              <BaseButton mode="colored">Reprint Policy</BaseButton>
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
export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const status = ref([
      { name: "ict", value: "Ict" },
      { name: "technicial", value: "Technician" },
      { name: "broker", value: "Broker" },
      { name: "brokers", value: "Brokesr" },
      { name: "customers", value: "Customers" },
      { name: "marketers", value: "Marketers" },
    ]);

    return {
      status,
    };
  },
});
</script>
