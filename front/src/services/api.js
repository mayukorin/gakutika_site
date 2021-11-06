import axios from "axios";
import store from "@/store";

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
    if (store.state.message.keep_info) {
      store.dispatch("message/setSuccessMessage", {
        message: store.state.message.keep_info,
      });
      store.dispatch("message/clearKeepInfoMessage");
    }

    return response;
  },
  (error) => {
    console.log("error.resposnse=", error.response);
    const status = error.response ? error.response.status : 500;
    let message;
    if (status === 400) {
      message = [].concat.apply([], Object.values(error.response.data));
      store.dispatch("message/setWarningMessages", { message: message });
    } else if (status === 403) {
      message = [].concat.apply([], ["権限がありません．"]);
      store.dispatch("message/setErrorMessage", { message: message });
    } else if (status === 401) {
      const token = localStorage.getItem("access");
      let error_message;
      if (token != null) {
        error_message = "ログインの有効期限切れです．";
      } else {
        error_message =
          "パスワード・メールアドレスに誤りがあるか，登録されていません．";
      }
      message = [].concat.apply([], [ error_message ]);
      store.dispatch("auth/logout");
      store.dispatch("message/setErrorMessage", { message: message });
    } else {
      message = [].concat.apply([], ["想定外のエラーです．"]);
      store.dispatch("message/setErrorMessage", { message: message });
    }
    console.log(message);
    return Promise.reject(error);
  }
);

export default api;
