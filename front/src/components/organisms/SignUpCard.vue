<template>
  <v-card>
    <v-card-title>
      <span class="headline">登録</span>
    </v-card-title>
    <v-card-text>
      <SignUpForm :onsignup="handleSignup" />
    </v-card-text>
  </v-card>
</template>
<script>
import SignUpForm from "@/components/molecules/SignUpForm";
export default {
  name: "SignUpCard",
  components: {
    SignUpForm,
  },
  methods: {
    handleSignup: function(userInfo) {
      return this.$store.dispatch("auth/signup", userInfo);
    }
  }
};
</script>
