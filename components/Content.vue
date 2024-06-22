<script setup>
import Task from "./Task.vue";

defineProps({
  tasks: Array,
  selectedTaskId: Number,
});
const emit = defineEmits(["showTaskTextByListId"]);
</script>

<template>
  <div class="main-page__content">
    <h2 class="main-page__content-title">Content</h2>
    <div class="main-page__tasks">
      <Task
        v-for="task in tasks"
        :key="task.listId"
        :text="task.text"
        :listId="task.listId"
        :selectedTaskId="selectedTaskId"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page__content {
  display: flex;
  flex-direction: column;
}
.main-page__content-title {
  font-family: $headFontStyle;
  color: #000;
  font-size: 2.125rem;
}

// цвет хедера папки должен меняться по выбранной категории
</style>
