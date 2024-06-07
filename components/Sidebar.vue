<script setup>
import List from "./List.vue";
</script>

<template>
  <div class="sidebar">
    <List />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  max-width: 200px;
  max-height: 100%;
  border-right: 1px solid #8d8787;
  background-color: #e5e5e5;
}
</style>
