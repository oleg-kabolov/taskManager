<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const props = defineProps({
  text: String,
  tasks: Array,
  items: Array,
  listId: Number,
  color: String,
  selectedTaskId: Number,
  selectedTaskName: String,
});

const emit = defineEmits([
  "updateCategoryTitle",
  "updateTaskList",
  "refreshItems",
]);

const newCategoryValue = ref("");

const submittedCategoryValue = ref("");

const newTaskValue = ref("");
const subbmittedNewTaskValue = ref("");

const isFocused = ref(false);
const focusedPlaceholder = "";

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

const submitCategoryValue = () => {
  submittedCategoryValue.value = newCategoryValue.value;
};

const handleCategoryInputMethods = () => {
  submitCategoryValue();
  changeCategoryName(submittedCategoryValue.value);
  emit("updateCategoryTitle");
};

const changeCategoryName = async (submittedCategoryValue) => {
  try {
    const obj = {
      title: submittedCategoryValue,
    };
    const categoryName = props.items.find(
      (item) => item.title === props.selectedTaskName
    );
    if (categoryName && props.selectedTaskId) {
      await axios.patch(
        `https://f39e7214ce616ae7.mokky.dev/list/${categoryName.id}`,
        obj
      );
    } else {
      alert("Выберите или создайте категорию для изменения названия");
    }

    emit("updateCategoryTitle");
    emit("updateTaskList");

    newCategoryValue.value = "";

    if (newCategoryValue.value) {
      taskCategoryNameInput.value.blur();
    }
  } catch (err) {
    console.log(err);
  }
  emit("refreshItems");
};
</script>

<template>
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
</template>

<style lang="scss" scoped>
.main-page__content-title {
  font-family: $headFontStyle;
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
  outline: none;
  border: none;
}

.main-page__header div {
  margin-top: 38px;
}
.main-page__header img {
  width: 15px;
  height: 15px;
}
</style>
