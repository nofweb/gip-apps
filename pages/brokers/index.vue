<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">All Brokerss</h1>
      </v-col>
      <v-col cols="2">
        <nuxt-link to="/brokers/add-broker">
          <BaseButton mode="colored">Add Broker</BaseButton>
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
            <v-col cols="12" md="2">
              <v-select
                label="Status"
                :items="status"
                item-value="value"
                item-title="name"
              ></v-select>
            </v-col>
          </v-row>
          <v-data-table :headers="headers" :items="users" class="mt-8">
            <template v-slot:[`item.status`]="{ item }">
              <div v-if="item?.status == 'active'">
                <v-chip large color="#E33E2B" dark>Active</v-chip>
              </div>
              <div v-else>
                <v-chip large color="#E33E2B" dark>Not Active</v-chip>
              </div>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn large variant="tonal" color="#a6ce39">View</v-btn>
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
      { title: "Full Name", key: "full_name" },
      { title: "Status", key: "status" },
      { title: "Phone Number", key: "phone_number" },
      { title: "Roles", key: "roles" },
      { title: "Action", key: "action" },
    ];
    const users = ref([
      {
        full_name: "Napoleon Festus",
        status: "not active",
        phone_number: "08162262494",
        roles: "Admin",
      },
      {
        full_name: "Napoleon Festus",
        status: "not active",
        phone_number: "08162262494",
        roles: "Admin",
      },
      {
        full_name: "Napoleon Festus",
        status: "not active",
        phone_number: "08162262494",
        roles: "Admin",
      },
      {
        full_name: "Napoleon Festus",
        status: "not active",
        phone_number: "08162262494",
        roles: "Admin",
      },
      {
        full_name: "Napoleon Festus",
        status: "not active",
        phone_number: "08162262494",
        roles: "Admin",
      },
      {
        full_name: "Napoleon Festus",
        status: "not active",
        phone_number: "08162262494",
        roles: "Admin",
      },
    ]);
    const status = ref([
      { name: "ict", value: "Ict" },
      { name: "technicial", value: "Technician" },
      { name: "broker", value: "Broker" },
      { name: "brokers", value: "Brokesr" },
      { name: "customers", value: "Customers" },
      { name: "marketers", value: "Marketers" },
    ]);

    return {
      headers,
      status,
      users,
    };
  },
});
</script>
