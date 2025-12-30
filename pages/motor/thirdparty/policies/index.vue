<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">My Policy</h1>
      </v-col>
      <v-col cols="3">
        <nuxt-link to="/motor/thirdparty/policies/buy">
          <BaseButton mode="colored">Buy Policy</BaseButton>
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

            <v-col cols="12" md="2">
              <v-select
                v-model="store.policyData.status"
                label="Status"
                :items="status"
                item-value="value"
                item-title="name"
              ></v-select>
            </v-col>

            <v-col cols="12" md="2">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    :model-value="store.fromDateFormatted"
                    label="From date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="store.fromDate"
                  @input="menu1 = false"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="2">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    :model-value="store.toDateFormatted"
                    label="To date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="store.toDate"
                  @input="menu2 = false"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn @click="getPolicy()" color="primary">
                Filter Report
                <v-icon right>mdi-filter</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn color="primary">
                Download Report
                <v-icon right>mdi-download</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <!-- Skeleton while loading -->
          <div v-if="loading" class="pa-4">
            <v-skeleton-loader
              type="table"
              class="mb-4"
            />
            <!-- optional: a second pass to mimic more rows -->
            <v-skeleton-loader type="table" />
          </div>

          <v-data-table-virtual
            v-else
            hide-default-footer
            :headers="headers"
            :items="policy"
            disable-pagination
          >
            <!-- <template v-slot:[`item.sn`]="{ item, index }">
              <td> {{ index + 1 }}</td>
            </template> -->

            <!-- <template v-slot:[`item.created_at`]="{ item }">
              <td>{{ formatDate(item.created_at) }}</td>
            </template>  -->

            <template v-slot:[`item.first_name`]="{ item }">
              <div v-if="item.first_name != null">
                {{ item.first_name }} {{ item.last_name }}
              </div>
              <div v-if="item.first_name == null">
                {{ item.company_name }}
              </div>
            </template>

            <template v-slot:[`item.niid_status`]="{ item }">
              <div v-if="item.niid_status == 'N'">
                <v-chip small color="warning" dark> Not Sent </v-chip>
              </div>
              <div v-if="item.niid_status == 'Y'">
                <v-chip small color="green" dark> Sent </v-chip>
              </div>
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
              <nuxt-link :to="`/motor/thirdparty/policies/${item.id}`">
                <v-btn large variant="tonal" color="#a6ce39">View</v-btn>
              </nuxt-link>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn size="30" icon variant="flat" class="grey100">
                <v-avatar size="22">
                  <DotsVerticalIcon size="20" color="grey100" />
                </v-avatar>
                <v-menu activator="parent">
                  <v-list>
                    <v-list-item
                      value="action"
                      v-for="list in tableActionData"
                      :key="list.listtitle"
                      @click="handleClick(list, item)"
                      hide-details
                      min-height="38"
                    >
                      <v-list-item-title>
                        <v-avatar size="20" class="mr-2">
                          <component
                            :is="list.icon"
                            stroke-width="2"
                            size="20"
                          />
                        </v-avatar>
                        {{ list.listtitle }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </template>
          </v-data-table-virtual>

          <!-- =========================
               PAGINATION
               ========================= -->
          <v-row>
            <v-col cols="12" md="10">
              <v-pagination
                v-model="page"
                :length="totalPages"
                total-visible="5"
                dark
                @update:modelValue="handlePageChange"
                color="grey"
              >
              </v-pagination>
              <!-- <v-pagination :value="currentPage" :length="totalPages" @input="handlePageChange"></v-pagination> -->
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="pageSize"
                :items="pageSizes"
                label="item per page"
                @update:modelValue="handlePageSizeChange"
              >
              </v-select>
            </v-col>
          </v-row>
        </UiChildCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
definePageMeta({
  layout: 'motor'
});

import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import { format } from "date-fns";
import moment from "moment";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import { usePolicyStore } from "~/store/motor/thirdparty/policy";

import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const store = usePolicyStore();
    const router = useRouter();
    const tableActionData = store.$state.tableActionData;
    const policy = ref([]);
    const date = ref(null);
    const menu1 = ref(false);
    const menu2 = ref(false);

    // NEW: simple loading state
    const loading = ref(true);

    // const fromDate = ref(null)
    // const fromDateFormatedDate = computed(() => {
    //   return fromDate.value ? new Date(fromDate.value).toLocaleDateString() : ''
    // })
    // const toDate = ref(null)
    // const toDateFormatedDate = computed(() => {
    //   return fromDate.value ? new Date(toDate.value).toLocaleDateString() : ''
    // })

    const all_policies = ref([{ id: "1", sn: "1" }]);
    const myPolicy = ref([]);
    const status = ref([
      { name: "All", value: "" },
      { name: "Sent", value: "Y" },
      { name: "Not Sent", value: "N" },
    ]);

    const totalItems = ref("0");
    const itemsPerPage = ref("");

    // =========================
    // PAGINATION
    // =========================
    let currentPage = ref(1);
    let totalPages = ref();
    let pageSize = ref(25);
    let pageSizes = ref([5, 10, 15, 20, 25]);

    let page = ref(1);
    let limit = ref(pageSize.value);

    function handlePageChange(value) {
      page.value = value;
      getPolicy();
    }

    function handlePageSizeChange(value) {
      pageSize.value = value;
      limit.value = value;
      console.log("The page size is", value);
      getPolicy();
    }

    onMounted(() => {
      getPolicy();
    });

    // Fetch all my policy
    store.myPolicy()
      .then((policy) => {
        // console.log(policy)
      });

    const getPolicy = async () => {
      loading.value = true;
      try {
        const payload = {
          niid_status: store.policyData.status,
          from_date: store.fromDateISO || "",
          to_date: store.toDateISO || "",
          page: page.value,
          per_page: pageSize.value,
        };

        console.log("The payload is", payload);

        const response = await store.myPolicy(payload);
        if (response.status == 'success') {
          policy.value = response.data.data;
          totalItems.value = response.data.total;
          // itemsPerPage.value = response.data.per_page;
          totalPages.value = Math.ceil(response.data.total / response.data.per_page);
          console.log("The response is", response);
          console.log("My policy response is", response);
        }
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    };

    const headers = [
      { title: "Policy Number", key: "policy_number" },
      { title: "Variant", key: "variance" },
      { title: "Rrgistration Number", key: "registration_number" },
      {
        title: "Insured Name",
        key: "first_name",
      },
      { title: "Policy Type", key: "policy_type" },
      { title: "Payment Method", key: "payment_method" },
      { title: "Amount", key: "premium" },
      { title: "Status", key: "niid_status" },
      { title: "Date", key: "created_at" },
      { title: "Action", key: "actions" },
    ];

    function handleClick(list, item) {
      if (list.listtitle === 'View') {
        this.linkId(item);
      } else if (list.listtitle === 'Edit') {
        this.editItem(item);
      } else if (list.listtitle === 'Print Certificate') {
 handlePrintCertificate(item);      }
    }

    function linkId(item) {
      const id = item.id;
      console.log("The id is ", id);
      router.push(`/motor/thirdparty/policies/${id}`);
      // router.push({ name: 'customer', params: { id: id } })
    }


    const handlePrintCertificate = (item) => {
        const certificateNumber = item.certificate_number
        console.log("The certificate number is", certificateNumber)
  // Build the full URL to the certificate endpoint
  const url = `${config.public.api_url}/customer/certificate?certificate_number=${encodeURIComponent(
    certificateNumber
  )}`;

  // Open in a new tab (browser will either show PDF or download)
  window.open(url, '_blank');
};

    return {
      headers,
      all_policies,
      tableActionData,
      store,
      router,
      menu1,
      menu2,
      date,
      status,
      handleClick,
      linkId,
      myPolicy,
      getPolicy,
      policy,
      loading,
      currentPage,
      totalPages,
      pageSize,
      pageSizes,
      page,
      limit,
      handlePageChange,
      handlePageSizeChange,
      totalItems,
      itemsPerPage,
    };
  },
});
</script>
