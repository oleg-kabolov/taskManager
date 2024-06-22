<script setup>
import Task from "./Task.vue";

defineProps({
  tasks: Array,
  selectedTaskId: Number,
});
const emit = defineEmits(["showTaskTextByListId"]);
</script>

<template>
  <div>Content</div>
  <div class="main-page__content">
    <Task
      v-for="task in tasks"
      :key="task.listId"
      :text="task.text"
      :listId="task.listId"
      :selectedTaskId="selectedTaskId"
    />
  </div>
</template>

<style lang="scss" scoped></style>
