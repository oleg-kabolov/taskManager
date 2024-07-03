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

const isFocused = ref(false);
const focusedPlaceholder = "Введите название категории";

const emit = defineEmits([
  "showTaskTextByListId",
  "showCategoryNameByClick",
  "updateCategoryTitle",
]);

const computedPlaceholder = computed(() => {
  return isFocused.value ? focusedPlaceholder : props.selectedTaskName;
});

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

const submitValue = () => {
  submittedCategoryValue.value = newCategoryValue.value;
};

const handleInputMethods = () => {
  submitValue();
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
          :placeholder="computedPlaceholder"
          @keydown.enter="handleInputMethods"
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
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

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
  font-size: 2.7rem;
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
  align-items: normal;
  border-bottom: #767676 1px solid;
  margin-bottom: 40px;
}

.main-page__header div {
  margin-top: 38px;
  cursor: pointer;
}
// цвет хедера папки должен меняться по выбранной категории
</style>
