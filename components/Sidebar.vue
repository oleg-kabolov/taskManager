<script setup>
defineProps({
  items: Array,
});

const taskListOpen = ref(false);

const showTaskList = () => {
  taskListOpen.value = !taskListOpen.value;
};
</script>

<template>
  <div class="sidebar">
    <div class="all-tasks" @click="showTaskList">Все задачи</div>
    <div class="sidebar__list">
      <div v-if="taskListOpen">
        <TaskList
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :listId="item.listId"
          @showTaskTextByListId="$emit('showTaskTextByListId', $event)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  max-width: 200px;
  max-height: 100%;
  border-right: 1px solid #8d8787;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
}
.all-tasks {
  cursor: pointer;
}
</style>
