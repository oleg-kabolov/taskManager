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
<<<<<<< HEAD
    <div class="all-tasks" @click="showTaskList">Все задачи</div>
    <div class="sidebar__list">
      <div v-if="taskListOpen">
=======
    <div class="dropdown-header">
      <h2 @click="showTaskList"><span>Все задачи</span></h2>
      <ul class="dropdown-list" v-if="taskListOpen">
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
        <TaskList
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :listId="item.listId"
          @showTaskTextByListId="$emit('showTaskTextByListId', $event)"
        />
<<<<<<< HEAD
      </div>
=======
      </ul>
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
<<<<<<< HEAD
  max-width: 200px;
=======
  min-width: 250px;
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
  max-height: 100%;
  border-right: 1px solid #8d8787;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
}
<<<<<<< HEAD
.all-tasks {
  cursor: pointer;
=======
.dropdown-header {
  cursor: pointer;
  background-color: #f4f6f8;
  padding: 10px;
  border: 1px solid #ddd;
}
.dropdown-header h2 {
  position: relative;
  text-align: center;
  font-family: $headFontStyle;
  font-weight: 400;
  font-size: 1.125rem;
}
.dropdown-header h2 > span::before {
  content: "";
  background-image: url("../assets/img/entypo-list.svg");
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 38px;
  top: 1px;
}
.dropdown-list {
  list-style-type: none;
  padding-left: 56px;
  margin: 0;
  border: 1px solid #ddd;
  border-top: none;
}
.dropdown-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.dropdown-list li:last-child {
  border-bottom: none;
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
}
</style>
