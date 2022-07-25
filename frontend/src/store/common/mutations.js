const mutations = {};

[
  'contextualActions',
  'contextualActionsOnSelection',
  'loading',
  'error',
  'selection',
].forEach((key) => {
  mutations[key] = (state, payload) => (state[key] = payload);
});

mutations.error = (state, payload) => {
  state.error = {
    ts: Date.now(),
    payload,
  };
};

export { mutations };
