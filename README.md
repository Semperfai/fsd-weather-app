# weather-test-app

This template should help get you started developing with Vue 3 in Vite.

# API Keys

This project requires API keys to access two third-party services: OpenWeatherMap and Mapbox. These keys are essential for specific functionalities within the application. Below are instructions on how to obtain and use these keys.

## OpenWeatherMap API Key (VITE_API_KEY)

The OpenWeatherMap API key is used for retrieving weather information. To use this key, follow these steps:

1. Sign up on the [OpenWeatherMap website](https://openweathermap.org/).

2. Obtain your API key.

3. Set it in the `VITE_API_KEY` variable in your project's `.env` file.

   Example .env file:

   ```plaintext
   VITE_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
   VITE_API_URL=https://api.openweathermap.org/data/2.5
   ```

## Mapbox API Key (VITE_API_MAP_KEY)

The Mapbox API key is used for geocoding and map display. To use this key, follow these steps:

1. Sign up on the [Mapbox website](https://www.mapbox.com/).

2. Obtain your API key.

3. Set it in the `VITE_API_MAP_KEY` variable in your project's `.env` file.

   Example `.env` file:

   ```plaintext
   VITE_API_MAP_KEY=YOUR_MAPBOX_API_KEY
   VITE_API_MAP_URL=https://api.mapbox.com/geocoding/v5
   ```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
