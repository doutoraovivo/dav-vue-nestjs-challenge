import { CommonStore } from '../../_plugins';

import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { state } from './state';

CommonStore.registerModule('person', {
  namespaced: 'true',
  state,
  getters,
  actions,
  mutations,
});
