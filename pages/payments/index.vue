<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">All Payment</h1>
      </v-col>
      <!-- <v-col cols="2">
        <nuxt-link to="/quotations/add-quotation">
          <BaseButton mode="colored">Add Quotation</BaseButton>
        </nuxt-link>
      </v-col> -->
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard>
          <v-col cols="12" md="2">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              label="Search"
              placeholder="Enter your search term"
            />
          </v-col>
          <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="list_quotation"
            :items-length="totalItems"
            :loading="loading"
            @update:options="loadItems"
          >

            <template v-slot:[`item.sn`]="{ item, index }">
              <td> {{ index + 1 }}</td>
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
              <td>{{ formatDate(item.created_at) }}</td>
            </template>
            <template v-slot:[`item.reference`]="{ item }">
              <td>{{ item.payment_reference }}</td>
            </template>
            <template v-slot:[`item.sum_insured`]="{ item }">
              <td>{{ item.quotation.sum_insured }}</td>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <div v-if="item?.quotation.status == 'paid'">
                <v-chip large color="#5C7AE8" dark>Paid</v-chip>
              </div>
              <div v-else>
                <v-chip large color="#E33E2B" dark>Not Paid</v-chip>
              </div>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <nuxt-link :to="`/policy/${item.id}`">
                <v-btn large variant="tonal" color="#a6ce39">Download</v-btn>
              </nuxt-link>
            </template>
          </v-data-table-server>
        </UiChildCard>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import moment from "moment";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import { useQuotationStore } from "~/store/quotation";
import { usePolicyStore } from "~/store/policy";
import { useBrokerStore } from "~/store/broker";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const quotationStore = useQuotationStore();
    const brokerStore = useBrokerStore();
    const policyStore = usePolicyStore();
    const list_quotation = ref([]);
    const headers = [
      { title: "SN", key: "sn" },
      { title: "Reference", key: "reference" },
      { title: "Status", key: "status" },
      { title: "Amount", key: "amount_paid" },
      { title: "Date", key: "created_at" },

      { title: "Invoice", key: "action" },
    ];
    const loading = ref(true);
    const totalItems = ref("0");
    const itemsPerPage = ref("");
    const formatDate = (value) => {
      return moment(value).format("DD MMMM YYYY HH:mm A");
    };
    // List all brokers
    // const loadItems = quotationStore
    //   .listQuotation()
    //   .then((quotation) => {
    //     if (quotation.status === "success") {
    //       list_quotation.value = quotation.data.data;
    //       totalItems.value = quotation.data.total;
    //       itemsPerPage.value = quotation.data.per_page;
    //       loading.value = false;
    //       console.log(totalItems.value);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // List all Policy
    const loadItems = policyStore
      .listTransactions()
      .then((brokers) => {
        if (brokers.status === "success") {
          list_quotation.value = brokers.data.data;
          totalItems.value = brokers.data.total;
          itemsPerPage.value = brokers.data.per_page;
          loading.value = false;
          //   console.log(list_broker.value);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      headers,
      quotationStore,
      loadItems,
      list_quotation,
      loading,
      totalItems,
      itemsPerPage,
      brokerStore,
      policyStore,
      formatDate,
    };
  },
});
</script>
