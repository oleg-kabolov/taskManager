<script setup>
defineProps({
  text: String,
  listId: Number,
  selectedTaskId: Number,
});
</script>

<template>
  <div v-if="listId === selectedTaskId" class="task-description">
    <span>{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.task-description span {
  font-family: $baseFontStyle;
  word-break: break-word;
  font-size: 1.125rem;
  font-weight: 700;
}
</style>
