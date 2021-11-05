<template>
  <v-btn 
    class="success mx-0 mt-3" 
    @click="handleClick"
    :disabled="disabled"
    depressed
  >
    <slot />
  </v-btn>
</template>
<script>
export default {
  name: "Button",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(ev) {
      this.$emit("click", ev);
    },
  },
};
</script>

<style></style>
