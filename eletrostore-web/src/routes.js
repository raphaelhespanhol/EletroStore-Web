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
      name: "CategoryDetails",
      component: () => import("./components/DetailsCategoryComponent")
    },
    {
      path: "/products",
      name: "Products",
      component: () => import("./components/ProductComponent")
    },
    {
      path: "/products/:id",
      name: "ProductDetails",
      component: () => import("./components/DetailsProductComponent")
    }
  ]
});

export default router;
