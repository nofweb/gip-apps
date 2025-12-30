<template>
  <div>
    <v-row>
      <v-col cols="2">
        <h1 class="primary-text">Add User</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard title="New User">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field label="First Name"> </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Last Name"> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Email"> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field label="Phone Number"> </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                label="Wllet"
                :items="wallet"
                item-value="value"
                item-title="name"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                label="Marketers"
                :items="marketers"
                item-value="value"
                item-title="name"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="pb-8">
            <v-col cols="12" md="2">
              <BaseButton mode="colored">Add User</BaseButton>
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

    const wallet = ref([
      { name: "prepaid", value: "Pre Paid" },
      { name: "Post_paid", value: "Post Paid" },
    ]);


    
    const marketers = ref([
      { name: "Chisom", value: "Chisom" },
      { name: "Ada", value: "Ada" },
      { name: "festus", value: "Festus" },
    ]);

    return {
      status,
      wallet,
      marketers,
    };
  },
});
</script>
