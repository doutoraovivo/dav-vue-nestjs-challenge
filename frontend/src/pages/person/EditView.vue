<template>
  <v-dialog
    v-model="ui.dialog"
    fullscreen
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{
          $route.path.includes('/edit/') ? 'Edit' : 'New'
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="saveEntity"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="form.valid">
          <v-container>
            <v-row>
              <v-col class="col-12 col-sm-6">
                <v-text-field
                  id="form__name"
                  v-model="entity.name"
                  label="Nome"
                  required
                  :rules="form.name.rules"
                />
              </v-col>

              <v-col class="col-12 col-sm-6">
                <v-menu
                  v-model="ui.birth_date_menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      id="form__birth_date"
                      v-model="entity.birth_date"
                      label="Data de Nascimento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      clearable
                      required
                      :rules="form.birth_date.rules"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="entity.birth_date"
                    @input="ui.birth_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col class="col-12 col-sm-6">
                <v-select
                  v-model="entity.state"
                  :hint="`${select.label}, ${select.value}`"
                  :items="states"
                  item-text="label"
                  item-value="value"
                  label="Estado"
                  persistent-hint
                  single-line
                  required
                  :rules="form.state.rules"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const campoObrigatorio = [(v) => !!v || 'Campo obrigatório'];

export default {
  inject: ['appBar'],
  data: () => ({
    ui: {
      dialog: true,
      birth_date_menu: false,
    },
    form: {
      valid: false,
      name: {
        rules: campoObrigatorio,
      },
      state: {
        rules: campoObrigatorio,
      },
      birth_date: {
        rules: campoObrigatorio,
      },
    },
    entity: {
      key: undefined,
      name: undefined,
      birth_date: undefined,
      state: undefined,
      status: undefined,
    },
    select: { value: 'AC', label: 'Acre' },
    states: [
      { value: 'AC', label: 'Acre' },
      { value: 'AL', label: 'Alagoas' },
      { value: 'AP', label: 'Amapá' },
      { value: 'AM', label: 'Amazonas' },
      { value: 'BA', label: 'Bahia' },
      { value: 'CE', label: 'Ceará' },
      { value: 'DF', label: 'Distrito Federal' },
      { value: 'ES', label: 'Espírito Santo' },
      { value: 'GO', label: 'Goías' },
      { value: 'MA', label: 'Maranhão' },
      { value: 'MT', label: 'Mato Grosso' },
      { value: 'MS', label: 'Mato Grosso do Sul' },
      { value: 'MG', label: 'Minas Gerais' },
      { value: 'PA', label: 'Pará' },
      { value: 'PB', label: 'Paraíba' },
      { value: 'PR', label: 'Paraná' },
      { value: 'PE', label: 'Pernambuco' },
      { value: 'PI', label: 'Piauí' },
      { value: 'RJ', label: 'Rio de Janeiro' },
      { value: 'RN', label: 'Rio Grande do Norte' },
      { value: 'RS', label: 'Rio Grande do Sul' },
      { value: 'RO', label: 'Rondônia' },
      { value: 'RR', label: 'Roraíma' },
      { value: 'SC', label: 'Santa Catarina' },
      { value: 'SP', label: 'São Paulo' },
      { value: 'SE', label: 'Sergipe' },
      { value: 'TO', label: 'Tocantins' },
    ],
  }),

  computed: {
    person() {
      return this.$store.getters['person/read'];
    },
    save() {
      return this.$store.getters['person/save'];
    },
  },

  watch: {
    save(result) {
      if (result) {
        this.close();
      }
    },
    person(search) {
      if (search && search.length === 1) {
        this.entity = search[0];
      }
    },
  },

  created() {
    if (this.$route?.params?.key) {
      this.$store.dispatch('person/read', this.$route.params.key);
    }
  },

  methods: {
    close() {
      this.$router.back();
    },
    saveEntity() {
      if (this.form.valid) {
        const payload = {
          entity: this.entity,
        };
        if (this.$route.params.key) payload.key = this.$route.params.key;
        this.$store.dispatch('person/save', payload);
      } else {
        this.$refs.form.validate();
      }
    },
  },
};
</script>

<style>
.v-dialog--fullscreen {
  border-radius: 0;
  margin: 0;
  height: 100%;
  position: fixed;
  overflow-y: auto;
  top: 60px;
}
</style>
