<script setup>
import Task from "./Task.vue";
import { ref, computed } from "vue";
import axios from "axios";

const props = defineProps({
  tasks: Array,
  items: Array,
  selectedTaskId: Number,
  selectedTaskName: String,
});

const newCategoryValue = ref("");

const submittedCategoryValue = ref("");

const addTaskBtn = ref(false);

const newTaskValue = ref("");
const subbmittedNewTaskValue = ref("");

const isFocused = ref(false);
const focusedPlaceholder = "";

const emit = defineEmits([
  "showTaskTextByListId",
  "showCategoryNameByClick",
  "updateCategoryTitle",
  "updateTaskList",
  "resolvedTask",
]);

const taskCategoryPlaceholder = computed(() => {
  return isFocused.value ? focusedPlaceholder : props.selectedTaskName;
});

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  newCategoryValue.value = "";
};

const showAddTaskBtn = () => {
  addTaskBtn.value = false;
};

const submitCategoryValue = () => {
  submittedCategoryValue.value = newCategoryValue.value;
};

const handleCategoryInputMethods = () => {
  submitCategoryValue();
  changeCategoryName(submittedCategoryValue.value);
};

const changeCategoryName = async (submittedCategoryValue) => {
  try {
    const obj = {
      title: submittedCategoryValue,
    };
    const categoryName = props.items.find(
      (item) => item.title === props.selectedTaskName
    );
    if (categoryName) {
      await axios.patch(
        `https://f39e7214ce616ae7.mokky.dev/list/${categoryName.id}`,
        obj
      );
    }

    emit("updateCategoryTitle");
    newCategoryValue.value = "";

    if (newCategoryValue.value) {
      taskCategoryNameInput.value.blur();
    }
  } catch (err) {
    console.log(err);
  }
};

const submitTaskValue = () => {
  subbmittedNewTaskValue.value = newTaskValue.value;
};
const handleMethodsByAddBtn = () => {
  showAddTaskBtn();
  submitTaskValue();
  addNewTask(subbmittedNewTaskValue.value);
};
const handleMethodsAbortBtn = () => {
  showAddTaskBtn();
  submitTaskValue();
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
    emit("updateTaskList");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="main-page__content">
    <div class="main-page__header">
      <div>
        <input
          ref="taskCategoryNameInput"
          class="main-page__content-title"
          v-model="newCategoryValue"
          type="text"
          :placeholder="taskCategoryPlaceholder"
          @keydown.enter="handleCategoryInputMethods"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div>
        <img src="../assets/img/pencil.svg" alt="" />
      </div>
    </div>
    <div class="main-page__tasks">
      <Task
        v-for="task in tasks"
        :key="task.listId"
        :text="task.text"
        :listId="task.listId"
        :selectedTaskId="selectedTaskId"
        @resolvedTask="removeResolvedTask"
      />
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
.main-page__content-title {
  font-family: $headFontStyle;
  color: #000;
  font-size: 1.8rem;
  max-width: 280px;
  margin-top: 16px;
  margin-bottom: 10px;
  padding-right: 20px;
  outline: none;
  border: none;
  background: transparent;
  border-bottom: none;
}
.main-page__header {
  display: flex;
  align-items: baseline;
  max-width: 280px;
  border-bottom: #767676 1px solid;
  margin-bottom: 40px;
}
.main-page__header input {
  cursor: pointer;
}

.main-page__header div {
  margin-top: 38px;
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
