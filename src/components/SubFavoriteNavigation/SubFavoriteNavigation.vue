<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";

const route = useRoute();
const weatherCitiesStore = useWeatherStoreForCities();

const isFavoritesRoute = computed(() => route.path.startsWith("/favorites"));

const displayedCities = computed(() => {
  return isFavoritesRoute.value
    ? weatherCitiesStore.favoriteCities
    : weatherCitiesStore.cities;
});

const isActiveCity = (cityId: number) => {
  return Number(route.params.id) === cityId;
};
</script>

<template>
  <ul class="city-list">
    <li
      v-for="(city, index) in displayedCities"
      :key="city.id"
      :class="{ 'active-city': isActiveCity(city.id) }"
    >
      <router-link
        class="city-link"
        :to="`${isFavoritesRoute ? '/favorites/' : '/'}city/${city.id}`"
      >
        {{ index + 1 }}
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
.city-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.5rem;
}

.city-list li {
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
}

.city-link {
  display: block;
  padding: 0.5em 1em;
}

.active-city {
  color: black;
  background-color: #f3f3f3;
  border-color: #007bff;
}
</style>
