<script lang="ts" setup>
import { useWeatherStoreForCities } from "@/stores/weather-cities/weather-cities.store";
import { onBeforeMount, ref, watch } from "vue";
import {
  IconPlus,
  BaseButton,
  BaseSection,
  BaseSpinner,
  BasePopup,
} from "@/shared/ui";
import SearchCities from "@/components/SearchCities/SearchCities.vue";
import SubMainNavigation from "@/components/SubMainNavigation/SubMainNavigation.vue";
import {
  mapWeatherData,
  mapForecastData,
  mapChartData,
} from "@/shared/lib/helpers";
import { useRoute, useRouter } from "vue-router";

const popupMessage = ref<string>("");
const weatherCitiesStore = useWeatherStoreForCities();

const closeModal = () => {
  popupMessage.value = "";
};

const router = useRouter();
const route = useRoute();

const redirectToFirstCity = () => {
  if (!route.params.id && weatherCitiesStore.cities.length > 0) {
    router.push(`/city/${weatherCitiesStore.cities[0].id}`);
  }
};

onBeforeMount(() => {
  redirectToFirstCity();
});

watch(
  () => route.path,
  () => {
    redirectToFirstCity();
  }
);

watch(
  () => weatherCitiesStore.cities,
  () => {
    redirectToFirstCity();
  },
  { deep: true }
);

const updatedSearchData = async (city: string) => {
  try {
    if (!city) return;

    const responseWeather = await weatherCitiesStore.getWeatherByCityAsync({
      q: city,
      units: "metric",
    });

    const responseForecast = await weatherCitiesStore.getForecastByCityAsync({
      q: city,
      units: "metric",
    });
    if (!responseWeather || !responseForecast) {
      popupMessage.value =
        "Помилка при отриманні даних погоди, спробуйте інший запит";
    }

    const existingCityIndex = weatherCitiesStore.cities.findIndex(
      (city) => city.id === responseWeather?.id
    );
    if (existingCityIndex !== -1) {
      popupMessage.value = "Місто вже додано";
      return;
    }
    const currentCityId = Number(router.currentRoute.value.params.id);

    weatherCitiesStore.cities.forEach((city, index) => {
      if (
        city.id === responseWeather?.id ||
        city.id === temporaryId ||
        city.id === currentCityId
      ) {
        weatherCitiesStore.cities[index] = {
          id: responseWeather?.id,
          name: responseWeather?.name,
          currentWeatherData: mapWeatherData(responseWeather),
          forecastWeatherData: mapForecastData(responseForecast),
          chartData: mapChartData(responseForecast),
        };
        router.push(`/city/${responseWeather?.id}`);
      }
    });
  } catch (error: unknown) {
    popupMessage.value =
      "Помилка при отриманні даних погоди, спробуйте інший запит";
  }
};

let temporaryId = -1;

const generateTemporaryId = () => {
  temporaryId--;
  return temporaryId;
};

const addCityCard = () => {
  if (weatherCitiesStore.cities.length >= 5) {
    popupMessage.value =
      "Досягнуто максимальну кількість міст (5). Видаліть одне місто перед додаванням нового.";
    return;
  }
  const newCity = {
    chartData: null,
    currentWeatherData: null,
    forecastWeatherData: null,
    id: generateTemporaryId(),
    name: "",
  };
  weatherCitiesStore.cities.push(newCity);
  router.push(`/city/${newCity.id}`);
};
</script>

<template>
  <div class="sections">
    <BaseSection>
      <SearchCities @update:search-data="updatedSearchData" />
    </BaseSection>
    <h2 class="title">{{ $t(`Міста`) }}</h2>
    <BaseButton
      :method="addCityCard"
      :icon="IconPlus"
      variant="primary"
      text="Додати місто"
    />
    <BaseSection align="column" v-if="!weatherCitiesStore.isListLoading">
      <SubMainNavigation />
      <router-view></router-view>
    </BaseSection>
    <BaseSpinner v-else />
    <BasePopup
      @close-popup="closeModal"
      :message="popupMessage"
      v-if="popupMessage"
    />
  </div>
</template>

<style scoped>
.sections {
  display: flex;
  gap: 2em;
  flex-direction: column;
}

.city-inner {
  position: relative;
  display: inline-block;
  width: 100%;
}

.item {
  padding: 4px 6px;
  font-size: 1.2rem;
  border-radius: 2px;
  background-color: gray;
}

.item:hover {
  background-color: rgb(74, 72, 72);
}

@media (max-width: 475px) {
  .info {
    flex-direction: column;
  }

  .section {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
