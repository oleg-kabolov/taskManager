<script setup>
import Task from "./Task.vue";
import { ref, computed } from "vue";
import axios from "axios";
import TaskListHeader from "./TaskListHeader.vue";

const props = defineProps({
  tasks: Array,
  items: Array,
  color: String,
  selectedTaskId: Number,
  selectedTaskName: String,
  showAllTasks: Boolean,
});

const newCategoryValue = ref("");

const submittedCategoryValue = ref("");

const addTaskBtn = ref(false);

const newTaskValue = ref("");
const subbmittedNewTaskValue = ref("");

const recievedShowTaskValue = ref(false);

const isFocused = ref(false);
const focusedPlaceholder = "";

const emit = defineEmits([
  "showTaskTextByListId",
  "showCategoryNameByClick",
  "updateCategoryTitle",
  "updateTaskList",
  "resolvedTask",
  "refreshItems",
]);

const showAddTaskBtn = () => {
  addTaskBtn.value = false;
};

const taskCategoryTitleSorted = computed(() => {
  return props.tasks.filter((item) => item.listId === props.selectedTaskId);
});
const taskCategorySortTasks = computed(() => {
  props.tasks.filter((item) => {
    item.listId === props.selectedTaskId;
  });
});

const submitCategoryValue = () => {
  submittedCategoryValue.value = newCategoryValue.value;
};

const submitTaskValue = () => {
  subbmittedNewTaskValue.value = newTaskValue.value;
};
const handleMethodsByAddBtn = () => {
  showAddTaskBtn();
  props.selectedTaskId
    ? (submitTaskValue(), addNewTask(subbmittedNewTaskValue.value))
    : alert("Выберите категорию");
};
const handleMethodsAbortBtn = () => {
  showAddTaskBtn();
  submitTaskValue();
};
const showFullList = (value) => {
  recievedShowTaskValue.value = value;
};

const addNewTask = async (subbmittedNewTaskValue) => {
  try {
    const obj = {
      id: props.tasks.length + 1,
      listId: props.selectedTaskId,
      text: subbmittedNewTaskValue,
    };

    await axios.post(`https://f39e7214ce616ae7.mokky.dev/tasks`, obj);

    emit("updateTaskList");
    newTaskValue.value = "";
  } catch (err) {
    console.log(err);
  }
};
const removeResolvedTask = async () => {
  try {
    const obj = {
      listId: props.selectedTaskId,
    };
    const listId = props.tasks.find(
      (item) => item.listId === props.selectedTaskId
    );
    await axios.delete(
      `https://f39e7214ce616ae7.mokky.dev/tasks/${listId.id}`,
      obj
    );

    emit("resetMarkResolvedTask");

    emit("updateTaskList");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="main-page__content">
    <div class="main-page__tasks">
      <TaskListHeader
        v-if="taskCategoryTitleSorted"
        :tasks="tasks"
        :items="items"
        :selectedTaskId="selectedTaskId"
        :selectedTaskName="selectedTaskName"
        @refreshItems="emit('refreshItems')"
        @updateTaskList="emit('updateTaskList')"
        @updateCategoryTitle="emit('updateCategoryTitle')"
        @showAllTasks="showFullList"
      />
      <Task
        v-for="task in tasks"
        :key="task.listId"
        :text="task.text"
        :listId="task.listId"
        :tasks="tasks"
        :color="task.color"
        :selectedTaskId="selectedTaskId"
        :selectedTaskName="selectedTaskName"
        @resolvedTask="removeResolvedTask"
        @resetMarkResolvedTask="emit('resetMarkResolvedTask')"
        @showAllTasks="showFullList"
      />
      <div class="main-page__all-tasks"></div>
    </div>
    <div class="main-page__content-addTaskWrapper">
      <div
        v-if="!addTaskBtn"
        @click="addTaskBtn = true"
        class="main-page__content-addTask"
      >
        <span>+</span>Новая задача
      </div>
      <input
        v-if="addTaskBtn"
        class="main-page__content-taskName"
        type="text"
        v-model="newTaskValue"
        placeholder="Текст задачи"
        @keydown.enter="handleMethodsByAddBtn"
      />
      <div v-if="addTaskBtn" class="main-page__content-btns">
        <button
          @click="handleMethodsByAddBtn"
          class="main-page__content-btn-add"
        >
          Добавить Задачу
        </button>
        <button
          @click="handleMethodsAbortBtn"
          class="main-page__content-btn-cancel"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page__content {
  display: flex;
  flex-direction: column;
  margin-left: 102px;
  padding-top: 60px;
}
.main-page__content-addTask {
  display: flex;
  align-items: center;
  font-family: $baseFontStyle;
  font-size: 1.5rem;
  color: #9c9c9c;
}
.main-page__content-addTask span {
  font-size: 1.9rem;
  color: #9c9c9c;
  margin-right: 10px;
}
.main-page__content-addTaskWrapper input {
  font-family: $baseFontStyle;
  min-width: 292px;
  min-height: 38px;
  margin-bottom: 20px;
  outline: none;
  border: 1px solid #c7c7c7;
  background: transparent;
  color: #000;
  cursor: pointer;
}
.main-page__content-addTaskWrapper input::placeholder {
  color: #c7c7c7;
}
.main-page__content-addTaskWrapper input:focus {
  border: 1px solid #4dd599;
}
.main-page__content-btns {
  display: flex;
  justify-content: space-between;
}
.main-page__content-btns button {
  font-family: $baseFontStyle;
  cursor: pointer;
}
.main-page__content-btn-add {
  background-color: #4dd599;
  border: none;
  outline: none;
  color: #fff;
  padding: 10px 30px;
  border-radius: 4px;
  margin-right: 15px;
}
.main-page__content-btn-cancel {
  background-color: #f4f6f8;
  border: none;
  outline: none;
  color: #9c9c9c;
  padding: 10px 20px;
  border-radius: 4px;
}
</style>
