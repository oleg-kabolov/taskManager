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
<<<<<<< HEAD
  <div class="list__title" @click="handleClick">
    {{ title }}
  </div>
=======
  <li class="list__title" @click="handleClick">
    <span>{{ title }}</span>
  </li>
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
</template>

<style lang="scss" scoped>
.list__title {
<<<<<<< HEAD
  font-size: 1.125 rem;
=======
  font-size: 0.8 rem;
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
  color: #000;
  font-family: $baseFontStyle;
}
.list__title:hover {
  cursor: pointer;
}
<<<<<<< HEAD
</style>

<!--нужно разобраться как апдейтить ref в родительском компоненте по клику в дочернем связка task.vue => index.vue-->

const props = defineProps({ title: String, listId: Number, }); const handleClick
= () => { emit("showTaskTextByListId", props.listId); }; defineProps({ title:
String, listId: Number, }); const handleClick = () => {
emit("showTaskTextByListId", listId); };
=======
.list__title > span {
  word-break: break-all;
}
</style>

<!--нужно разобраться как апдейтить ref в родительском компоненте по клику в дочернем связка task.vue => index.vue-->
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
