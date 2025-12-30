<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">All Claims</h1>
      </v-col>
      <v-col cols="3">
        <!-- <nuxt-link to="/quotations/generate">
          <BaseButton mode="colored">Generate Quotation</BaseButton>
        </nuxt-link> -->

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
            :items="list_claims"
            :items-length="totalItems"
            :loading="loading"
            @update:options="loadItems"
          >
            <template v-slot:[`item.sn`]="{ item, index }">
              <td>{{ index + 1 }}</td>
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
              <td>{{ formatDate(item.created_at) }}</td>
            </template>
            <template v-slot:[`item.policy_number`]="{ item }">
              <td>{{ item.policy.policy_number }}</td>
            </template>
            <template v-slot:[`item.certificate_number`]="{ item }">
              <td>{{ item.policy.certificate_number }}</td>
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
              <nuxt-link :to="`/claims/${item.id}`">
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
import { useClaimStore } from "~/store/claim";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const quotationStore = useQuotationStore();
    const claimStore = useClaimStore();
    const brokerStore = useBrokerStore();
    const apiUrl = useRuntimeConfig().public.api_url + "/marine/quotation";
    const queryParams = ref({
      order_by: "desc",
    });
    const loading = ref(true);
    const totalItems = ref("0");
    const itemsPerPage = ref("");
    const list_claims = ref([]);
    const formatDate = (value) => {
      return moment(value).format("DD MMMM YYYY HH:mm A");
    };
    const headers = [
      { title: "SN", key: "sn" },
      { title: "Certificat Number", key: "certificate_number" },
      { title: "Policy Number", key: "policy_number" },
      { title: "Amount", key: "amount" },
      {
        title: "Date Created",
        key: "created_at",
      },
      { title: "Status", key: "status" },
      { title: "Action", key: "action" },
    ];
    // const formattedDates = computed(() => {
    //   return list_quotation.value.map((item) => {
    //     const parsedDate = new Date(item.created_at);
    //     const desiredFormat = "dd/MM/yyyy";
    //     return format(parsedDate, desiredFormat);
    //   });
    // });

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

    // List all claims
    const loadItems = claimStore
      .listClaims()
      .then((claims) => {
        if (claims.status === "success") {
          list_claims.value = claims.data.data;
          totalItems.value = claims.data.total;
          itemsPerPage.value = claims.data.per_page;
          loading.value = false;
          // console.log(list_quotation.value);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    // async function fetchData() {
    //   quotationStore
    //     .listQuotation()
    //     .then((brokers) => {
    //       if (brokers.status === "success") {
    //         tableData.value = brokers.data.data;
    //         // console.log(tableData.value);
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }

    // async function fetchData() {
    //   try {
    //     const url = new URL(apiUrl, window.location.origin);
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     tableData.value = data;
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     // Handle errors appropriately, e.g., display an error message
    //   }
    // }
    // onMounted(() => {
    //   fetchData({
    //     order_by: "desc",
    //   });
    // });

    return {
      headers,
      quotationStore,
      loadItems,
      list_claims,
      loading,
      totalItems,
      itemsPerPage,
      brokerStore,
      apiUrl,
      // formattedDates,
      formatDate,
      queryParams,
      claimStore,
      // fetchData,
    };
  },
});
</script>
