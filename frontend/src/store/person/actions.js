const toQuery = (params) => {
  const query = Object.entries(params)
    .filter((item) => item[1] !== undefined)
    .map((item) => `${item[0]}=${item[1]}`)
    .join('&');

  return encodeURI(query);
};

export const actions = {
  async find({ commit }, params) {
    let persons = [];
    try {
      const url = `${process.env.VUE_APP_BACKEND_BASE_URL}/person?${toQuery(
        params,
      )}`;
      const response = await fetch(url);
      if (response.ok) {
        persons = await response.json();
      }
    } catch (e) {
      ///
    }
    commit('read', persons);
  },

  async read({ commit }, key) {
    let person = undefined;

    try {
      const url = `${process.env.VUE_APP_BACKEND_BASE_URL}/person/${key || ''}`;
      const response = await fetch(url);
      if (response.status === 200) {
        person = await response.json();
      }
    } catch (e) {
      ///
    }
    commit('read', Array.isArray(person) ? person : [person]);
  },

  async save({ commit, dispatch }, payload) {
    let result = undefined;
    let key = payload?.key;
    ['key', 'status'].forEach((field) => {
      delete payload.entity[field];
    });

    try {
      const url = `${process.env.VUE_APP_BACKEND_BASE_URL}/person/${key || ''}`;
      const response = await fetch(url, {
        method: key ? 'PUT' : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload.entity),
      });
      result = await response.json();

      if ([200, 201].includes(response.status)) {
        commit('save', result);
        dispatch('read');
      } else {
        dispatch('common/error', result, { root: true });
      }
    } catch (e) {
      dispatch('common/error', e, { root: true });
    }
  },

  async delete({ dispatch }, entities) {
    try {
      for (const entity of entities) {
        const url = `${process.env.VUE_APP_BACKEND_BASE_URL}/person/${entity.key}`;
        const response = await fetch(url, {
          method: 'delete',
        });
        if (!response.ok) {
          dispatch('common/error', await response.json(), { root: true });
        }
      }
      dispatch('read');
    } catch (e) {
      ///
    }
  },
};
