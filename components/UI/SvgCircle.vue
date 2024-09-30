<script setup>
const props = defineProps({
  width: String,
  height: String,
  color: String,
  cx: String,
  cy: String,
  r: String,
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    :fill="color"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle :cx="cx" :cy="cy" :r="r" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped></style>
