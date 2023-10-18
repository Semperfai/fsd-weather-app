<script setup lang="ts">
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";
import { DefaultLayout } from "./layouts";
import { Routing } from "@/pages/routing";
import AppNavigation from "./ui/AppNavigation/AppNavigation.vue";
import { onBeforeMount } from "vue";

const weatherCitiesStore = useWeatherStoreForCities();

onBeforeMount(async () => {
  await weatherCitiesStore.getCurrentCityInfo();
  const storedFavorites = localStorage.getItem('favoriteCities');
  if (storedFavorites) {
    weatherCitiesStore.favoriteCities = JSON.parse(storedFavorites);
  }
});
</script>

<template>
  <DefaultLayout>
    <template #navigation>
      <AppNavigation />
    </template>
    <template #page>
      <Routing />
    </template>
  </DefaultLayout>
</template>
