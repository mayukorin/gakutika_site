<template>
  <v-card>
    <v-card-title>
      <span class="headline">ログイン</span>
    </v-card-title>
    <v-card-text>
      <SignInForm :onsignin="handleSignin" :onrenew="handleRenew" />
    </v-card-text>
  </v-card>
</template>
<script>
import SignInForm from "@/components/molecules/SignInForm";
export default {
  name: "SignInCard",
  components: {
    SignInForm,
  },
  methods: {
    handleSignin: function(userInfo) {
      return this.$store.dispatch("auth/signin", userInfo);
    },
    handleRenew: function() {
      return this.$store.dispatch("auth/renew");
    }
  }
};
</script>
