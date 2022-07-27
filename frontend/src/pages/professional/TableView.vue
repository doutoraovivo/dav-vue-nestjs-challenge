<template>
  <span>
    <dav-table-view
      :headers="headers"
      name="professional"
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
      { text: 'Registro', value: 'registry' },
    ],
  }),
};
</script>
