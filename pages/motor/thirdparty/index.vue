<template>
    <div>
      <section class="dashboard-cards">
        <v-col cols="12" sm="12">
          <div class="dashboard-card-wrapper">
            <div class="dashboard-card policy-created-today">
              <div class="dashboard-card__head">
                <div class="dashboard-card__icon">
                  <PolicyCreatedToday class="icon" />
                </div>
                <h2 class="dashboard-card__text">Wallet Balance</h2>
              </div>
              <div class="dashboard-card__middle">
                <hr class="dashboard-card__hr" />
              </div>
              <div class="dashboard-card__buttom">
                <h2 class="dashboard-card__figure">
                  {{ dashboard_data.wallet_balance }}
                </h2>
              </div>
            </div>
            <div class="dashboard-card rates">
              <div class="dashboard-card__head">
                <div class="dashboard-card__icon">
                  <AllRates />
                </div>
                <h2 class="dashboard-card__text">All Policies</h2>
              </div>
              <div class="dashboard-card__middle">
                <hr class="dashboard-card__hr" />
              </div>
              <div class="dashboard-card__buttom">
                <h2 class="dashboard-card__figure">
                  {{ dashboard_data.all_policies }}
                </h2>
              </div>
            </div>
            <div class="dashboard-card transaction-created-today">
              <div class="dashboard-card__head">
                <div class="dashboard-card__icon">
                  <TransactionCreatedToday />
                </div>
                <h2 class="dashboard-card__text">Pending Quotations</h2>
              </div>
              <div class="dashboard-card__middle">
                <hr class="dashboard-card__hr" />
              </div>
              <div class="dashboard-card__buttom">
                <h2 class="dashboard-card__figure">
                  {{ dashboard_data.pending_quotation }}
                </h2>
              </div>
            </div>
            <div class="dashboard-card pending-claims">
              <div class="dashboard-card__head">
                <div class="dashboard-card__icon">
                  <PendingClaims />
                </div>
                <h2 class="dashboard-card__text">Pending Claims</h2>
              </div>
              <div class="dashboard-card__middle">
                <hr class="dashboard-card__hr" />
              </div>
              <div class="dashboard-card__buttom">
                <h2 class="dashboard-card__figure">
                  {{ dashboard_data.pending_claims }}
                </h2>
              </div>
            </div>
            <div class="dashboard-card pending-kyc-approval">
              <div class="dashboard-card__head">
                <div class="dashboard-card__icon">
                  <PendingKycApproval />
                </div>
                <h2 class="dashboard-card__text">Expired Quotation</h2>
              </div>
              <div class="dashboard-card__middle">
                <hr class="dashboard-card__hr" />
              </div>
              <div class="dashboard-card__buttom">
                <h2 class="dashboard-card__figure">
                  {{ dashboard_data.expired_quotation }}
                </h2>
              </div>
            </div>
            <div class="dashboard-card pending-wallet-payment">
              <div class="dashboard-card__head">
                <div class="dashboard-card__icon">
                  <PendingWalletPayment />
                </div>
                <h2 class="dashboard-card__text">Awaiting NIID</h2>
              </div>
              <div class="dashboard-card__middle">
                <hr class="dashboard-card__hr" />
              </div>
              <div class="dashboard-card__buttom">
                <h2 class="dashboard-card__figure">
                  {{ dashboard_data.awaiting_niid }}
                </h2>
              </div>
            </div>
          </div>
        </v-col>
      </section>
      <v-row>
        <v-col cols="12" md="8">
          <UiChildCard>
            <ClientOnly>
              <TotalGrowth />
            </ClientOnly>
            <!-- <div>
              <Bar :data="chartData" :options="chartOptions" />
            </div> -->
          </UiChildCard>
        </v-col>
      </v-row>
    </div>
  </template>
  <script>
definePageMeta({
  layout: 'motor'
});
  import AllRates from "@/assets/icons/all-rates.svg";
  import PendingClaims from "@/assets/icons/pending-claims.svg";
  import PendingKycApproval from "@/assets/icons/pending-kyc-approval.svg";
  import PendingWalletPayment from "@/assets/icons/pending-wallet-payment.svg";
  import PolicyCreatedToday from "@/assets/icons/policy-created-today.svg";
  import TransactionCreatedToday from "@/assets/icons/transaction-created-today.svg";
  import { useDashboardStore } from "~/store/dashboard";
  import UiChildCard from "@/components/shared/UiChildCard.vue";
  import TotalGrowth from "@/components/dashboard/TotalGrowth";
  
  import { Bar } from "vue-chartjs";
  export default defineComponent({
    components: {
      AllRates,
      PendingClaims,
      PendingKycApproval,
      PendingWalletPayment,
      PolicyCreatedToday,
      TransactionCreatedToday,
      UiChildCard,
      TotalGrowth,
    },
    setup() {
      const dashboard_data = ref([]);
      const dashboardStore = useDashboardStore();
  
      const chartData = ref({
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 50, 10],
          },
        ],
      });
      const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: false,
      });
  
      // List all dashboar object
      const loadItems = dashboardStore
        .dashboard_object()
        .then((dashboard) => {
          if (dashboard.status === "success") {
            dashboard_data.value = dashboard.data;
            // console.log(dashboard_data.value);
          }
        })
        .catch((e) => {
          console.log(e);
        });
  
      return {
        dashboardStore,
        loadItems,
        dashboard_data,
        chartData,
        chartOptions,
      };
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .dashboard-card {
    padding: 20px 0 20px 0;
    background: #ffff;
    border-radius: 0.625rem;
  
    &__head {
      display: flex;
      justify-content: center;
      gap: 10px;
      align-items: center;
      flex-direction: column;
      margin-bottom: 20px;
    }
  
    &__text {
      font-size: 14px;
      font-weight: 600;
      line-height: 17.07px;
    }
  
    &__middle {
      margin-bottom: 20px;
    }
  
    &__hr {
      border: 1px solid #ddd;
      height: 2px;
      margin: 1rem 0;
      background-color: #eee;
    }
  
    &__buttom {
    }
  
    &__figure {
      font-size: 14px;
      font-weight: 600;
      line-height: 17.07px;
  
      display: flex;
      justify-content: center;
    }
  }
  
  hr {
  }
  .rates {
    border: 1px solid #e33e2b;
  }
  .policy-created-today {
    border: 1px solid #a5ce39;
  }
  .transaction-created-today {
    border: 1px solid #bcbcbc;
  }
  .pending-claims {
    border: 1px solid #676767;
  }
  .pending-kyc-approval {
    border: 1px solid #a5ce39;
  }
  .pending-wallet-payment {
    border: 1px solid #e33e2b;
  }
  .icon {
    // background: red;
    width: 100%;
    height: auto;
  }
  </style>
  