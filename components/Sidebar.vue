<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
  items: Array,
});

const taskListOpen = ref(false);

const newTaskValue = ref("");

const submittedNewTask = ref("");

const inputPlaceholder = ref("+  Добавить папку");

const addTaskInput = ref(null);

const emit = defineEmits([
  "refreshItems",
  "showTaskTextByListId",
  "showCategoryNameByClick",
]);

const showTaskList = () => {
  taskListOpen.value = !taskListOpen.value;
};

const addCategoryTask = async (submittedNewTask) => {
  try {
    const obj = {
      id: props.items.length + 1,
      listId: props.items.length + 1,
      title: submittedNewTask,
    };
    const existingItem = props.items.find(
      (item) => item.title === submittedNewTask
    );
    if (!existingItem) {
      await axios.post("https://f39e7214ce616ae7.mokky.dev/list", obj);
    }
    newTaskValue.value = "";

    if (newTaskValue.value) {
      addTaskInput.value.blur();
    }

    emit("refreshItems");
    addPlaceholder();
  } catch (err) {
    console.log(err);
  }
};

const submitValue = () => {
  submittedNewTask.value = newTaskValue.value;
};

const handleInputMethods = () => {
  submitValue();
  addCategoryTask(submittedNewTask.value);
  addTaskInput.value.blur();
};

const removePlaceholder = () => {
  inputPlaceholder.value = "";
};
const addPlaceholder = () => {
  inputPlaceholder.value = "+  Добавить папку";
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__list">
      <div class="dropdown-header">
        <h2 @click="showTaskList"><span>Все задачи</span></h2>
        <ul class="dropdown-list" v-if="taskListOpen">
          <CategoryTaskList
            v-for="item in props.items"
            :key="item.id"
            :title="item.title"
            :listId="item.listId"
            @showTaskTextByListId="$emit('showTaskTextByListId', $event)"
            @showCategoryNameByClick="$emit('showCategoryNameByClick', $event)"
          />
        </ul>
      </div>
    </div>
    <div class="add-task-btn">
      <input
        ref="addTaskInput"
        v-model="newTaskValue"
        @keydown.enter="handleInputMethods"
        type="text"
        :placeholder="inputPlaceholder"
        @focus="removePlaceholder"
        @blur="addPlaceholder"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  min-width: 250px;
  max-height: 100%;
  border-right: 1px solid #8d8787;
  background-color: rgb(229, 229, 229, 0.3);
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}
.sidebar__list {
  margin-bottom: 42px;
}
.dropdown-header {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
}
.dropdown-header h2 {
  position: relative;
  text-align: center;
  font-family: $headFontStyle;
  font-weight: 400;
  font-size: 1.125rem;
  margin: 10px 0px;
}
.dropdown-header h2 > span::before {
  content: "";
  background-image: url("../as`se`ts/img/entypo-list.svg");
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
.add-task-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: $baseFontStyle;
  font-size: 0.875 rem;
  color: #767676;
  font-weight: 600;
  cursor: pointer;
}
.add-task-btn > input {
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  outline: none;
  background-color: transparent;
}
.add-task-btn > input:active,
input:focus {
  border-bottom: 1px solid #767676;
}
</style>
