<template>
  <span>
    <dav-table-view
      :headers="headers"
      getter="person/read"
      dispatch="person/find"
      route-new="/person/new"
      route-edit="/person/edit"
      delete-item
      show-select
    >
      <template #item.birth_date="{ item }">
        {{ formatDate(item.birth_date) }}
      </template>
    </dav-table-view>
    <router-view></router-view>
  </span>
</template>

<script>
import DaVTableView from '../_common/abstract/TableView';
import moment from 'moment';

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
      { text: 'Data de Nascimento', value: 'birth_date' },
    ],
  }),
  methods: {
    formatDate(date) {
      return moment(date, 'YYYY-MM-DD').format('L');
    },
  },
};
</script>
