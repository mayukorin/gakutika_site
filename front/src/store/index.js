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
        console.log(response);
      })
    },
    renew(context) {
      console.log("renew");
      return api({
        method: "get",
        url: "/me/",
      }).then(response => {
        console.log(response);
        console.log(context);
      })
    },
    signin(context, payload) {
      return api({
        method: "post",
        url: "/signin",
        data: {
          session: {
            email: payload.email,
            password: payload.password
          }
        }
      }).then((response) => {
        console.log(response.data.access);
        localStorage.setItem("access", response.data.access);
        return context.dispatch("renew");
      })
    },
    signout(context) {
      console.log(context);
    }
  }
}

const store = new Vuex.Store({
  modules: {
    auth: authModule,
  },
});

export default store;