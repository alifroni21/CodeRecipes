const state = {
    snackbar: {
        show: false,
        text: '',
        color: '',
        duration: 10000
    },
    email: null,
    allRecipe: null,
    idRecipe: null,
    token: null
};

const getters = {
    snackbar: (state) => state.snackbar,
    email: (state) => state.email,
    allRecipe: (state) => state.allRecipe,
    idRecipe: (state) => state.idRecipe,
    token: (state) => state.token
}

const actions = {
    async setSnackbar({ commit }, params) {
        commit('updateSnackbar', params)
    },
    async resetSnackbar({ commit }) {
        commit('updateSnackbar', { show: false, text: '', color: '' })
    },
    async setEmail({ commit }, params) {
        commit('updateEmail', params)
    },
    async setAllRecipe({ commit }, params) {
        commit('updateAllRecipe', params)
    },
    async setIdRecipe({ commit }, params) {
        commit('updateIdRecipe', params)
    },
    async setToken({ commit }, params) {
        commit('updateToken', params)
    }
};

const mutations = {
    updateSnackbar: (state, load) => {
        state.snackbar.show = load.show;
        state.snackbar.text = load.text;
        state.snackbar.color = load.color;
        state.snackbar.duration = load.duration;
    },
    updateEmail: (state, title) => (state.email = title),
    updateAllRecipe: (state, title) => (state.allRecipe = title),
    updateIdRecipe: (state, title) => (state.idRecipe = title),
    updateToken: (state, title) => (state.token = title)
};

export default {
    state,
    getters,
    actions,
    mutations
};