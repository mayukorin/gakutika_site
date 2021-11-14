<template>
  <v-card> 
    <v-card-title>
      <span class="headline">ログイン</span>
    </v-card-title>
    <v-card-text>
      <SignInForm :onsignin="handleSignin"/>
      <v-divider class="mt-3 mb-3"></v-divider>
      アカウントをお持ちではない方は
      <Button @click="goToSignUpPage">アカウント登録</Button>
    </v-card-text>
  </v-card>
</template>
<script>
import SignInForm from "@/components/molecules/SignInForm";
import Button from "@/components/atoms/Button.vue";
export default {
  name: "SignInCard",
  components: {
    SignInForm,
    Button
  },
  methods: {
    handleSignin: function(userInfo) {
      return this.$store.dispatch("auth/signin", userInfo).then((response) => {
        let signInSuccessMessage = 'こんにちは，' + response.data.name + 'さん';
        this.$store.dispatch("flashMessage/setSuccessMessage", { messages: [ signInSuccessMessage ]});
        const next = this.$route.query.next || "/";
        this.$router.replace(next);
      }).catch((error) => {
        console.log(error);
      });
    },
    goToSignUpPage: function() {
      this.$router.replace('/sign-up');
    }
  }
};
</script>
