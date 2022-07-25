export const actions = {
  async fetchMessage({ commit }) {
    let message = {
      text: 'offline',
      author: 'offline',
    };
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BACKEND_BASE_URL}/quote`,
      );
      if (response.ok) {
        message = await response.json();
      }
    } catch (e) {
      ///
    }
    commit('storeMessage', message);
  },
};
