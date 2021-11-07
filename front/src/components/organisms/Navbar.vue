<template>
<nav>
    <v-snackbar v-model="snac" top :color="flashMessage.color">
       <div v-for="message in flashMessage.messages" :key="message">
            {{ message }}
        </div>  
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
          snac: true,
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
      flashMessage: function() {
          
          if (this.$store.state.flashMessage.messages.length > 0) this.setSnacTrue();
          else this.setSnacFalse();

          return this.$store.state.flashMessage;
      }
  },
};
</script>

