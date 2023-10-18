<script lang="ts" setup>
import CityCard from "@/components/CityCard/CityCard.vue";
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";

const weatherCitiesStore = useWeatherStoreForCities();
</script>

<template>
  <div
    class="city-list"
    v-for="city in weatherCitiesStore.cities"
    :key="city.id"
  >
    <CityCard :city="city" />
  </div>
</template>

<style scoped>
.city-list {
  width: 100%;
}
</style>
