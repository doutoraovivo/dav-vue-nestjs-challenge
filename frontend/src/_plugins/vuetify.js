import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import pt from "vuetify/lib/locale/pt";

Vue.use(Vuetify);

export const vuetify = new Vuetify({
  lang: {
    locales: { pt },
    current: "pt"
  }
});
