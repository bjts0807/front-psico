import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [

  {
    path: "/",
    name: "/",
    redirect: "/signin",
    component: () => import("../views/LoginComponent")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/LoginComponent"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardComponent"),
    meta : {requiresLogin: true},
  },
  {
    path: "/tutores",
    name: "tutor.create",
    component: () => import("../views/tutores/CreateTutor"),
    meta : {requiresLogin: true},
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: 'history',
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.is_logged) {
      next("/signin")
  } else {
      next()
  }
}) 
export default router;
