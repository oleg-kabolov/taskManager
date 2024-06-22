<script setup></script>

<template>
  <div class="main-page">
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.main-page__sidebar {
  max-width: 200px;
  max-height: 100%;
  border-right: 1px solid #8d8787;
  background-color: #e5e5e5;
}
.main-page__content {
  max-width: 800px;
  max-height: 100%;
  border-left: 1px solid #854040;
  background-color: #946a6a;
}
</style>
