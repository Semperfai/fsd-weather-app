<script setup lang="ts">
import Highlights from "@/components/Highlights/Highlights.vue";
import CityCardMenu from "./CityCardMenu/CityCardMenu.vue";
import ChartTemp from "@/components//ChartTemp/ChartTemp.vue";
import { type WeatherMode } from "@/shared/types";
import { useRoute } from "vue-router";
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";

const weatherCitiesStore = useWeatherStoreForCities();
const route = useRoute();
import { ref, computed } from "vue";
const emits = defineEmits<{
  (e: "update:mode", id: number): void;
}>();

const currentCity = computed(() => {
  const id = Number(route.params.id);
  const source = route.path.includes("/favorites")
    ? weatherCitiesStore.favoriteCities
    : weatherCitiesStore.cities;
  return source.find((city) => city.id === id) || null;
});

const weatherInfoMode = ref<WeatherMode>("default");

const computedCityHighlights = computed(() => {
  const data =
    weatherInfoMode.value === "forecast5"
      ? currentCity.value?.forecastWeatherData
      : [currentCity.value?.currentWeatherData];

  return data?.filter((item) => item != null) || [];
});

const computedChartHighlights = computed(() => {
  if (!currentCity.value || !currentCity.value.chartData) return null;
  return weatherInfoMode.value === "forecast5"
    ? currentCity.value?.chartData.chartForecast5Data
    : currentCity.value?.chartData.chartCurrentForecastData;
});

const isFavoriteCity = computed(() => {
  return weatherCitiesStore.favoriteCities.some((city) => {
    return city.id === Number(route.params.id);
  });
});
const menuItems = [
  { id: 0, label: "День" },
  { id: 1, label: "Тиждень" },
];

const activeItem = ref<number>(menuItems[0].id);

const changeMode = (id: number) => {
  activeItem.value = id;
  weatherInfoMode.value = id === 0 ? "default" : "forecast5";
};
</script>
<template>
  <div
    class="card"
    :class="{ 'favorite-city': isFavoriteCity }"
    v-if="currentCity && computedCityHighlights"
  >
    <CityCardMenu
      :active-item="activeItem"
      @on-item-change="changeMode"
      :menu-items="menuItems"
    />
    <Highlights
      v-for="item in computedCityHighlights"
      :key="item ? item.id : undefined"
      :weather-data="item"
    />
    <ChartTemp
      v-if="computedChartHighlights"
      :chart-mode="weatherInfoMode"
      :chart-data="computedChartHighlights"
    />
  </div>
  <div v-else-if="currentCity && !computedCityHighlights">
    Loading weather data...
  </div>
  <div v-else>Please, add city to list to see weather info for it 🌤</div>
</template>

<style scoped>
.card {
  display: flex;
  padding: 1em;
  width: 100%;
  height: 100%;
  gap: 1rem;
  flex-direction: column;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px rgba(255, 254, 254, 0.5);
}

.favorite-city {
  border: 1px solid gold;
}
</style>
