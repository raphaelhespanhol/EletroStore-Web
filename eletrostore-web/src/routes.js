import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history", // Use browser history
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./components/HomeApp")
    },
    {
      path: "/categories",
      name: "Categories",
      component: () => import("./components/CategoryComponent")
    },
    {
      path: "/categories/:id",
      name: "Category Details",
      component: () => import("./components/DetailsCategoryComponent")
    }
  ]
});

export default router;
