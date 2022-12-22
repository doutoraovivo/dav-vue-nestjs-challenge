const actions = {};

[
  'error',
  'loading',
  'selection',
  'contextualActions',
  'contextualActionsOnSelection',
].forEach(
  (action) =>
    (actions[action] = ({ commit }, state) => {
      commit(action, state);
    }),
);

export { actions };
