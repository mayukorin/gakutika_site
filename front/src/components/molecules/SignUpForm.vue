<template>
  <v-form>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="ユーザ名"
          rules="required|max:50"
          ref="usernameProvider"
        >
          <v-text-field
            v-model="name"
            :counter="50"
            :error-messages="errors"
            label="ユーザ名"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="メールアドレス"
          rules="required|email|max:255"
          ref="emailProvider"
        >
          <v-text-field
            v-model="email"
            :counter="255"
            :error-messages="errors"
            label="メールアドレス"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="パスワード"
          rules="required|min:6"
          vid="password"
          ref="passwordProvider"
        >
          <v-text-field
            v-model="password"
            :error-messages="errors"
            label="パスワード"
            required
            type="password"
            ref="password"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="パスワード（再入力）"
          rules="required|confirmed:password"
          ref="passwordConfirmationProvider"
        >
          <v-text-field
            v-model="password_confirmation"
            :error-messages="errors"
            label="パスワード（再入力）"
            required
            type="password"
          ></v-text-field>
        </validation-provider>
        <Button  @click="handleClick()" :disabled="invalid">作成</Button>
      </form>
    </validation-observer>
  </v-form>
</template>
<script>
import { required, email, max, min, confirmed } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import Button from "@/components/atoms/Button.vue";

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
})

export default {
  name: "SignUpForm",
  components: {
    ValidationProvider,
    ValidationObserver,
    Button
  },
  props: {
    onlogin: {
      type: Function
    }
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    handleClick: function() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick(() => {
            this.onlogin({ email: this.email, name: this.name, password: this.password, password_confirmation: this.password_confirmation })
              .catch(err => {
                console.log(err);
              })
              .then((response) => {
                console.log(response);
                console.log("ok");
              })
          });
        }
      });
    }
  }
};
</script>
