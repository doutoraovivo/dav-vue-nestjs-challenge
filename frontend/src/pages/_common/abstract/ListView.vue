<template>
  <router-view />
</template>

<script>
import { CommonStore } from '@/_plugins';

export default {
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(to, from, next) {
    CommonStore.dispatch('common/contextualActions', [
      { emit: 'filter:show', icon: 'mdi-filter', name: 'Filtro', key: 1 },
    ]);
    CommonStore.dispatch('common/contextualActionsOnSelection', [
      { emit: 'item:delete', icon: 'mdi-delete', name: 'Delete', key: 1 },
    ]);
    next();
  },

  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    CommonStore.dispatch('common/contextualActions', []);
    CommonStore.dispatch('common/contextualActionsOnSelection', []);
    next();
  },
};
</script>
