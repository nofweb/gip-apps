<template>
  <div>
    <v-row>
      <v-col cols="2">
        <h1 class="primary-text">PostPaid Payment</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard title="Add PostPaid Payment">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Amount"> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                label="Broker"
                :items="Broker"
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
    const broker = ref([
      { name: "festus", value: "Festus" },
      { name: "daniel", value: "Daniel" },
      { name: "peter", value: "Peter" },
    ]);

    return {
      broker,
    };
  },
});
</script>
