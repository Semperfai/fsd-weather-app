<script setup lang="ts">
import Chart from "chart.js/auto";
import { ref, shallowRef, watch, nextTick, toRefs } from "vue";

const props = defineProps<{
 chartData: any
 chartMode: any
}>();
 
const { chartData , chartMode} = toRefs(props);

const chartEl = ref<HTMLElement | null>(null);
const dataChart = shallowRef(null);

watch(
  () => chartData.value,
  (newCharData) => {
    const tmpData = [...newCharData];
    if (dataChart.value) {
      if (chartMode.value === "forecast5") {
        dataChart.value.data.labels = tmpData.map((item) =>
          new Date(item.date * 1000).toLocaleDateString()
        );
        dataChart.value.data.datasets[0].data = tmpData.map(
          (item) => item.avgTemp
        );
      } else {
        dataChart.value.data.labels = tmpData.map((item) => item.time);
        dataChart.value.data.datasets[0].data = tmpData.map(
          (item) => item.temp
        );
      }

      dataChart.value.update();
      return;
    }
    nextTick(() => {
      dataChart.value = new Chart(chartEl.value.getContext("2d"), {
        type: "line",
        data: {
          labels:
          chartMode.value === "forecast5"
              ? tmpData.map((item) => new Date(item.date).toLocaleDateString())
              : tmpData.map((item) => item.time),
          datasets: [
            {
              label: "Temperature",
              data:
              chartMode.value === "forecast5"
                  ? tmpData.map((item) => item.avgTemp)
                  : tmpData.map((item) => item.temp),
              backgroundColor: "rgba(255, 105, 180, 0.2)",
              borderColor: "rgba(255, 105, 180, 1)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <div class="canvas-box">
    <canvas ref="chartEl"></canvas>
  </div>
</template>

<style scoped></style>
