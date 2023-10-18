<script setup lang="ts">
import { IconSearch, BaseInput } from "@/shared/ui";
import { ref } from "vue";
import { citiesApi } from "@/shared/api/cities";
import { vOnClickOutside } from "@vueuse/components";

const emits = defineEmits<{
  (e: "update:searchData", data: any): void;
}>();

const showList = ref<boolean>(false);
const mapBoxSearchResult = ref(null);
const queryTimeout = ref<number | null>(null);
const searchQuery = ref<string>("");
const searchError = ref<boolean>(false);

const hideList = () => {
  showList.value = false;
};
const getSearchResults = () => {
  if (queryTimeout.value) {
    clearTimeout(queryTimeout.value);
  }
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await citiesApi.getCitiesList(searchQuery.value);

        mapBoxSearchResult.value = result.data.features;
        return;
      } catch (error: unknown) {
        searchError.value = true;
      }
    }
    mapBoxSearchResult.value = null;
  }, 200);
};

const selectCity = (data: any) => {
  searchQuery.value = data.place_name;
  const [city] = data?.place_name.split(",");
  if (!city) return;
  mapBoxSearchResult.value = null;
  emits("update:searchData", city);
};

const updateCity = (city: string) => {
  emits("update:searchData", city);
};
</script>
<template>
  <div class="wrapper">
    <BaseInput
      @click="showList = true"
      :method="getSearchResults"
      :icon="IconSearch"
      placeholder="Search"
      input-type="text"
      :max="100"
      v-model:input="searchQuery"
      @keydown.enter="updateCity(searchQuery)"
    />
    <ul
      v-if="mapBoxSearchResult && showList"
      v-on-click-outside="hideList"
      class="items"
    >
      <p v-if="searchError">
        {{ "Sorry, something went wrong. Please try again ." }}
      </p>
      <p v-if="!searchError && mapBoxSearchResult.length === 0">
        {{ "No results found." }}
      </p>
      <template v-else>
        <li
          @click="selectCity(searchResults)"
          class="item"
          v-for="searchResults in mapBoxSearchResult"
          :key="searchResults.id"
        >
          {{ searchResults.place_name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  width: 70%;
  position: relative;
  padding-top: 4px;
  margin-bottom: 8px;
}

.items {
  position: absolute;
  z-index: 10;
  background-color: black;
  color: white;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 4px 1px;
}

.item {
  font-size: 1rem;
  padding: 0.3em 0.4em;
  background-color: black;
  cursor: pointer;
}

.item:hover {
  background-color: rgb(45, 42, 42);
}
</style>
