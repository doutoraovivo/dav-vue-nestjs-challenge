<template>
  <v-container @item:delete="deleteItems">
    <v-row>
      <v-col
        ><v-chip-group>
          <span
            v-for="([key, value], index) in Object.entries($route.query)"
            :key="index"
          >
            <v-chip v-if="value">{{ key }}:{{ value }}</v-chip>
          </span>
        </v-chip-group></v-col
      >
    </v-row>
    <v-row>
      <v-col class="d-flex flex-column-reverse">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          v-model="ui.selected"
          :search="search"
          :headers="$props.headers"
          :items="items"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          item-key="key"
          hide-default-footer
          class="elevation-1"
          :loading="loading"
          :show-select="showSelect"
          @click:row="clickRow"
          @page-count="pageCount = $event"
        >
          <template v-for="slot in Object.keys($scopedSlots)" #[slot]="props">
            <slot v-bind="props" :name="slot" />
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </v-col>
    </v-row>
    <v-btn
      v-if="routeNew"
      color="primary"
      fab
      fixed
      bottom
      right
      :to="routeNew"
      class="mb-10"
      ><v-icon>mdi-plus</v-icon></v-btn
    >
  </v-container>
</template>

<script>
export default {
  name: 'DavTableView',

  inject: ['appBar'],

  props: {
    name: {
      type: String,
      required: true,
    },

    dispatch: {
      type: String,
      required: true,
    },

    getter: {
      type: String,
      required: true,
    },

    showSelect: {
      type: Boolean,
      required: false,
      default: false,
    },

    headers: {
      type: Array,
      required: true,
    },

    routeNew: {
      type: String,
      required: false,
      default: undefined,
    },

    routeEdit: {
      type: String,
      required: false,
      default: undefined,
    },

    deleteItem: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data: () => ({
    ui: {
      selected: undefined,
    },
    search: undefined,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    items: [],
  }),

  computed: {
    loading() {
      return this.$store.getters['common/loading'];
    },
    entities() {
      return this.$store.getters[this.$props.getter];
    },
  },

  watch: {
    'ui.selected'(selection) {
      this.$store.dispatch('common/selection', selection);
    },
    entities(result) {
      if (result) {
        this.items = result;
        this.$store.dispatch('common/loading', false);
      }
    },
  },

  beforeMount() {
    if (this.$route.query) {
      this.$store.dispatch('common/loading', true);
      this.$store.dispatch(this.$props.dispatch, this.$route.query);
    }

    if (this.routeDelete) {
      this.$store.dispatch('common/contextualActionsOnSelection', [
        { emit: 'item:delete', icon: 'mdi-delete', name: 'Delete', key: 1 },
      ]);
    }

    this.appBar.$on(
      'item:delete',
      function () {
        this.deleteItems();
      }.bind(this),
    );
  },

  beforeDestroy() {
    this.$store.dispatch('common/contextualActionsOnSelection', []);
    this.$store.dispatch('common/selection', undefined);
    this.appBar.$off('item:delete');
  },

  methods: {
    clickRow(item) {
      if (this.routeEdit) {
        this.$router.push(`${this.routeEdit}/${item.key}`);
      }
    },
    deleteItems() {
      this.$store.dispatch(`${this.name}/delete`, this.ui.selected);
      this.ui.selected = undefined;
      this.$store.dispatch('common/selection', undefined);
    },
  },
};
</script>
