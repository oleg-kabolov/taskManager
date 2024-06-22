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
    <div class="dropdown-header">
      <h2 @click="showTaskList"><span>Все задачи</span></h2>
      <ul class="dropdown-list" v-if="taskListOpen">
        <TaskList
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :listId="item.listId"
          @showTaskTextByListId="$emit('showTaskTextByListId', $event)"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  min-width: 250px;
  max-height: 100%;
  border-right: 1px solid #8d8787;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
}
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
}
</style>
