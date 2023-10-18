<script setup lang="ts">
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";
import { onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SubFavoriteNavigation from "@/components/SubFavoriteNavigation/SubFavoriteNavigation.vue";
import { BaseButton, BaseSection, BaseSpinner } from "@/shared/ui";
const weatherCitiesStore = useWeatherStoreForCities();
const router = useRouter();
const route = useRoute();

const redirectToFirstFavoriteCity = () => {
  if (!route.params.id && weatherCitiesStore.favoriteCities.length > 0) {
    router.push(`/favorites/city/${weatherCitiesStore.favoriteCities[0].id}`);
  }
};

const deleteFavoriteCity = () => {
  const id = Number(route.params.id);
  const index = weatherCitiesStore.favoriteCities.findIndex(
    (city) => city.id === id,
  );

  if (index !== -1) {
    weatherCitiesStore.favoriteCities.splice(index, 1);
    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(weatherCitiesStore.favoriteCities),
    );

    if (index > 0) {
      const prevCityId = weatherCitiesStore.favoriteCities[index - 1].id;
      router.push(`/favorites/city/${prevCityId}`);
    } else if (weatherCitiesStore.favoriteCities.length > 0) {
      const nextCityId = weatherCitiesStore.favoriteCities[0].id;
      router.push(`/favorites/city/${nextCityId}`);
    } else {
      router.push("/favorites");
    }
  }
};

onBeforeMount(() => {
  redirectToFirstFavoriteCity();
});

watch(
  () => route.path,
  () => {
    redirectToFirstFavoriteCity();
  },
);

watch(
  () => weatherCitiesStore.favoriteCities,
  () => {
    redirectToFirstFavoriteCity();
  },
  { deep: true },
);
</script>

<template>
  <div class="favorites">
    <BaseSection align="column" v-if="!weatherCitiesStore.isListLoading">
      <SubFavoriteNavigation />
      <BaseButton
        v-if="weatherCitiesStore.favoriteCities.length"
        :method="deleteFavoriteCity"
        variant="primary"
        text="Видалити місто з обраних"
      />
      <router-view></router-view>
    </BaseSection>
    <BaseSpinner v-else />
  </div>
</template>

<style scoped>
.favorites {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
