import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

const authModule = {
  namespaced: true,
  state: {
    username: "",
    email: "",
    isLoggedIn: false
  },
  mutations: {
    set(state, payload) {
      state.username = payload.user.username;
      state.email = payload.user.email;
      state.isLoggedIn = true;
    },
    reset(state) {
      state.username = "";
      state.email = "";
      state.isLoggedIn = false;
    }
  },
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
        context.commit("set", { user: response.data });
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
};

const messageModule = {
  namespaced: true,
  state: {
    messages: [],
    color: "",
  },
  mutations: {
    set(state, payload) {
      if (payload.error) {
        state.messages = payload.error;
        state.color = "error";
        console.log("mutation");
        console.log(state.messages);
      } else if (payload.warning) {
        state.messages = payload.warning;
        state.color = "warning";
      } else if (payload.success) {
        state.messages = payload.success;
        state.color = "success";
      }
    },
    clear(state) {
      state.messages = [];
      state.color = "";
    }
  },
  actions: {
    setErrorMessage(context, payload) {
      context.commit("clear");
      console.log("actions");
      console.log(payload.message);
      context.commit("set", { error: payload.message });
    },
    setWarningMessages(context, payload) {
      context.commit("clear");
      context.commit("set", { warning: payload.message });
    },
    setSuccessMessage(context, payload) {
      context.commit("clear");
      context.commit("set", { success: payload.message });
    },
    clearMessages(context) {
      context.commit("clear");
    }
  }
};

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    message: messageModule
  },
});

export default store;