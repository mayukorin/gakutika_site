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
import Button from "@/components/atoms/Button.vue";

export default {
  name: "SignInForm",
  components: {
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
            this.onsignin({ email: this.email, password: this.password });
          });
        }
      });
    },
  }
};
</script>
