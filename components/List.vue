<script setup>
import axios from "axios";
import { watch, onMounted } from "vue";

const items = ref([]);

const props = defineProps({
  title: String,
});

const fetchList = async () => {
  try {
    const { data } = await axios.get("https://f39e7214ce616ae7.mokky.dev/list");

    items.value = data.map((obj) => ({
      ...obj,
    }));
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await fetchList();
});
</script>

<template>
  <div class="list__title">
    {{ title }}
  </div>
</template>

<style lang="scss" scoped>
.list__title {
  font-size: 1.125 rem;
  color: #000;
  font-family: $baseFontStyle;
}
</style>

<!--ВАЛИДАЦИЯ ЗАДАЧ И СПИСКОВ ПО ListId-->
