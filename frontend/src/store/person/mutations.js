export const mutations = {
  read(state, payload) {
    state.read = payload;
  },
  save(state, payload) {
    state.save = payload;
    state.read.push(payload);
  },
  delete(state, key) {
    state.read = state.read.filter((item) => item.key !== key);
  },
};
