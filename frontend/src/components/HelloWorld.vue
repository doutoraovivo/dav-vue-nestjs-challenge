<template>
  <v-container>
    <v-row class="fill-height text-center">
      <v-col>
        <v-img
ref="logo"
            :src="require('../assets/logo-draovivo-site.png')"
            class="my-3"
            contain
            height="200"
        />
        <h1 class="display-2 font-weight-bold mb-3">Bem vindo ao DaV</h1>
        <p class="subheading font-weight-regular">Boa sorte!</p>
      </v-col>

      <v-col class="d-flex justify-center">
        <v-card width="400px" :loading="loading" shaped class="align-self-center">
          <v-card-title>Mensagem do dia</v-card-title>
          <span v-if="quote && !loading">
          <v-card-text><h2>"{{ quote.text }}"</h2></v-card-text>
            <v-card-subtitle><i>{{ quote.author }}</i></v-card-subtitle>
          </span>
          <span v-if="loading">
            <v-skeleton-loader type="article"></v-skeleton-loader>
          </span>
          <v-card-actions><v-btn color="info" text :disabled="loading" @click="refresh">Refresh</v-btn></v-card-actions>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "HelloWorld",

  data: () => ({
    attrs: {
      class: 'mb-6',
      boilerplate: true,
      elevation: 2,
    }
  }),

  computed: {
    loading() {
      return this.$store.getters['common/loading'];
    },
    quote() {
      return this.$store.getters['hello/getMessage'];
    }
  },

  watch: {
    quote (val) {
      if (val) this.$store.dispatch("common/loading", false);
    }
  },

  created() {
    this.refresh();
  },

  methods: {
    refresh () {
      this.$store.dispatch("common/loading", true);
      this.$store.dispatch("hello/fetchMessage");
    }
  },

};
</script>
