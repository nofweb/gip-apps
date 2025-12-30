<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">All Rates</h1>
      </v-col>
      <v-col cols="2">
        <nuxt-link to="/rates/add-rate">
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
      { title: "Condition", key: "condition" },
      { title: "Type", key: "type" },
      { title: "Clause A MiN", key: "clause_a_min" },
      { title: "Clause A  MIX", key: "clause_a_mix" },
      { title: "Clause C MiN", key: "clause_c_min" },
      { title: "Clause C  MIX", key: "clause_c_mix" },
      { title: "Status", key: "status" },
      { title: "Action", key: "action" },
    ];
    const users = ref([
      {
        condition: "General Menchandizes",
        type: "General Menchandizes",
        clause_a_min: "0.2500",
        clause_a_mix: "0.2500",
        clause_c_min: "0.2500",
        clause_c_mix: "0.2500",
        status: "active",
      },
      {
        condition: "General Menchandizes",
        type: "General Menchandizes",
        clause_a_min: "0.2500",
        clause_a_mix: "0.2500",
        clause_c_min: "0.2500",
        clause_c_mix: "0.2500",
        status: "active",
      },
      {
        condition: "General Menchandizes",
        type: "General Menchandizes",
        clause_a_min: "0.2500",
        clause_a_mix: "0.2500",
        clause_c_min: "0.2500",
        clause_c_mix: "0.2500",
        status: "inactive",
      },
      {
        condition: "General Menchandizes",
        type: "General Menchandizes",
        clause_a_min: "0.2500",
        clause_a_mix: "0.2500",
        clause_c_min: "0.2500",
        clause_c_mix: "0.2500",
        status: "inactive",
      },
      {
        condition: "General Menchandizes",
        type: "General Menchandizes",
        clause_a_min: "0.2500",
        clause_a_mix: "0.2500",
        clause_c_min: "0.2500",
        clause_c_mix: "0.2500",
        status: "inactive",
      },
    ]);

    return {
      headers,

      users,
    };
  },
});
</script>
