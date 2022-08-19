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
      console.debug('commit', action, JSON.stringify(state));
      commit(action, state);
    }),
);

export { actions };
