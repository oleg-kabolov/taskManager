<script setup>
const props = defineProps({
  title: String,
  listId: Number,
});

const handleClick = () => {
  emit("showTaskTextByListId", props.listId);
};

const emit = defineEmits(["showTaskTextByListId"]);
</script>

<template>
  <li class="list__title" @click="handleClick">
    <span>{{ title }}</span>
  </li>
</template>

<style lang="scss" scoped>
.list__title {
  font-size: 0.8 rem;
  color: #000;
  font-family: $baseFontStyle;
}
.list__title:hover {
  cursor: pointer;
}
.list__title > span {
  word-break: break-all;
}
</style>

<!--нужно разобраться как апдейтить ref в родительском компоненте по клику в дочернем связка task.vue => index.vue-->
