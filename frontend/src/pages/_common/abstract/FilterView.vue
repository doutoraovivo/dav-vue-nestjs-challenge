<template>
  <span>
    <v-dialog v-model="ui.dialog" transition="dialog-top-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="ui.dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Filter</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="filter" @submit.prevent="query">
            <v-row>
              <v-col>
                <slot></slot>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="secondary" @click="clear">Limpar</v-btn>
              <v-btn text color="primary" type="submit">Pesquisar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <router-view :key="ts" />
  </span>
</template>

<script>
export default {
  name: 'DavFilterView',

  inject: ['appBar'],

  props: {
    filter: {
      type: Object,
      required: true,
    },
    listRoute: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    ui: {
      dialog: false,
    },
    ts: undefined,
    itemsPerPage: undefined,
  }),

  beforeCreate() {
    console.debug('maoe');
  },

  created() {
    if (this.$route.query) {
      for (const [key, value] of Object.entries(this.$route.query)) {
        this.$props.filter[key] = value;
      }
    }
  },

  beforeMount() {
    this.appBar.$on(
      'filter:show',
      function () {
        this.ui.dialog = true;
      }.bind(this),
    );
  },

  methods: {
    query() {
      this.ts = Date.now();
      this.$router
        .replace({
          name: this.$props['listRoute'],
          query: {
            ...this.params(this.$props.filter),
          },
        })
        .catch((failure) => failure.name !== 'NavigationDuplicated');
      this.ui.dialog = false;

      return true;
    },
    params(filter) {
      const params = {};
      Object.entries(filter).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
      return params;
    },
    clear() {
      this.$refs.filter.reset();
    },
  },
};
</script>
