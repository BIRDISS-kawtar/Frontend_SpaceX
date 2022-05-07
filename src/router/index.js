import { createRouter, createWebHistory } from "vue-router";

/*-------------ROUTER CONFIGURATION -------------*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Lazy loaded
      path: "/",
      name: "home",
      component: () => import("../components/Launches.vue"),
    },
    {
      // Lazy loaded
      path: "/launchDetails",
      name: "launchDetails",
      component: () => import("../components/Launch.vue"),
    },
  ],
});

export default router;
