<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">Credit Users</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search"
                placeholder="Enter your search term"
              />
            </v-col>
            <!-- <v-col cols="12" md="2">
                  <v-select
                    label="Status"
                    :items="status"
                    item-value="value"
                    item-title="name"
                  ></v-select>
                </v-col> -->
          </v-row>
          <v-data-table
            :headers="headers"
            :items="users"
            class="mt-8"
            :search="search"
          >
            <template v-slot:[`item.status`]="{ item }">
              <div v-if="item?.status == 'active'">
                <v-chip large color="#5C7AE84D" dark>Active</v-chip>
              </div>
              <div v-else>
                <v-chip large color="#E33E2B" dark>Not Active</v-chip>
              </div>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <nuxt-link :to="`/reports/${1}`">
                <v-btn large variant="tonal" color="#a6ce39">View</v-btn>
              </nuxt-link>
            </template>
          </v-data-table>
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
    const headers = [
      { title: "Broker Name", key: "broker_name" },
      { title: "Account Type", key: "account_type" },
      { title: "Wallet Balance", key: "wallet_balance" },
      { title: "Credit Balance", key: "credit_balance" },
      { title: "Unpaid Credit", key: "unpaid_credit" },
    ];
    const users = ref([
      {
        broker_name: "Napoleon Festus",
        account_type: "PrePaid",
        wallet_balance: "600034",
        credit_balance: "6000064",
        unpaid_credit: "1000003",
      },
      {
        broker_name: "Napoleon Festus",
        account_type: "PrePaid",
        wallet_balance: "600034",
        credit_balance: "6000064",
        unpaid_credit: "1000003",
      },
      {
        broker_name: "Napoleon Festus",
        account_type: "PrePaid",
        wallet_balance: "600034",
        credit_balance: "6000064",
        unpaid_credit: "1000003",
      },
      {
        broker_name: "Napoleon Festus",
        account_type: "PrePaid",
        wallet_balance: "600034",
        credit_balance: "6000064",
        unpaid_credit: "1000003",
      },
    ]);

    return {
      headers,

      users,
    };
  },
});
</script>
