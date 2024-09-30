<script setup>
import { ref } from "vue";

const selectedColor = ref("");
const colors = [
  "#C9D1D3",
  "#00c4cc",
  "#ff5b77",
  "#d2e603",
  "#73e2a7",
  "#a478ff",
  "#000000",
  "#ff0000",
];

const props = defineProps({
  handleInputMethods: Function,
  newTaskValue: String,
});

const emit = defineEmits(["selectColor"]);

const selectColor = (color) => {
  selectedColor.value = color;
  emit("selectColor", selectedColor.value);
};

const addFolder = () => {
  if (props.newTaskValue && selectedColor.value) {
    console.log("Добавлено:", props.newTaskValue, selectedColor.value);

    selectedColor.value = "";
  } else {
    alert("Введите название папки и выберите цвет");
  }
};
const handleFolder = () => {
  if (props.newTaskValue && selectedColor.value) {
    addFolder();
    props.handleInputMethods();
  } else {
    alert("Введите название папки и выберите цвет");
  }
};

const closeModal = () => {
  console.log("Модальное окно закрыто");
};
</script>

<template>
  <div class="color-picker-modal">
    <div class="modal-header">
      <slot name="sidebar-input" class="modal-input" />
    </div>
    <div class="color-picker">
      <span
        v-for="(color, index) in colors"
        :key="index"
        :style="`background-color: ${color}`"
        class="color-circle"
        @click="selectColor(color)"
        :class="{ selected: selectedColor === color }"
      />
    </div>
    <button class="add-button" @click="handleFolder">Добавить</button>
  </div>
</template>

<style scoped>
.color-picker-modal {
  background-color: #fff;
  box-shadow: -3px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-width: 235px;
  position: absolute;
  top: 40px;
  left: 40px;
}
.folder-modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 200px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0px 14px;
}

.color-picker {
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
  padding: 0px 18px;
}

.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-circle.selected {
  border-color: #525252;
}

.add-button {
  padding: 8px 68px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 16px;
}

.add-button:hover {
  background-color: #45a049;
}
</style>
