import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

const authModule = {
  namespaced: true,
  actions: {
    signup(context, payload) {
      return api({
        method: "post",
        url: "/users/",
        data: {
          user: {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password_confirmation
          }
        }
      }).then((response) => {
        console.log(context);
        return response;
      })
    },
    signin(context, payload) {
      return api({
        method: "post",
        url: "/login",
        data: {
          session: {
            email: payload.email,
            password: payload.password
          }
        }
      }).then((response) => {
        console.log(context);
        return response;
      })
    }
  }
}

const store = new Vuex.Store({
  modules: {
    auth: authModule,
  },
});

export default store;