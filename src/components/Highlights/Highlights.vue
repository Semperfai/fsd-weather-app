<script lang="ts" setup>
import WeatherSummary from "@/components/WeatherSummary/WeatherSummary.vue";
import { computed } from "vue";
import { getPressureMm, getTime } from "@/shared/lib/helpers";
import { type IProps } from "./types";

const props = defineProps<IProps>();

const timezone = computed(() => props.weatherData?.timezone);

const sunriseTime = computed(() => {
  return getTime(props.weatherData?.sunrise + timezone.value);
});

const sunsetTime = computed(() => {
  return getTime(props.weatherData?.sunset + timezone.value);
});
</script>

<template>
  <div class="highlights">
    <WeatherSummary :weatherData="weatherData" />
    <div class="highlights-wrapper">
      <div class="highlight">
        <div class="card">
          <p class="card-title">Wind</p>
          <div class="card-pic card-pic--wind"></div>
          <div class="card-info">
            <div class="card-justify">
              <div class="info-main">
                <div class="info-main-num">{{ weatherData?.wind?.speed }}</div>
                <div class="info-main-text">m/s</div>
              </div>
              <div class="info-main">
                <div class="info-main-num">{{ weatherData?.wind?.deg }}</div>
                <div class="info-main-text">deg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="highlight">
        <div class="card">
          <div class="card-title">Pressure</div>
          <div class="card-pic card-pic--pressure"></div>
          <div class="card-info">
            <div class="card-centered">
              <div class="info-main">
                <div class="info-main-num">
                  {{ getPressureMm(weatherData?.pressure) }}
                </div>
                <div class="info-main-text">mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="highlight">
        <div class="card">
          <div class="card-title">Sunrise and sunset</div>
          <div class="card-pic card-pic--sun"></div>
          <div class="card-info">
            <div class="states">
              <div class="state">
                <div class="state-pic"></div>
                <div class="state-title">Sunrise</div>
                <div class="state-time">{{ sunriseTime }}</div>
              </div>
              <div>temp {{ weatherData.temp }}</div>
              <div class="state">
                <div class="state-pic state-pic--flipped"></div>
                <div class="state-title">Sunset</div>
                <div class="state-time">{{ sunsetTime }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlights {
  width: 100%;
  padding: 28px 16px 16px;
  background: url("/src/assets/img/gradient-4.jpg") no-repeat 0% 0%;
  background-size: cover;
  border-radius: 25px;
}

.highlights-wrapper {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

@media (max-width: 745px) {
  .highlights-wrapper {
    flex-direction: column;
  }
}

.title {
  padding-bottom: 16px;
}

.highlight {
  flex: 1 1 auto;
}

@media (max-width: 575px) {
  .highlight {
    width: 100%;
    margin-bottom: 16px;
  }
}

.card {
  min-height: 230px;
  padding: 16px;
  background: url("/src/assets/img/gradient-2.jpg") no-repeat 50% 50%;
  background-size: cover;
  border-radius: 8px;
}

@media (max-width: 1199px) {
  .card {
    padding: 12px;
  }
}

.card-centered {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.card-justify {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.card-title {
  padding-bottom: 12px;
  font-size: 13px;
}

@media (max-width: 1199px) {
  .card-title {
    font-size: 12px;
  }
}

.card-pic {
  width: 100%;
  height: 90px;
  margin-bottom: 16px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}

.card-pic--wind {
  background-image: url("/src/assets/img/equalizer (2).png");
}

.card-pic--pressure {
  background-image: url("/src/assets/img/barometer.png");
}

.card-pic--sun {
  background-image: url("/src/assets/img/sun-moving.png");
}

.states {
  display: flex;
  justify-content: space-between;
}

.state {
  width: 40%;
}

.state:last-child {
  text-align: right;
}

.state-pic {
  width: 20px;
  height: 20px;
  margin-bottom: 6px;
  background: url("/src/assets/img/sun.svg") no-repeat 50% 50%;
  background-size: cover;
}
</style>
