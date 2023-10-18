import axios from "axios";
import { API_MAP_URL } from "@/shared/config";

export const apiInstance = axios.create({
  baseURL: API_MAP_URL,
});
