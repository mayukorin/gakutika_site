<template>
<nav>
    <v-snackbar v-model="snac" timeout="4000" top :color="message.color">
       あああああ
    </v-snackbar>
    <v-app-bar flat app>
        <v-app-bar-nav-icon
        class="grey--text"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Gakutika</span>
        </v-toolbar-title>
    </v-app-bar>
</nav>
</template>
<script>

export default {
  name: "Navbar",
  data() {
      return {
          snac: false,
      } 
  },
  methods: {
      setSnacFalse: function() {
          this.snac = false;
      },
      setSnacTrue: function() {
          this.snac = true;
      }
  },
  computed: {
      message: function() {
          if (this.$store.state.message.length > 0) {
              console.log("ok");
              this.setSnacTrue();
          }
          else this.setSnacFalse();
          return this.$store.state.message;
      }
  },
};
</script>

