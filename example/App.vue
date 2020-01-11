<template>
  <div class="app">
    <h1>this is a component demo page</h1>
    <back-to-top />
  </div>
</template>
<script>
import BackToTop from "../lib/BackToTop";

export default {
  name: "App",
  components: { BackToTop },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss"></style>
