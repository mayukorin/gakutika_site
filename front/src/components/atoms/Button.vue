<template>
  <v-btn 
    class="success mx-0 mt-3" 
    @click="handleClick"
    depressed
  >
    <slot />
  </v-btn>
</template>
<script>
export default {
  name: "Button",
  methods: {
    handleClick(ev) {
      this.$emit("click", ev);
    },
  },
};
</script>

<style></style>
