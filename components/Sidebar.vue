<script setup>
import axios from "axios";
import { ref } from "vue";
import CategoryTaskList from "/components/CategoryTaskList.vue";
import ColorPicker from "/components/UI/ColorPicker.vue";

const props = defineProps({
  items: Array,
  tasks: Array,
  selectedTaskId: Number,
});

const taskListOpen = ref(false);

const newTaskValue = ref("");

const submittedNewTask = ref("");

const inputPlaceholder = ref("Название папки");

const addTaskInput = ref(null);

const openCategoryForm = ref(false);

const showTasks = ref(false);

const recievedColor = ref("");

const emit = defineEmits([
  "refreshItems",
  "showTaskTextByListId",
  "showCategoryNameByClick",
  "deleteCategory",
  "handleFoldercolor",
  "showAllTasks",
  "selectColor",
]);

const addCategoryTask = async (submittedNewTask) => {
  try {
    const obj = {
      id: props.items.length + 1,
      title: submittedNewTask,
      listId: props.items.length + 1,
      color: recievedColor.value,
    };
    const defaultTask = {
      id: props.tasks.length + 1,
      listId: props.items.length + 1,
      text: "Новая задача",
      color: recievedColor.value,
    };
    const existingItem = props.items.find(
      (item) => item.title === submittedNewTask
    );
    if (existingItem) {
      alert("Такая категория уже существует придумайте другое название!");
    } else {
      await axios.post("https://f39e7214ce616ae7.mokky.dev/list", obj);
      await axios.post("https://f39e7214ce616ae7.mokky.dev/tasks", defaultTask);
    }
    newTaskValue.value = "";
    console.log(props.items.length);

    if (newTaskValue.value) {
      addTaskInput.value.blur();
    }

    emit("refreshItems");
    addPlaceholder();
  } catch (err) {
    console.log(err);
  }
};

const showAllTasks = () => {
  showTasks.value = !showTasks.value;
  emit("showAllTasks", showTasks.value);
};

const submitValue = () => {
  submittedNewTask.value = newTaskValue.value;
};

const handleInputMethods = () => {
  submitValue();
  addCategoryTask(submittedNewTask.value);
  openCategoryFormMethod();
  emit("refreshItems");
};

const removePlaceholder = () => {
  inputPlaceholder.value = "";
};
const addPlaceholder = () => {
  inputPlaceholder.value = "+  Добавить папку";
  newTaskValue.value = "";
};

const openCategoryFormMethod = () => {
  openCategoryForm.value = !openCategoryForm.value;
};

const handleSelectedColorValue = (value) => {
  recievedColor.value = value;
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__list">
      <div class="sidebar__list-title">
        <h2 @click="showAllTasks"><span>Все задачи</span></h2>
        <ul class="dropdown-list">
          <CategoryTaskList
            v-for="item in items"
            :key="item.id"
            :title="item.title"
            :listId="item.listId"
            :color="item.color"
            :selectedTaskId="selectedTaskId"
            :class="
              props.selectedTaskId === item.listId ? `list__title_active` : ``
            "
            @showTaskTextByListId="$emit('showTaskTextByListId', $event)"
            @showCategoryNameByClick="$emit('showCategoryNameByClick', $event)"
            @deleteCategory="$emit('deleteCategory', $event)"
          />
        </ul>
      </div>
    </div>
    <div class="add-task-btn">
      <div class="add-task-buttons">
        <span class="add-task-btn__text" @click="openCategoryFormMethod"
          ><span class="add-task-btn__plus">+</span>Добавить папку</span
        >
      </div>

      <ColorPicker
        v-if="openCategoryForm"
        :handleInputMethods="handleInputMethods"
        :newTaskValue="newTaskValue"
        @selectColor="handleSelectedColorValue"
      >
        <template v-slot:sidebar-input>
          <input
            ref="addTaskInput"
            v-model="newTaskValue"
            @keydown.enter="handleInputMethods"
            type="text"
            :placeholder="inputPlaceholder"
            class="modal-input"
          />
          <span class="close-button" @click="openCategoryFormMethod"
            ><img src="../assets/img/cross.svg" alt=""
          /></span>
        </template>
      </ColorPicker>
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
.sidebar__list-title {
  padding: 10px;
}
.sidebar__list-title h2 {
  position: relative;
  padding-left: 38px;
  font-family: $headFontStyle;
  font-weight: 400;
  font-size: 1.125rem;
  margin: 10px 0px;
}
.sidebar__list-title h2:hover {
  cursor: pointer;
}
.sidebar__list-title h2 > span::before {
  content: "";
  background-image: url("../assets/img/entypo-list.svg");
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 7px;
  top: 1px;
}
.sidebar__list-title {
  list-style-type: none;
  padding-left: 30px;
  margin: 0;
  border-top: none;
}
.sidebar__list-title li {
  padding: 10px;
}
.sidebar__list-title li:last-child {
  border-bottom: none;
}
.add-task-btn {
  position: relative;
  display: flex;
  flex-direction: column;
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
  max-width: 180px;
  font-size: 1.3rem;
  cursor: pointer;
  outline: none;
  background-color: transparent;
}
.add-task-btn > input:active,
input:focus {
  border-bottom: 1px solid #767676;
}
.list__title_active {
  background: #fff;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}
.add-task-btn__text {
  display: flex;
  align-items: center;
  font-family: "Lato", sans-serif;
  font-size: 1.5rem;
  color: #9c9c9c;
}
.add-task-btn__plus {
  font-size: 1.9rem;
  color: #9c9c9c;
  margin-right: 10px;
}
.modal-input {
  min-width: 185px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.close-button {
  cursor: pointer;
  font-size: 18px;
  color: #888;
  margin-left: 8px;
  position: absolute;
  top: -8px;
  right: -8px;
}

.close-button:hover {
  color: #555;
}
</style>
