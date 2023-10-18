import { createApp } from "vue";
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import uk from './locales/uk.json';

const i18n = createI18n({
  locale: 'uk',
  messages: {
    en,
    uk
  }
});

import { router, pinia } from "./providers";
import "./styles/main.css";
import App from "./App.vue";
export const app = createApp(App).use(i18n).use(pinia).use(router);
