<script setup>
import Sidebar from "../components/Sidebar.vue";
import Content from "../components/Content.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const items = ref([]);
const tasks = ref([]);

const selectedTaskId = ref(null);
const selectedTaskName = ref("");

const emit = defineEmits(["refreshItems", "showAllTasks"]);

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
    let found = false;
    tasks.value.forEach((task) => {
      if (task.listId === id) {
        items.value.forEach((category) => {
          if (category.listId === task.listId) {
            found = true;
            selectedTaskId.value = id;
          }
        });
      }
    });
    if (!found) {
      selectedTaskId.value = id;
    }
  } catch (err) {
    console.log(err);
  }
};

const removeCategoryAndRelatedTasks = async () => {
  try {
    const listId = selectedTaskId.value;
    if (!listId) {
      console.log("selectedTaskId is null or undefined");
      return;
    }
    const obj = {
      listId: selectedTaskId.value,
    };
    await showTaskTextByListId(listId);

    const taskListId = tasks.value.find((item) => item.listId === listId);
    const categoryListId = items.value.find((item) => item.listId === listId);

    if (taskListId) {
      await axios.delete(
        `https://f39e7214ce616ae7.mokky.dev/tasks/${taskListId.id}`,
        obj
      );
    }

    if (categoryListId) {
      await axios.delete(
        `https://f39e7214ce616ae7.mokky.dev/list/${categoryListId.id}`,
        obj
      );
    }

    refreshAll();
  } catch (err) {
    console.log(err);
    console.log(selectedTaskId.value);
  }
};

const showCategoryNameByClick = (title) => {
  try {
    selectedTaskName.value = title;
  } catch (err) {
    console.log(err);
  }
};

const updateFetchList = async () => {
  await fetchList();
};
const updateTaskList = async () => {
  await fetchTasks();
};

const refreshAll = async () => {
  await fetchList();
  await fetchTasks();
};

onMounted(async () => {
  await fetchList();
  await fetchTasks();
});
</script>

<template>
  <div class="main-page">
    <Sidebar
      :items="items"
      :tasks="tasks"
      @showTaskTextByListId="showTaskTextByListId"
      @refreshItems="updateFetchList"
      @showCategoryNameByClick="showCategoryNameByClick"
      :selectedTaskId="selectedTaskId"
      @deleteCategory="removeCategoryAndRelatedTasks"
    />
    <Content
      :tasks="tasks"
      :items="items"
      :selectedTaskId="selectedTaskId"
      :selectedTaskName="selectedTaskName"
      @updateCategoryTitle="updateFetchList"
      @refreshItems="refreshAll"
      @updateTaskList="updateTaskList"
      @deleteCategory="removeCategoryAndRelatedTasks"
    />
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  display: flex;
  margin: 0 auto;
  margin-top: 150px;
  max-width: 750px;
  height: 530px;
}
body {
  background-color: #e5e5e5;
}
</style>
