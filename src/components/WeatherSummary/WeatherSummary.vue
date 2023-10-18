<script lang="ts" setup>
import { type IProps } from "./types";
const props = defineProps<IProps>();

const userLang = navigator.language || navigator.userLanguage;

const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const day = new Date(props.weatherData.dt * 1000).toLocaleString(
  userLang,
  options,
);
</script>

<template>
  <div class="summary">
    <div class="city text-block">
      <div>
        {{ weatherData?.name }}
        {{ weatherData?.country }}
      </div>
      <div class="date text-block">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.city {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
}

.text-block {
  position: relative;
  padding-left: 24px;
  padding-bottom: 8px;
  font-size: 1em;
}

.text-block::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  margin-right: 6px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}

.city::before {
  background-image: url("/src/assets/img/location.svg");
}

.date::before {
  left: 2px;
  width: 15px;
  height: 15px;
  background-image: url("/src/assets/img/calendar.svg");
}

@media (max-width: 767px) {
  .city {
    flex-direction: column;
    gap: 1rem;
  }
  .block-bottom-inner {
    font-size: 1rem;
  }

  .text-block {
    font-size: 0.5rem;
  }
}
</style>
