<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors}"
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
            prepend-icon="mdi-account"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors}"
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
          v-slot="{ errors}"
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
        <validation-provider
          v-slot="{ errors}"
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
            prepend-icon="mdi-lock"
          ></v-text-field>
        </validation-provider>
        <Button  @click="handleClick()">作成</Button>
      </form>
    </validation-observer>
  </v-form>
</template>
<script>
import Button from "@/components/atoms/Button.vue";

export default {
  name: "SignUpForm",
  components: {
    Button
  },
  props: {
    onsignup: {
      type: Function
    }
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    handleClick: function() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick(() => {
            this.onsignup({ email: this.email, name: this.name, password: this.password, password_confirmation: this.password_confirmation });
          });
        }
      });
    }
  },
};
</script>
