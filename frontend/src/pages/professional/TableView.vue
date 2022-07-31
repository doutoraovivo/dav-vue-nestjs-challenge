<template>
  <span>
    <dav-table-view
      :headers="headers"
      getter="professional/read"
      dispatch="professional/find"
      route-new="/professional/new"
      route-edit="/professional/edit"
      delete-item
      show-select
    >
    </dav-table-view>
    <router-view></router-view>
  </span>
</template>

<script>
import DaVTableView from '../_common/abstract/TableView';

export default {
  components: {
    'dav-table-view': DaVTableView,
  },
  data: () => ({
    fab: true,
    transition: undefined,
    headers: [
      {
        text: 'Nome',
        value: 'name',
      },
      { text: 'Sigla do registro', value: 'registerInitials' },
      { text: 'Código do registro', value: 'registerCode' },
      { text: 'Estado do registro', value: 'registerState' },
    ],
  }),
};
</script>
