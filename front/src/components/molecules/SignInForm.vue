<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
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
            id="email"
            prepend-icon="mdi-email"
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
            prepend-icon="mdi-lock"
          ></v-text-field>
        </validation-provider>
        <Button  @click="handleClick()">ログイン</Button>
      </form>
    </validation-observer>
  </v-form>
</template>
<script>
import { required, email, max, min } from "vee-validate/dist/rules";
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


export default {
  name: "SignInForm",
  components: {
    ValidationProvider,
    ValidationObserver,
    Button
  },
  props: {
    onsignin: {
      type: Function
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleClick: function() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick(() => {
            this.onsignin({ email: this.email, password: this.password })
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
    },
  }
};
</script>
