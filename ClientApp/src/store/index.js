import Vue from 'vue';
import Vuex from 'vuex';
import coderecipe from './modules/coderecipe';

Vue.use(Vuex);

// create store
export default new Vuex.Store({
    modules: {
        coderecipe,
    }
});
