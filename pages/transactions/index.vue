<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">All Transaction</h1>
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
            :items="list_transaction"
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
            <!-- <template v-slot:[`item.status`]="{ item }">
              <div v-if="item?.status == 'successful'">
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
            </template> -->
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
import { useTransactionStore } from "~/store/transaction";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const transactionStore = useTransactionStore();
    const loading = ref(true);
    const totalItems = ref("0");
    const itemsPerPage = ref("");
    const list_transaction = ref([]);
    const formatDate = (value) => {
      return moment(value).format("DD MMMM YYYY HH:mm A");
    };
    const headers = [
      { title: "SN", key: "sn" },
      { title: "Amount", key: "amount" },
      { title: "Previous Amount", key: "previous_balance" },
      { title: "New Amount", key: "new_balance" },
      { title: "Source", key: "source" },
      //   { title: "Status", key: "status" },
      {
        title: "Date Created",
        key: "created_at",
      },
    ];

    // List all Transaction
    const loadItems = transactionStore
      .listTransaction()
      .then((transactions) => {
        if (transactions.status === "success") {
          list_transaction.value = transactions.data.data;
          totalItems.value = transactions.data.total;
          itemsPerPage.value = transactions.data.per_page;
          loading.value = false;
          // console.log(list_quotation.value);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      headers,
      loadItems,
      list_transaction,
      loading,
      totalItems,
      itemsPerPage,
      // formattedDates,
      formatDate,
      transactionStore,
      // fetchData,
    };
  },
});
</script>
