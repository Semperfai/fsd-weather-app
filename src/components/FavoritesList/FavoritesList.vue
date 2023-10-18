<script lang="ts" setup>
import CityCard from "@/components/CityCard/CityCard.vue";
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";

const weatherCitiesStore = useWeatherStoreForCities();
</script>

<template>
  <div
    class="favorites-list"
    v-for="city in weatherCitiesStore.favoriteCities"
    :key="city.id"
  >
    <CityCard :city="city" />
  </div>
</template>

<style scoped>
.favorites-list {
  width: 100%;
}
</style>
