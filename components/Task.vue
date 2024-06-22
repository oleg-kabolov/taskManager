<script setup>
defineProps({
  text: String,
  listId: Number,
  selectedTaskId: Number,
});
</script>

<template>
  <div v-if="listId === selectedTaskId">{{ text }}</div>
</template>

<style lang="scss" scoped></style>
