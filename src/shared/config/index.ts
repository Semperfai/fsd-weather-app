const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key] || "";
};

export const API_URL = getEnvVar("VITE_API_URL");
export const API_MAP_URL = getEnvVar("VITE_API_MAP_URL");
export const API_KEY = getEnvVar("VITE_API_KEY");
export const API_MAP_KEY = getEnvVar("VITE_API_MAP_KEY");

export const isDevEnv = getEnvVar("DEV");
export const isProdEnv = getEnvVar("PROD");
