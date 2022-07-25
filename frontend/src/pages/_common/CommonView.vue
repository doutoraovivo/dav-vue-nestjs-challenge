<template>
  <v-app>
    <v-app-bar
      app
      :color="selection?.length ? 'grey darken-4' : 'primary'"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="ui.drawer = !ui.drawer"
      ></v-app-bar-nav-icon>

      <v-avatar tile class="hidden-xs-only">
        <v-img
          class="shrink mr-2"
          :src="require('../../assets/mini.png')"
          contain
        />
      </v-avatar>

      <v-app-bar-title>
        <span v-if="!selection?.length">
        {{ actualRoute.meta.title }}
        </span>
        <span v-else>
        {{ selection.length }} item(s) selecionado(s)
        </span>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <span v-if="!selection?.length">
        <v-btn
          v-for="(action, index) in contextualActions"
          :key="index"
          icon
          :to="action?.to"
          :aria-label="action.name"
          :title="action.name"
          @click.stop="$emit(action?.emit)"
        >
          <v-icon>{{ action.icon }}</v-icon>
        </v-btn>
      </span>

      <span v-else>
        <v-btn
            v-for="(action, index) in contextualActionsOnSelection"
            :key="index"
            icon
            :to="action?.to"
            :aria-label="action.name"
            :title="action.name"
            @click.stop="$emit(action?.emit)"
        >
          <v-icon>{{ action.icon }}</v-icon>
        </v-btn>
      </span>

    </v-app-bar>

    <v-navigation-drawer v-model="ui.drawer" width="300px" app>
      <v-card elevation="0">
        <v-card-text>
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require('../../assets/capsule.png')"
          />
        </v-card-text>
      </v-card>
      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Luciano</v-list-item-title>
            <v-list-item-subtitle><i>Administrador</i></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn text>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list nav dense shaped>
        <v-subheader>Funções</v-subheader>
        <v-list-item-group
          v-model="ui.group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="route in validRoutes"
            :key="route.path"
            :to="route.path"
            @click="ui.drawer = false"
          >
            <v-list-item-icon>
              <v-icon>{{ route.meta.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-footer fixed padless>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link to="/logout" class="text-decoration-none">
              <v-list-item-title>Logoff</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-footer>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer fixed padless color="primary"
      ><v-col class="text-right white--text"
        ><h6>Desenvolvido com &hearts; pelo Doutor ao Vivo</h6>
      </v-col></v-footer
    >

    <div class="text-center ma-2">
      <v-snackbar v-model="ui.snackbar">
        {{ processedError }}

        <template #action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="ui.snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  provide() {
    return {
      appBar: this,
    };
  },

  data: () => ({
    ui: {
      mini: false,
      drawer: false,
      group: undefined,
      snackbar: false,
    },
    processedError: undefined,
  }),

  computed: {
    error() {
      return this.$store.getters['common/error'];
    },

    selection() {
      return this.$store.getters['common/selection'];
    },

    contextualActions() {
      return this.$store.getters['common/contextualActions'];
    },

    contextualActionsOnSelection() {
      return this.$store.getters['common/contextualActionsOnSelection'];
    },

    actualRoute() {
      return this.$route;
    },

    validRoutes() {
      const routes = this.$router
        .getRoutes()
        .filter((route) => route.parent === undefined)
        .map((route) => ({
          path: route.path === '' ? '/' : route.path,
          name: route.name,
          meta: route.meta,
        }));
      return routes;
    },
  },

  watch: {
    error(error) {
      if (error) {
        this.processedError = error;
        this.ui.snackbar = true;
      }
    },
  },
};
</script>
