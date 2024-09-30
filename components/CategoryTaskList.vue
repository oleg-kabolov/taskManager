<script setup>
import SvgCircle from "./UI/SvgCircle.vue";

const props = defineProps({
  title: String,
  listId: Number,
  color: String,
  selectedTaskId: Number,
  selectedColor: String,
});

const handleTaskText = () => {
  emit("showTaskTextByListId", props.listId);
};

const handleCategoryName = () => {
  emit("showCategoryNameByClick", props.title);
};

const clickEvents = () => {
  handleTaskText();
  handleCategoryName();
};

const emit = defineEmits([
  "showTaskTextByListId",
  "showCategoryNameByClick",
  "deleteCategory",
]);
</script>

<template>
  <li class="list__title" @click="clickEvents">
    <SvgCircle
      width="12"
      height="12"
      cx="12"
      cy="12"
      r="12"
      :color="color"
      class="circle"
    />

    <span>{{ title }}</span>
    <span class="list__title_deleteBtn" @click="$emit('deleteCategory')"
      >X</span
    >
  </li>
</template>

<style lang="scss" scoped>
.list__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.125 rem;
  font-size: 0.8 rem;
  color: #000;
  font-family: $baseFontStyle;
}
.list__title:hover {
  cursor: pointer;
}
.list__title:hover {
  cursor: pointer;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}

.list__title > span {
  word-break: break-word;
}
.list__title_deleteBtn {
  color: #e3e3e3;
  font-size: 1rem;
  transition: 0.5s;
  margin-left: auto;
}
.list__title_deleteBtn:hover {
  color: #e3e3e3;
  color: #000;
}
.circle {
  margin-right: 15px;
}
</style>
