<template>
  <dav-filter-view list-route="person-table" :filter="filter">
    <v-row>
      <v-col>
        <v-text-field
          v-model="filter.name"
          counter="25"
          hint="type some part of the name that you are looking for"
          label="Name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-row-reverse">
        <v-text-field
          v-model="filter.itemsPerPage"
          label="Items per page"
          type="number"
          min="-1"
          max="15"
          @input="itemsPerPage = parseInt($event, 10)"
        ></v-text-field>
      </v-col>
    </v-row>
  </dav-filter-view>
</template>

<script>
import DavFilterView from '../_common/abstract/FilterView';

export default {
  components: {
    'dav-filter-view': DavFilterView,
  },
  data: () => ({
    filter: {
      itemsPerPage: undefined,
      name: undefined,
    },
  }),
};
</script>
