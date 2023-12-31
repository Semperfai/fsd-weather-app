import { defineStore } from "pinia";
import { type IWeatherCitiesState } from "./types";
import { weatherApi, forecastApi } from "@/shared/api/weather";
import {
  mapWeatherData,
  mapForecastData,
  mapChartData,
} from "@/shared/lib/helpers";

export const useWeatherStoreForCities = defineStore("weatherStoreForCities", {
  state: (): IWeatherCitiesState => {
    return {
      isListLoading: false,
      cities: [],
      favoriteCities: [],
    };
  },
  actions: {
    async getWeatherByCityAsync(params: weatherApi.GetWeatherParams) {
      this.isListLoading = true;
      try {
        const { data } = await weatherApi.getWeatherByCity(params);
        if (data) {
          return data;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isListLoading = false;
      }
    },
    async getForecastByCityAsync(params: forecastApi.GetForecastParams) {
      this.isListLoading = true;
      try {
        const { data } = await forecastApi.getForecastByCity(params);
        if (data) {
          return data;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isListLoading = false;
      }
    },
    async getWeatherByUserAsync() {
      this.isListLoading = true;
      try {
        const response = await weatherApi.getUserWeather();
        if (response?.data) {
          const data = response.data;
          return data;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isListLoading = false;
      }
    },
    async getForecastByUserAsync() {
      this.isListLoading = true;
      try {
        const response = await forecastApi.getUserForecast();
        if (response?.data) {
          const data = response.data;
          return data;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isListLoading = false;
      }
    },
    async getCurrentCityInfo() {
      this.isListLoading = true;
      try {
        const responseWeather = await this.getWeatherByUserAsync();
        const responseForecast = await this.getForecastByUserAsync();
        if (responseWeather && responseForecast) {
          this.cities.splice(0, 1, {
            id: responseWeather.id,
            name: responseWeather.name,
            currentWeatherData: mapWeatherData(responseWeather),
            forecastWeatherData: mapForecastData(responseForecast),
            chartData: mapChartData(responseForecast),
          });
          this.currentCityId = responseWeather.id;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isListLoading = false;
      }
    },
  },
});
