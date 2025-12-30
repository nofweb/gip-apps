<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">Approved Payment</h1>
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
      { title: "Client Name", key: "client_name" },
      { title: "Date Added", key: "date_added" },
      { title: "Broker", key: "broker" },
      { title: "Action", key: "action" },
    ];
    const users = ref([
      {
        client_name: "Napoleon Festus",
        date_added: "22-02-2024",
        broker: "Ozeh Daniel",
      },
      {
        client_name: "Napoleon Festus",
        date_added: "22-02-2024",
        broker: "Ozeh Daniel",
      },
      {
        client_name: "Napoleon Festus",
        date_added: "22-02-2024",
        broker: "Ozeh Daniel",
      },
      {
        client_name: "Napoleon Festus",
        date_added: "22-02-2024",
        broker: "Ozeh Daniel",
      },
    ]);

    return {
      headers,

      users,
    };
  },
});
</script>
