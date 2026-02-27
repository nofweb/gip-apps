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
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <UiChildCard>
          <v-row>
            <v-col cols="12" md="2">
              <v-select
                v-model="store.policyData.status"
                label="Status"
                :items="status"
                item-value="value"
                item-title="name"
              />
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="store.policyData.variant"
                label="Variant"
                :items="variant"
                item-value="value"
                item-title="name"
              />
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
                  />
                </template>
                <v-date-picker v-model="store.fromDate" @input="menu1 = false" no-title />
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
                  />
                </template>
                <v-date-picker v-model="store.toDate" @input="menu2 = false" no-title />
              </v-menu>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn @click="getPolicy()" color="primary">
                Filter Report
                <v-icon right>mdi-filter</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn
                color="primary"
                :loading="downloading"
                :disabled="downloading"
                @click="downloadAllFilteredCSV"
              >
                Download Report
                <v-icon right>mdi-download</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <div v-if="loading" class="pa-4">
            <v-skeleton-loader type="table" class="mb-4" />
            <v-skeleton-loader type="table" />
          </div>

          <v-data-table-virtual
            v-else
            hide-default-footer
            :headers="headers"
            :items="policy"
            disable-pagination
          >
            <template v-slot:[`item.first_name`]="{ item }">
              <div v-if="item.first_name != null">
                {{ item.first_name }} {{ item.last_name }}
              </div>
              <div v-else>
                {{ item.company_name }}
              </div>
            </template>

            <template v-slot:[`item.niid_status`]="{ item }">
              <div v-if="item.niid_status == 'N'">
                <v-chip small color="warning" dark> Not Sent </v-chip>
              </div>
              <div v-else-if="item.niid_status == 'Y'">
                <v-chip small color="green" dark> Sent </v-chip>
              </div>
            </template>

            <template v-slot:[`item.status`]="{ item }">
              <div v-if="item?.status == 'paid'">
                <v-chip large color="#5C7AE8" dark>Paid</v-chip>
              </div>
              <div v-else-if="item?.status == 'expired'">
                <v-chip large color="#E33E2B" dark>Expired</v-chip>
              </div>
              <div v-else-if="item?.status == 'pending'">
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
                          <component :is="list.icon" stroke-width="2" size="20" />
                        </v-avatar>
                        {{ list.listtitle }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </template>
          </v-data-table-virtual>

          <v-row>
            <v-col cols="12" md="10">
              <v-pagination
                v-model="page"
                :length="totalPages"
                total-visible="5"
                dark
                @update:modelValue="handlePageChange"
                color="grey"
              />
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="pageSize"
                :items="pageSizes"
                label="item per page"
                @update:modelValue="handlePageSizeChange"
              />
            </v-col>
          </v-row>
        </UiChildCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
definePageMeta({
  layout: "motor",
});

import { defineComponent, ref, onMounted, nextTick } from "vue";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import { usePolicyStore } from "~/store/motor/thirdparty/policy";
import { useRuntimeConfig, useRouter } from "#imports";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const config = useRuntimeConfig(); // ✅ inside setup
    const router = useRouter();

    const store = usePolicyStore();
    const tableActionData = store.$state.tableActionData;

    const policy = ref([]);
    const menu1 = ref(false);
    const menu2 = ref(false);

    const loading = ref(true);
    const downloading = ref(false);

    const status = ref([
      { name: "All", value: "" },
      { name: "Sent", value: "Y" },
      { name: "Not Sent", value: "N" },
    ]);

    const variant = ref([
      { name: "Third Party", value: "Third Party" },
      { name: "Motor Protect Extra (Private Car)", value: "Motor Protect Extra (Private Car)" },
      { name: "Motor Protect Extra (Private Bus)", value: "Motor Protect Extra (Private Bus)" },
      { name: "Motor Protect Extra (Own Goods)", value: "Motor Protect Extra (Own Goods)" },
    ]);

    const totalItems = ref(0);
    const totalPages = ref(0);

    const page = ref(1);
    const pageSize = ref(25);
    const pageSizes = ref([5, 10, 15, 20, 25]);

    function handlePageChange(value) {
      page.value = value;
      getPolicy();
    }

    function handlePageSizeChange(value) {
      pageSize.value = value;
      page.value = 1;
      getPolicy();
    }

    // ---------------------------
    // HELPERS
    // ---------------------------
    const buildPayload = (overrides = {}) => ({
      niid_status: store.policyData.status,
      variance: store.policyData.variant,
      from_date: store.fromDateISO || "",
      to_date: store.toDateISO || "",
      page: page.value,
      per_page: pageSize.value,
      ...overrides,
    });

    const getPolicy = async () => {
      loading.value = true;
      try {
        const payload = buildPayload();
        const response = await store.myPolicy(payload);

        if (response?.status === "success") {
          policy.value = response.data.data || [];
          totalItems.value = response.data.total || 0;
          totalPages.value = Math.ceil((response.data.total || 0) / (response.data.per_page || pageSize.value));
        } else {
          policy.value = [];
        }
      } catch (e) {
        console.log("getPolicy error:", e);
        policy.value = [];
      } finally {
        loading.value = false;
      }
    };

    // ✅ refresh-safe initial fetch (client only)
    onMounted(async () => {
      await nextTick();
      await getPolicy();
    });

    // ---------------------------
    // DOWNLOAD ALL FILTERED
    // ---------------------------
    const esc = (v) => {
      if (v === null || v === undefined) return "";
      return `"${String(v).replace(/"/g, '""')}"`;
    };

    const toCSV = (rows) => {
      const columns = [
        { label: "Policy Number", key: "policy_number" },
        { label: "Variant", key: "variance" },
        { label: "Registration Number", key: "registration_number" },
        { label: "Insured Name", key: "insured_name" },
        { label: "Policy Type", key: "policy_type" },
        { label: "Payment Method", key: "payment_method" },
        { label: "Amount", key: "premium" },
        { label: "NIID Status", key: "niid_status" },
        { label: "Status", key: "status" },
        { label: "Date", key: "created_at" },
      ];

      const exportRows = rows.map((r) => ({
        ...r,
        insured_name: r.first_name
          ? `${r.first_name} ${r.last_name || ""}`.trim()
          : r.company_name || "",
      }));

      const headerLine = columns.map((c) => esc(c.label)).join(",");
      const dataLines = exportRows.map((r) =>
        columns.map((c) => esc(r[c.key])).join(",")
      );

      return [headerLine, ...dataLines].join("\n");
    };

    const downloadFile = (content, fileName, mime) => {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    };

    const makeFileName = () => {
      const from = store.fromDateISO || "all";
      const to = store.toDateISO || "all";
      const v = store.policyData.variant || "all-variants";
      const s = store.policyData.status || "all-status";
      return `my_policies_${v}_${s}_${from}_to_${to}.csv`.replace(/\s+/g, "_");
    };

    const downloadAllFilteredCSV = async () => {
      downloading.value = true;
      try {
        const EXPORT_PER_PAGE = 500;

        let pageNum = 1;
        let allRows = [];
        let total = null;

        while (true) {
          const payload = buildPayload({ page: pageNum, per_page: EXPORT_PER_PAGE });
          const response = await store.myPolicy(payload);

          if (response?.status !== "success") break;

          const dataPage = response.data.data || [];
          if (total === null) total = response.data.total || 0;

          allRows = allRows.concat(dataPage);

          if (dataPage.length === 0) break;
          if (total !== null && allRows.length >= total) break;

          pageNum += 1;
        }

        if (!allRows.length) {
          alert("No data to download for the selected filters.");
          return;
        }

        const csv = toCSV(allRows);
        downloadFile(csv, makeFileName(), "text/csv;charset=utf-8;");
      } catch (e) {
        console.log("downloadAllFilteredCSV error:", e);
        alert("Failed to download report. Please try again.");
      } finally {
        downloading.value = false;
      }
    };

    // ---------------------------
    // ACTIONS
    // ---------------------------
    function linkId(item) {
      router.push(`/motor/thirdparty/policies/${item.id}`);
    }

    // if you use this in tableActionData
    const handlePrintCertificate = (item) => {
      const certificateNumber = item.certificate_number;
      const url = `${config.public.api_url}/customer/certificate?certificate_number=${encodeURIComponent(
        certificateNumber
      )}`;
      window.open(url, "_blank");
    };

    function handleClick(list, item) {
      if (list.listtitle === "View") linkId(item);
      else if (list.listtitle === "Print Certificate") handlePrintCertificate(item);
      // else if (list.listtitle === "Edit") editItem(item) // keep if you have it
    }

    const headers = [
      { title: "Policy Number", key: "policy_number" },
      { title: "Variant", key: "variance" },
      { title: "Rrgistration Number", key: "registration_number" },
      { title: "Insured Name", key: "first_name" },
      { title: "Policy Type", key: "policy_type" },
      { title: "Payment Method", key: "payment_method" },
      { title: "Amount", key: "premium" },
      { title: "Status", key: "niid_status" },
      { title: "Date", key: "created_at" },
      { title: "Action", key: "actions" },
    ];

    return {
      headers,
      tableActionData,
      store,
      menu1,
      menu2,
      status,
      variant,

      // data + loading
      policy,
      loading,
      downloading,

      // pagination
      page,
      pageSize,
      pageSizes,
      totalPages,
      totalItems,
      handlePageChange,
      handlePageSizeChange,

      // actions
      getPolicy,
      handleClick,
      linkId,

      // download
      downloadAllFilteredCSV,
    };
  },
});
</script>