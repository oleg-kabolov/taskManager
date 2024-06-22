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
  <div class="list__title" @click="handleClick">
    {{ title }}
  </div>
</template>

<style lang="scss" scoped>
.list__title {
  font-size: 1.125 rem;
  color: #000;
  font-family: $baseFontStyle;
}
.list__title:hover {
  cursor: pointer;
}
</style>

<!--нужно разобраться как апдейтить ref в родительском компоненте по клику в дочернем связка task.vue => index.vue-->

const props = defineProps({ title: String, listId: Number, }); const handleClick
= () => { emit("showTaskTextByListId", props.listId); }; defineProps({ title:
String, listId: Number, }); const handleClick = () => {
emit("showTaskTextByListId", listId); };
