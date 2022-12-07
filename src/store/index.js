import { createStore } from "vuex";
import { login,logout, csrfCookie,getAuthenticatedUser } from "../services/loginService";
import router from "../router/index"

export default createStore({
  state: {
    hideConfigButton: false,
    showSidenav: true,
    showConfig: false,
    showHeader: true,
    showFooter: true,
    is_logged : false,
    user: null,
  },
  mutations: {
    toggleEveryDisplay(state) {
      state.showHeader = !state.showHeader;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    
    isLogged(state, isLogged) {
      state.is_logged = isLogged;
    },
    SET_LOGIN_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({commit }, credentials) {
      await csrfCookie();
      await  login(credentials).then(response => {
          if (response.data) {
            commit("isLogged", true);
              commit('SET_LOGIN_USER', response.data);
              router.push({
                name : 'Dashboard'
              })
          }
         
      });
    },
    async logout({ commit }) {
      await logout();
      commit('SET_LOGIN_USER', null);
      commit('isLogged', false);
      router.push({
        name : 'signin'
      })
    },
    async currentUser({ commit }) {
      try {
        let response = await getAuthenticatedUser();
        if (response.data) {
            commit('SET_LOGIN_USER', response.data);
            commit('isLogged', true);
            router.push({
              name : 'Dashboard'
            })
        } else {
          commit('isLogged', false);
        }
      } catch (e) {
          switch (e.response.status) {
              case 401:
                  commit('SET_LOGIN_USER', {});
                  commit('isLogged', false);
                  break;
          }
      }
    },
  },
  getters: {},
});
