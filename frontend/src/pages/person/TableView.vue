<template>
  <span>
    <dav-table-view
      :headers="headers"
      name="person"
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
      <template #item.state="{ item }">
        {{ formatStateToUpperCase(item.state) }}
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
      { text: 'Estado', value: 'state' },
    ],
  }),
  methods: {
    formatDate(date) {
      return moment(date, 'YYYY-MM-DD').format('L');
    },
    formatStateToUpperCase(state) {
      return state?.toUpperCase();
    },
  },
};
</script>
