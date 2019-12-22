import Vue from 'vue';
import VueRouter, { Route, RouteRecord } from 'vue-router';

import User from "../entity/User";
import doCookieOperation from "../helper/CookieHelper";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'login',
    meta: { deniedForAuth: true },
    component: () => import('../views/Login.vue')
  }, {
    path: '/home',
    name: 'home',
    meta: { requiredAuth: true },
    component: () => import('../views/Home.vue')
  }, {
    path: '/about',
    name: 'about',
    meta: { requiredAuth: true },
    component: () => import('../views/About.vue')
  },
  {
    path: '/participant',
    name: 'participant',
    meta: { requiredAuth: true },
    component: () => import('../views/Participant.vue')
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    meta: { requiredAuth: true },
    component: () => import('../views/Sidebar.vue')
  }]
});

/**
 * Router middleware to validate auth user to access page
 */
router.beforeEach((to: Route, from: Route, next: Function) => {
  const user: void | null | User = doCookieOperation("session");

  const requiredAuth: boolean = to.matched.some((record: RouteRecord) => record.meta.requiredAuth);
  const deniedForAuth: boolean = to.matched.some((record: RouteRecord) => record.meta.deniedForAuth);

  if (requiredAuth && (!user || !user.token)) {
    return next({ path: `/` });
  } else if (deniedForAuth && user) {
    return next({ path: to.path });
  }

  return next();
});

export default router;