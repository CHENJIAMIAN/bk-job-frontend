

import Vue from 'vue';
import Vuex from 'vuex';
import distroFile from './modules/distro-file';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        scriptCheckError: false,
    },
    getters: {
        
    },
    mutations: {
        setScriptCheckError (state, value) {
            state.scriptCheckError = value;
        },
    },
    actions: {
        
    },
    // 模块
    modules: {
        distroFile,
    },
});

export default store;
