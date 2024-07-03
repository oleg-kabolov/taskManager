<script setup>
const props = defineProps({
  title: String,
  listId: Number,
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

const emit = defineEmits(["showTaskTextByListId", "showCategoryNameByClick"]);
</script>

<template>
  <li class="list__title" @click="clickEvents">
    <span>{{ title }}</span>
  </li>
</template>

<style lang="scss" scoped>
.list__title {
  font-size: 1.125 rem;
  font-size: 0.8 rem;
  color: #000;
  font-family: $baseFontStyle;
}
.list__title:hover {
  cursor: pointer;
}
.list__title > span {
  word-break: break-word;
}
</style>
