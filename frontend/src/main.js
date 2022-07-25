import Vue from 'vue';
import App from './App.vue';

import { CommonStore, CommonRouter, vuetify } from './_plugins';

import '@/pages';
import '@/store';

Vue.config.productionTip = false;

new Vue({
  router: CommonRouter.instance,
  store: CommonStore.instance,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
