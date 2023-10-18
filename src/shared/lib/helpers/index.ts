import { PRESSURE_UNITS } from "../constants";
import { type IWeatherData } from "@/shared/types";

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPressureMm = (hpa: number) => {
  return Math.round(hpa * PRESSURE_UNITS);
};

export const getTime = (seconds: number) => {
  return new Date(seconds * 1000).toLocaleTimeString("ru-RU", {
    timeZone: "Atlantic/Reykjavik",
  });
};

export const mapWeatherData = (weatherInfo: any): IWeatherData => {
  return {
    dt: weatherInfo?.dt,
    temp: weatherInfo?.main?.temp,
    timezone: weatherInfo?.timezone,
    sunrise: weatherInfo?.sys?.sunrise,
    sunset: weatherInfo?.sys?.sunset,
    name: weatherInfo?.name,
    country: weatherInfo?.sys?.country,
    wind: {
      speed: weatherInfo?.wind?.speed,
      deg: weatherInfo?.wind?.deg,
    },
    pressure: weatherInfo?.main?.pressure,
  };
};

export const mapForecastData = (responseForecast: any): IWeatherData => {
  const groupedByDate = {};
  responseForecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });

  let tempCurrentForecast = Object.values(groupedByDate).slice(0, 2);
  tempCurrentForecast[1] = tempCurrentForecast[1]?.slice(0, 1);
  tempCurrentForecast = tempCurrentForecast.flat(Infinity).map((item) => {
    return {
      time: item.dt_txt.split(" ")[1],
      temp: item.main.temp,
    };
  });

  let tempCurrentForecast5 = Object.keys(groupedByDate).map((date) => {
    const forecasts = groupedByDate[date];
    const avgTemp =
      forecasts.reduce((acc, forecast) => acc + forecast.main.temp, 0) /
      forecasts.length;
    return {
      date,
      avgTemp,
    };
  });

  const averagesForecast5 = Object.keys(groupedByDate).map((date) => {
    const forecasts = groupedByDate[date];
    let totalTemp = 0;
    let totalPressure = 0;
    let totalWindSpeed = 0;
    let totalWindDeg = 0;
    let totalDt = 0;
    for (const forecast of forecasts) {
      totalTemp += forecast.main.temp;
      totalPressure += forecast.main.pressure;
      totalWindSpeed += forecast.wind.speed;
      totalWindDeg += forecast.wind.deg;
      totalDt += forecast.dt;
    }

    const avgtotalTemp = (totalTemp / forecasts.length).toFixed(2);
    const avgPressure = (totalPressure / forecasts.length).toFixed(2);
    const avgWindSpeed = (totalWindSpeed / forecasts.length).toFixed(2);
    const avgWindDeg = (totalWindDeg / forecasts.length).toFixed(2);
    return {
      dt: forecasts[0].dt,
      timezone: responseForecast?.city.timezone,
      sunrise: responseForecast?.city?.sunrise,
      sunset: responseForecast?.city?.sunset,
      name: responseForecast?.city.name,
      country: responseForecast?.city?.country,
      temp: avgtotalTemp,
      wind: {
        speed: avgWindSpeed,
        deg: avgWindDeg,
      },
      pressure: avgPressure,
    };
  });

  return averagesForecast5;
};

export const mapChartData = (responseForecast: any) => {
  const groupedByDate = {};
  responseForecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });

  let tempCurrentForecast = Object.values(groupedByDate).slice(0, 2);
  tempCurrentForecast[1] = tempCurrentForecast[1]?.slice(0, 1);
  tempCurrentForecast = tempCurrentForecast.flat(Infinity).map((item) => {
    return {
      time: item.dt_txt.split(" ")[1],
      temp: item.main.temp,
    };
  });

  let tempCurrentForecast5 = Object.keys(groupedByDate).map((date) => {
    const forecasts = groupedByDate[date];
    const avgTemp =
      forecasts.reduce((acc, forecast) => acc + forecast.main.temp, 0) /
      forecasts.length;
    return {
      date: forecasts[0].dt,
      avgTemp,
    };
  });

  return {
    chartCurrentForecastData: tempCurrentForecast,
    chartForecast5Data: tempCurrentForecast5,
  };
};
