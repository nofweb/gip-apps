<script>
import { ref, computed } from "vue";
import { useDashboardStore } from "~/store/dashboard";
export default defineComponent({
  setup() {
    const dashboardStore = useDashboardStore();
    const dashboard_data = ref([]);

    // chart 1
    let chartOptions1 = ref({
      chart: {
        type: "bar",
        height: 480,
        fontFamily: `inherit`,
        foreColor: "#a1aab2",
        stacked: true,
      },
      colors: ["#bcbcbc", "#1e88e5", "#5e35b1", "#ede7f6"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "10%",
        },
      },
      xaxis: {
        type: "category",
        categories: [],
      },
      legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: "bottom",
        offsetX: 20,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: "solid",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
      },
      tooltip: {
        theme: "dark",
      },
    });

    // chart 1

    const series = ref([]);

    const fetchData = async () => {
      try {
        const response = await dashboardStore.dashboard_object();
        let data = response.data.policies;
        data = data.reverse()
        data.map(p => {
           chartOptions1.value.xaxis.categories.push(p.month_name)
        })
        const monthly_policies = data.map(d => {
          return d.total_policies
        })

        series.value = [
          {
            name: "Total policies",
            data: monthly_policies, // Assuming 'value' property in your data
          },
        ];

      } catch (error) {
        // console.log(error);
      }
    };

    onMounted(fetchData);

    return {
      dashboardStore,
      chartOptions1,
      series,
      //   loadItems,
      dashboard_data,
      fetchData,
    };
  },
});
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9">
            <span class="text-subtitle-2 text-disabled font-weight-bold"
              >Monthly Progress</span
            >
            <!-- <h3 class="text-h3 mt-1">$2,324.00</h3> -->
          </v-col>
          <!-- <v-col cols="12" sm="3">
            <v-select
              color="primary"
              variant="outlined"
              hide-details
              v-model="select"
              :items="items"
              item-title="state"
              item-value="abbr"
              label="Select"
              persistent-hint
              return-object
              single-line
            >
            </v-select>
          </v-col> -->
        </v-row>
        <div class="mt-4">
          <apexchart
            type="bar"
            height="480"
            :options="chartOptions1"
            :series="series"
          >
          </apexchart>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
