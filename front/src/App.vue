<template>
  <v-app>
    <Navbar />
    <v-main class="grey lighten-4">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/organisms/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
};
</script>
