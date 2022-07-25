import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
});

export const CommonStore = {
  instance: store,

  registerModule(path, rawModule, options) {
    store.registerModule(path, rawModule, options);
  },

  dispatch(_type, _payload) {
    return store.dispatch(_type, _payload);
  },
};
