import Vue from 'vue';
import VueRouter from 'vue-router';
// import { CommonStore } from '@/_plugins/vuex';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [],
});

// router.beforeEach((to, from, next) => {
//   CommonStore.dispatch('common/contextualActions', []);
//   next();
// });

export const CommonRouter = {
  instance: router,

  addRoute(routeConfig) {
    routeConfig.forEach((config) => router.addRoute(config));
  },
};
