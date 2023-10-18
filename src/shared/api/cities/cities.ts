import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import { API_MAP_KEY } from "@/shared/config";

const BASE_URL = "/mapbox.places";

export type GetForecastParams = {
  access_token: string;
  types?: string;
};

export const getCitiesList = (
  searchQuery: string,
  params?: GetForecastParams,
): AxiosPromise<any[]> => {
  if (!params) {
    params = { access_token: API_MAP_KEY };
  }

  return apiInstance.get(BASE_URL + `/${searchQuery}.json`, { params });
};
