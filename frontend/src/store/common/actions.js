export const actions = {
  error: ({ commit }, state) => commit('error', state),
  loading: ({ commit }, state) => commit('loading', state),
  selection: ({ commit }, state) => commit('selection', state),
  contextualActions: ({ commit }, actions) =>
    commit('contextualActions', actions),
  contextualActionsOnSelection: ({ commit }, actions) =>
    commit('contextualActionsOnSelection', actions),
};
