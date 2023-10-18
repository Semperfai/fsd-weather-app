export type WeatherMode = "default" | "forecast5";
export interface IWeatherData {
  dt: number;
  temp?: number;
  name: string;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
  wind: {
    speed: number;
    deg: number;
  };
  pressure: number;
}
