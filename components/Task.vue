<script setup>
const markResolvedTask = ref(false);

defineProps({
  text: String,
  listId: Number,
  selectedTaskId: Number,
});

const emit = defineEmits(["resolvedTask"]);

const crossedMarkedTask = () => {
  markResolvedTask.value = !markResolvedTask.value;
  emit("resolvedTask");
};
const markResolvedTaskClass = computed(() => {
  if (markResolvedTask.value) {
    return "crossed-out";
  } else {
    return "";
  }
});
</script>

<template>
  <div
    v-if="listId === selectedTaskId && listId !== null"
    class="task-description"
  >
    <label class="checkbox-container">
      <input @click="crossedMarkedTask" type="checkbox" />
      <span class="checkmark"></span>
      <span :class="markResolvedTaskClass">{{ text }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.task-description {
  margin-bottom: 10px;
}
.task-description span {
  display: inline-block;
  font-family: $baseFontStyle;
  word-break: break-word;
  font-size: 1.125rem;
  font-weight: 700;
}
.task-description span::first-letter {
  text-transform: capitalize;
}
.checkbox-container {
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 20px;
  height: 20px;
  background-color: #34c759;
  border-radius: 50%;
  position: relative;
}

.checkbox-container input:checked ~ .checkmark::after {
  content: "";
  position: absolute;
  display: block;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.crossed-out {
  text-decoration: line-through;
}
</style>
