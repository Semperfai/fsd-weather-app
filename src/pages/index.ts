import type { RouteRecordRaw } from "vue-router";
import { MainPage } from "./main";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MainPage,
    children: [
      {
        path: "city/:id",
        component: () => import("@/components/CityCard/CityCard.vue")
      }
    ]
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./favorites/ui/FavoritesPage.vue"),
    children: [
      {
        path: "city/:id",
        component: () => import("@/components/CityCard/CityCard.vue")
      }
    ]
  },
];
