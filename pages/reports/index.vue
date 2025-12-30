<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">Policy Reports</h1>
      </v-col>
      <v-col cols="2">
        <nuxt-link to="/users/add-user">
          <BaseButton mode="colored">Add Rate</BaseButton>
        </nuxt-link>
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
                <v-chip large color="#E33E2B" dark>Active</v-chip>
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
      { title: "Policy No", key: "policy_no" },
      { title: "Sum Insured", key: "sum_insured" },
      { title: "Premium", key: "premium" },
      { title: "Rates", key: "rates" },
      { title: "Customer", key: "customer" },
      { title: "Conditions", key: "conditions" },
      { title: "Policy Type", key: "policy_type" },
      { title: "Created Date", key: "created_date" },
      { title: "Status", key: "status" },
      { title: "Action", key: "action" },
    ];
    const users = ref([
      {
        policy_no: "GIP/MOC?05/19/07637/",
        sum_insured: "36,140,141.00",
        premium: "41,155.00",
        rates: "0.100",
        customer: "Napoleon Festus",
        conditions: "ICCC",
        policy_type: "Open Cover",
        created_date: "2023-10-01",
        status: "sent",
      },
      {
        policy_no: "GIP/MOC?05/19/07637/",
        sum_insured: "36,140,141.00",
        premium: "41,155.00",
        rates: "0.100",
        customer: "Napoleon Festus",
        conditions: "ICCC",
        policy_type: "Open Cover",
        created_date: "2023-10-01",
        status: "sent",
      },
      {
        policy_no: "GIP/MOC?05/19/07637/",
        sum_insured: "36,140,141.00",
        premium: "41,155.00",
        rates: "0.100",
        customer: "Napoleon Festus",
        conditions: "ICCC",
        policy_type: "Open Cover",
        created_date: "2023-10-01",
        status: "sent",
      },
      {
        policy_no: "GIP/MOC?05/19/07637/",
        sum_insured: "36,140,141.00",
        premium: "41,155.00",
        rates: "0.100",
        customer: "Napoleon Festus",
        conditions: "ICCC",
        policy_type: "Open Cover",
        created_date: "2023-10-01",
        status: "sent",
      },
      {
        policy_no: "GIP/MOC?05/19/07637/",
        sum_insured: "36,140,141.00",
        premium: "41,155.00",
        rates: "0.100",
        customer: "Napoleon Festus",
        conditions: "ICCC",
        policy_type: "Open Cover",
        created_date: "2023-10-01",
        status: "sent",
      },
      {
        policy_no: "GIP/MOC?05/19/07637/",
        sum_insured: "36,140,141.00",
        premium: "41,155.00",
        rates: "0.100",
        customer: "Napoleon Festus",
        conditions: "ICCC",
        policy_type: "Open Cover",
        created_date: "2023-10-01",
        status: "sent",
      },
      {
        policy_no: "GIP/MOC?05/19/07637/",
        sum_insured: "36,140,141.00",
        premium: "41,155.00",
        rates: "0.100",
        customer: "Napoleon Festus",
        conditions: "ICCC",
        policy_type: "Open Cover",
        created_date: "2023-10-01",
        status: "sent",
      },
    ]);

    return {
      headers,

      users,
    };
  },
});
</script>
