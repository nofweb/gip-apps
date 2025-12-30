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
              <v-col cols="12" md="2">
                <v-select
                label="Status"
                :items="status"
                item-value="value"
                item-title="name"
                ></v-select>
              </v-col>   


              <v-col cols="12" md="2">
                <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="formattedDate"
                    label="From date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  @input="menu = false"
                  no-title
                ></v-date-picker>
            </v-menu>
            </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="all_policies"
            >
  
              <!-- <template v-slot:[`item.sn`]="{ item, index }">
                <td> {{ index + 1 }}</td>
              </template> -->
  
               <!-- <template v-slot:[`item.created_at`]="{ item }">
                <td>{{ formatDate(item.created_at) }}</td>
              </template>  -->
              

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
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn size="30" icon variant="flat" class="grey100">
                  <v-avatar size="22">
                    <DotsVerticalIcon size="20" color="grey100" />
                  </v-avatar>
                  <v-menu activator="parent">
                    <v-list>
                      <v-list-item value="action" v-for="list in tableActionData" :key="list.listtitle" @click="handleClick(list, item)" hide-details min-height="38">
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
            </v-data-table>
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
  import { usePolicyStore } from "~/store/policy";
  export default defineComponent({
    components: {
      BaseButton,
      UiChildCard,
    },
    setup() {
        const store = usePolicyStore();
        const router = useRouter();  
        const tableActionData = store.$state.tableActionData;
        const date = ref(null);
        const menu = ref(false)
        const selectedDate = ref(null)
        const formattedDate = computed(() => {
          return selectedDate.value ? new Date(selectedDate.value).toLocaleDateString() : ''
        })
        const all_policies = ref([{id: "1",sn: "1"}]);
        const status = ref([
          {name: "All", value: "all"},
          {name: "Sent", value: "sent"},
          {name: "Not Sent", value: "not_sent"},

        ])
        // const all_policies = ref([{
        //     sn: "1",
        // }]);
        const headers = [
            { title: "SN", key: "sn" },
            { title: "Policy Number", key: "policy_number" },
            { title: "Rrgistration Number", key: "registration_number" },
            { title: "Created by", key: "created_by" },
            {
            title: "Insured Name",
            key: "insured_name",
            },
            { title: "Policy Type", key: "policy_type" },
            { title: "Payment Method", key: "payment_method" },
            { title: "Amount", key: "amount" },
            { title: "Status", key: "status" },
            { title: "Date", key: "created_at" },
            { title: "Action", key: "actions" },
        ];

        function handleClick(list, item) {
          if (list.listtitle === 'View') {
            this.linkId(item)
          } else if (list.listtitle === 'Edit') {
            this.editItem(item);
          }else if (list.listtitle === 'Delete'){
            this.deleteItem(item);
          }
        };

      function linkId(item){
        const id = item.id
        console.log("The id is ",id);
        router.push(`/motor/thirdparty/policies/${id}`);
        // router.push({ name: 'customer', params: { id: id } })
      }
   
  
      return {
        headers,
        all_policies,
        tableActionData,
        store,
        router,
        selectedDate,
        menu,
        date,
        status,
        formattedDate,
        handleClick,
        linkId
      };
    },
  });
  </script>
  