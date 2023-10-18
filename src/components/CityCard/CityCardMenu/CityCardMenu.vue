<script lang="ts" setup>

import { useRoute,useRouter } from 'vue-router';
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";
import {
  IconStar,
  BaseButton,
} from "@/shared/ui";
const weatherCitiesStore = useWeatherStoreForCities();

const route = useRoute();
const router = useRouter();
defineProps<{
  menuItems: { id: number; label: string }[];
  activeItem: number;
}>();

const emits = defineEmits<{
  (e: "on-item-change", id: number): void;
}>();


const addToFavorites = () => {
  const id = Number(route.params.id);
  const city = weatherCitiesStore.cities.find(city => city.id === id);
  if (city && !weatherCitiesStore.favoriteCities.some(favCity => favCity.id === id)) {
    weatherCitiesStore.favoriteCities.push(city);
    localStorage.setItem('favoriteCities', JSON.stringify(weatherCitiesStore.favoriteCities));
  }
};


const deleteCurrentCity = () => {
  const id = Number(route.params.id);
  const index = weatherCitiesStore.cities.findIndex(city => city.id === id);
  
  if (index !== -1) {
    weatherCitiesStore.cities.splice(index, 1);

    if (index > 0) {
      const prevCityId = weatherCitiesStore.cities[index - 1].id;
      router.push(`/city/${prevCityId}`);
    }
    else if (weatherCitiesStore.cities.length > 0) {
      const nextCityId = weatherCitiesStore.cities[0].id;
      router.push(`/city/${nextCityId}`);
    }
    else {
      router.push('/');
    }
  }
};
</script>

<template>
  <ul class="menu">
      <li
      class="item"
      :class="item.id === activeItem ? 'item--active' : ''"
      v-for="item in menuItems"
      :key="item.id"
      @click="emits('on-item-change', item.id)"
    >
    {{ $t(`${item.label}`) }}
    </li>
    <BaseButton :method="addToFavorites" :icon="IconStar" variant="primary" text="В обране" />
    <BaseButton
      :method="deleteCurrentCity"
      variant="primary"
      text="Видалити місто"
    />
  </ul>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.item {
  display: flex;
  align-self:self-start;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
  transition: all 200ms linear;
  cursor: pointer;
}
.item:hover {
  background-color: rgb(126, 121, 121, 0.5);
}

.item--active {
  background-color: grey;
  color: aliceblue;
}
</style>
