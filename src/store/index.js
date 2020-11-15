/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const initialUserObj = {
  name: null,
  email: null,
  address: {
    street: null,
    city: null,
    block: null,
  },
};
function initialState() {
  return {
    state: {
      editedUser: {
        name: null,
        email: null,
        address: {
          street: null,
          city: null,
          block: null,
        },
      },
    },
    getters: {
      getEditedUser(state) {
        return state.editedUser;
      },
    },
    mutations: {
      set(state, { type, items }) {
        state[type] = items;
      },
    },
    actions: {
      setEditedUser({ commit, state }, value) {
        commit("set", { type: "editedUser", items: value });
      },
      resetEditedUser({ commit, state }) {
        commit("set", { type: "editedUser", items: initialUserObj });
      },
    },
  };
}
const store = new Vuex.Store(initialState());

export default store;
