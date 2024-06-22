<script setup>
import Sidebar from "../components/Sidebar.vue";
import Content from "../components/Content.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const items = ref([]);
const tasks = ref([]);

const taskListId = ref(false);

const selectedTaskId = ref(null);

const fetchList = async () => {
  try {
    const { data } = await axios.get("https://f39e7214ce616ae7.mokky.dev/list");
    items.value = data.map((obj) => obj);
  } catch (err) {
    console.log(err);
  }
};

const fetchTasks = async () => {
  try {
    const { data } = await axios.get(
      "https://f39e7214ce616ae7.mokky.dev/tasks"
    );
    tasks.value = data.map((obj) => obj);
  } catch (err) {
    console.log(err);
  }
};

const showTaskTextByListId = (id) => {
  try {
    tasks.value.forEach((item) => {
      if (item.listId === id) {
        selectedTaskId.value = id;
      }
    });
  } catch (err) {
    console.log(err);
  }

  console.log(taskListId);
};

onMounted(async () => {
  await fetchList();
  await fetchTasks();
});
</script>

<template>
<<<<<<< HEAD
  <div>
=======
  <div class="main-page">
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
    <Sidebar :items="items" @showTaskTextByListId="showTaskTextByListId" />
    <Content :tasks="tasks" :selectedTaskId="selectedTaskId" />
  </div>
</template>

<<<<<<< HEAD
<style lang="scss" scoped></style>
=======
<style lang="scss" scoped>
.main-page {
  display: flex;
  margin: 0 auto;
  margin-top: 150px;
  max-width: 750px;
  height: 530px;
  background-color: #2a69a8;
  border: 2px solid red;
}
</style>
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
