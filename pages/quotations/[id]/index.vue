<template>
  <div>
    <v-row class="justify-space-between align-center">
      <v-col cols="2">
        <h1 class="primary-text">View Quotations</h1>
      </v-col>
      <v-col cols="2">
        <!-- <nuxt-link
          v-if="details.status == 'pending'"
          :to="`/quotations/${details.id}/payment`"
        >
          <BaseButton mode="colored">Make Payment</BaseButton>
        </nuxt-link> -->
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <BaseButton
              v-if="details.status == 'pending'"
              v-bind="activatorProps"
              mode="colored"
              >Make Payment</BaseButton
            >
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Make Payment">
              <v-card-text>
                Are you sure you want to make payment for this quotation ?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                <v-btn
                  color="surface-variant"
                  text="Pay"
                  id="pay_btn"
                  variant="flat"
                  @click="
                    makePayment()
                    // isActive.value = false;
                  "
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <UiChildCard>
        <v-row>
          <v-col cols="12" md="12">
            <v-card-item class="pb-8">
              <v-card-title class="card-title"
                >{{ getName }} Quotation</v-card-title
              >
            </v-card-item>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Phone Number:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.phone_number }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Email</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.email }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Contact Address</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.contact_address }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Exchange Rate :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.exchange_rate }}/₦</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Description Consignment ::</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details.cargo_description }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Nature of Cargo</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.nature_of_cargo }}</h3>
                </v-card-text>
              </v-col>
            </v-row> -->
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Policy Typr :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.policy_type }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Cover Type :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.cover_type }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Bank Name :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.bank_name }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Sum Insured :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.sum_insured }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Rate:</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.basic_rate }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Invoice Value :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.invoice_value }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Premium</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.premium }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Tin :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">{{ details.tin }}</h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Proforma Invoice Number :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">
                    {{ details.proforma_invoice_number }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Nature of Cargo :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light" v-if="details.broker_rate">
                    {{ details.broker_rate.condition }}
                  </h3>
                  <h3 class="card-text-light" v-if="details.rate">
                    {{ details.rate.condition }}
                  </h3>
                </v-card-text>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="4">
                <v-card-text>
                  <h2 class="card-text-bold">Performance Invoice Number :</h2>
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <h3 class="card-text-light">General Menchanzed</h3>
                </v-card-text>
              </v-col>
            </v-row> -->
            <v-row class="pb-12">
              <v-col cols="12" md="6">
                <v-card-text>
                  <h2 class="card-text-bold">Payment Status</h2>
                </v-card-text>
                <v-card-text>
                  <BaseBadge
                    v-if="details.status == 'pending'"
                    title="Pending"
                    type="pending"
                  />
                  <BaseBadge
                    v-if="details.status == 'paid'"
                    title="Paid"
                    type="paid"
                  />
                  <BaseBadge
                    v-if="details.status == 'expired'"
                    title="Expired"
                    type="expired"
                  />
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </UiChildCard>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";

import { useQuotationStore } from "~/store/quotation";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import BaseBadge from "@/components/ui-components/badge/BaseBadge";
import { ref, computed, onMounted } from "vue";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
    BaseBadge,
  },
  setup() {
    const { notify } = useNotification();
    const route = useRoute();
    const quotationStore = useQuotationStore();
    const details = ref([]);

    const isActive = ref(null);
    // const viewQuotation = async () => {
    //   try {
    //     const id = route.params.id;
    //     const getQuotation = await quotationStore.viewQuotation(id);
    //     if (getQuotation.status == "success") {
    //       details.value = getQuotation.data;
    //     }
    //   } catch (error) {}
    // };

    // get policy holder name
    const getName = computed(() => {
      if (details.value?.company_name !== null) {
        return `${details.value.company_name}'s`;
      } else if (details.value?.company_name == null) {
        return `${details.value.first_name} ${details.value.last_name}'s`;
      }
    });

    //     const displayName = computed(() => {
    //   if (details.value?.company_name && !details.value?.first_name && !details.value?.last_name) {
    //     return details.value.company_name;
    //   } else if (!details.value?.company_name && details.value?.first_name && details.value?.last_name) {
    //     return `${details.value.first_name} ${details.value.last_name}`;
    //   } else {
    //     // handle cases where some or all values are missing
    //     return '';
    //   }
    // });

    const closeDialog = () => {
      isActive.value = false;
      console.log(isActive.value);
    };

    quotationStore
      .viewQuotation(route.params.id)
      .then((quotation) => {
        if (quotation.status === "success") {
          details.value = quotation.data;
          // console.log(details.value);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    const makePayment = async () => {
      const pay_btn = document.getElementById("pay_btn");
      const pay_btn_selector = document.querySelector("#pay_btn");
      pay_btn.disabled = true;
      pay_btn_selector.innerHTML = "Please Wait..";
      try {
        const pay = await quotationStore.makePayment(route.params.id);
        // console.log(pay);
        if (pay.status == "success") {
          notify({
            title: "Success",
            text: pay.message,
            type: "success",
          });
          pay_btn.disabled = false;
          pay_btn_selector.innerHTML = "Pay";
          // console.log(pay.message);
        } else {
          notify({
            title: "Error",
            text: pay.message,
            type: "error",
          });
          pay_btn.disabled = false;
          pay_btn_selector.innerHTML = "Pay";
        }
      } catch (error) {
        notify({
          title: "Error",
          text: "An Error Occoured",
          type: "error",
        });
        pay_btn.disabled = false;
        pay_btn_selector.innerHTML = "Pay";
        console.log(error);
      } finally {
        // Force a full page refresh
        isActive.value = false;
        window.location.reload();
      }
    };

    return {
      quotationStore,
      details,
      isActive,
      route,
      makePayment,
      closeDialog,
      getName,
    };
  },
});
</script>

<style scoped></style>
