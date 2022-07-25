import { CommonStore } from '../../_plugins';

import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { state } from './state';

export const modules = ['loading', 'contextualActions'];

CommonStore.registerModule('common', {
  namespaced: 'true',
  state,
  getters,
  actions,
  mutations,
});
