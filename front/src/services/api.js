import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(
  (config) => {
    // store.dispatch("message/clearMessages");
    console.log(process.env.VUE_APP_ROOT_API);
    console.log("okkkkkkkkkkkkkkkkkkkk")
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = "JWT " + token;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
      /*
    if (store.state.message.keep_info) {
      store.dispatch("message/setInfoMessage", {
        message: store.state.message.keep_info,
      });
      store.dispatch("message/clearKeepInfoMessage");
    }
    */
    return response;
  },
  (error) => {
    console.log("error.resposnse=", error.response);
    const status = error.response ? error.response.status : 500;
    let message;
    if (status === 400) {
      const messages = [].concat.apply([], Object.values(error.response.data));
      print(messages);
      // store.dispatch("message/setWarningMessages", { messages: messages });
    } else if (status === 403) {
      message = "権限がありません．";
      // store.dispatch("message/setErrorMessage", { message: message });
    } else if (status === 401) {
      const token = localStorage.getItem("access");
      if (token != null) {
        message = "ログインの有効期限切れです．";
      } else {
        message =
          "パスワード・メールアドレスに誤りがあるか，登録されていません．";
      }
      // store.dispatch("auth/logout");
      // store.dispatch("message/setErrorMessage", { message: message });
    } else {
      message = "想定外のエラーです．";
      // store.dispatch("message/setErrorMessage", { message: message });
    }
    console.log(message);
    return Promise.reject(error);
  }
);

export default api;
