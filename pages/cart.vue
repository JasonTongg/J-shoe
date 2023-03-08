<template>
  <div class="container"></div>
</template>
<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
  },
};
</script>
<style scoped></style>
