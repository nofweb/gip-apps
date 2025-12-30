<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">All Quotation</h1>
      </v-col>
      <v-col cols="3">
        <nuxt-link to="/quotations/generate">
          <BaseButton mode="colored">Generate Quotation</BaseButton>
        </nuxt-link>

        <!-- <BaseButton @click="fetchData()" mode="colored">Fetch</BaseButton> -->
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
          <!-- <template>
            <v-server-pagination :url="apiUrl" :params="queryParams">
              <template #items="{ items }">
                <v-data-table :headers="headers" :items="items" />
              </template>
            </v-server-pagination>
          </template> -->

          <!-- <v-data-table :headers="headers" :items="tableData" /> -->

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
            <template v-slot:[`item.status`]="{ item }">
              <div v-if="item?.status == 'paid'">
                <v-chip large color="#5C7AE8" dark>Paid</v-chip>
              </div>
              <div v-if="item?.status == 'expired'">
                <v-chip large color="#E33E2B" dark>Expired</v-chip>
              </div>
              <div v-if="item?.status == 'pending'">
                <v-chip large color="warning" dark>Pending</v-chip>
              </div>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <nuxt-link :to="`/quotations/${item.id}`">
                <v-btn large variant="tonal" color="#a6ce39">View</v-btn>
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
import { format } from "date-fns";
import moment from "moment";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import { useQuotationStore } from "~/store/quotation";
import { useBrokerStore } from "~/store/broker";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const quotationStore = useQuotationStore();
    const brokerStore = useBrokerStore();
    const apiUrl = useRuntimeConfig().public.api_url + "/marine/quotation";
    const queryParams = ref({
      order_by: "desc",
    });
    const loading = ref(true);
    const totalItems = ref("0");
    const itemsPerPage = ref("");
    const list_quotation = ref([]);
    const formatDate = (value) => {
      return moment(value).format("DD MMMM YYYY HH:mm A");
    };
    const headers = [
      { title: "SN", key: "sn" },
      { title: "Type", key: "holder_type" },
      { title: "Sum Insured", key: "invoice_value" },
      { title: "Phone Number", key: "phone_number" },
      {
        title: "Date Created",
        key: "created_at",
      },
      { title: "Exchange Rate", key: "exchange_rate" },
      { title: "Premium", key: "premium" },
      { title: "Status", key: "status" },
      { title: "Action", key: "action" },
    ];

    // List all quotation
    const loadItems = quotationStore
      .listQuotation()
      .then((brokers) => {
        if (brokers.status === "success") {
          list_quotation.value = brokers.data.data;
          totalItems.value = brokers.data.total;
          itemsPerPage.value = brokers.data.per_page;
          loading.value = false;
          // console.log(list_quotation.value);
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
      apiUrl,
      // formattedDates,
      formatDate,
      queryParams,
      // fetchData,
    };
  },
});
</script>
