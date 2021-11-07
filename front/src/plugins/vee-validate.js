import { required, email, max, min, confirmed } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import Vue from "vue";


setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} を入力してください",
});

extend("max", {
  ...max,
  message: "{_field_} は {length} 文字以下で入力してください",
});

extend("min", {
  ...min,
  message: "{_field_} は {length} 文字以上で入力してください",
});

extend("email", {
  ...email,
  message: "メールアドレスを正しい形式で入力してください",
});

extend("confirmed", {
    ...confirmed,
    message: "パスワードが一致しません"
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
