import type { AxiosPromise } from "axios";
import axios from "axios";
import { apiInstance } from "./base";
import { API_KEY } from "@/shared/config";

const BASE_URL = "/forecast";

export type GetForecastParams = {
  q?: string;
  units?: string;
  lat?: number;
  lon?: number;
  appid?: string;
};

export const getForecastByCity = (
  params?: GetForecastParams,
): AxiosPromise<any[]> => {
  if (!params) {
    params = { appid: API_KEY };
  } else if (!params.appid) {
    params.appid = API_KEY;
  }

  return apiInstance.get(BASE_URL, { params });
};

export const getUserForecast = async () => {
  try {
    const response = await axios.get("https://ipinfo.io?token=d919b62edd0c89");

    const locationData = response.data;

    const { city, country } = locationData;

    const weatherData = await getForecastByCity({
      q: `${city},${country}`,
      units: "metric",
    });

    return weatherData;
  } catch (error) {
    console.error(error);
  }
};
