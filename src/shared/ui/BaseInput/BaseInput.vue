<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { type IProps } from "./types";

const emits = defineEmits<{
  (e: "update:input", v: string): void;
  (e: "on-focus", v: boolean): void;
}>();
const props = defineProps<IProps>();
const { input, placeholder, inputType, max } = toRefs(props);
const isFocused = ref<boolean>(false);

const inputComputed = computed({
  get: () => input.value,
  set: (value) => {
    emits("update:input", value);
  },
});

const focusHandler = () => {
  isFocused.value = true;
  emits("on-focus", isFocused.value);
};

const blurHandler = () => {
  isFocused.value = false;
  emits("on-focus", isFocused.value);
};
</script>
<template>
  <div class="container">
    <label class="label">
      {{ label }}
      <input
        :type="inputType"
        :maxlength="max"
        :placeholder="placeholder"
        @focus="focusHandler"
        @blur="blurHandler"
        :class="[isFocused ? 'input--focus' : '']"
        class="input"
        v-model="inputComputed"
        @input="method"
      />
      <component class="icon" :is="icon"></component>
    </label>
  </div>
</template>

<style scoped>
.label {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input {
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 3rem;
  font-family: "Inter", Arial, sans-serif;
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.1s linear;
}
.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.container {
  flex: 0 1 70%;
  height: 100%;
  padding: 16px;
  background: url("@/assets/img/gradient-1.jpg") no-repeat 50% 50%;
  background-size: cover;
  border-radius: 25px;
}

.input--focus {
  outline: 1px solid #fff;
  box-shadow: 0 0 10px #fff;
}
</style>
