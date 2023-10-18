import type { AxiosPromise } from "axios";
import axios from "axios";
import { apiInstance } from "./base";
import { API_KEY } from "@/shared/config";

const BASE_URL = "/weather";

export type GetWeatherParams = {
  units?: string;
  q?: string;
  lat?: number;
  lon?: number;
  appid?: string;
};

export interface IWeatherDataDto {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const getWeatherByCity = (
  params?: GetWeatherParams,
): AxiosPromise<{
  id: number;
  name: string;
  data: IWeatherDataDto;
}> => {
  if (!params) {
    params = { appid: API_KEY };
  } else if (!params.appid) {
    params.appid = API_KEY;
  }

  return apiInstance.get(BASE_URL, { params });
};

export const getUserWeather = async () => {
  try {
    
    const response = await axios.get("https://ipinfo.io?token=d919b62edd0c89");

    const locationData = response.data;

    const { city, country } = locationData;

    const weatherData = await getWeatherByCity({
      q: `${city},${country}`,
      units: "metric",
    });

    return weatherData;

  } catch (error) {
    console.error(error);
  }
};
