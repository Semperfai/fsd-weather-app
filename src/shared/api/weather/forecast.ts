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
    const response = await axios.get("https://httpbin.org/ip");
    const userIP = response.data.origin.split(",")[0].trim();
    const locationResponse = await axios.get(
      `http://ip-api.com/json/${userIP}`,
    );
    const locationData = locationResponse.data;
    const city = locationData.city;
    const country = locationData.country;

    const weatherData = await getForecastByCity({
      q: `${city},${country}`,
      units: "metric",
    });
    return weatherData;
  } catch (error) {
    console.error(error);
  }
};
