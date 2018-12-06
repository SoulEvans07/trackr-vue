import Vue from 'vue'
import Vuex from 'vuex'

import apiService from '../services/apiService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        task_list: [],
        projects: []
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setTaskList(state, data) {
            state.task_list = data;
        },
        setTask(state, {index, data}){
            data.index = index;
            state.task_list[index] = data;
        }
    },
    actions: {
        login({ commit }, data) {
            // TODO: move apiService.login() here.
            commit('setUser', data);
            localStorage.setItem('user', JSON.stringify(data));
        },
        logout({ commit }) {
            localStorage.removeItem('user');
            apiService.logout();
            commit('setUser', {});
        },
        setTaskList({ commit }, data){
            commit('setTaskList', data);
        },
        setTask({commit}, {index, data}){
            commit('setTask', {index, data});
        }
    },
    getters: {}
});
