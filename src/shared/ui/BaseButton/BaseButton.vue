<script setup lang="ts">
import { type IProps } from "./types";

withDefaults(defineProps<Partial<IProps>>(), {
  variant: "primary",
  to: "#",
});
defineEmits(["click"]);
</script>
<template>
  <router-link
    v-if="link"
    :to="to"
    class="base-link"
    :class="'base-link--' + variant"
  >
    <component
      :class="['base-icon', 'base-icon--' + variant]"
      :is="icon"
    ></component>
    <span class="base-text" :class="'base-text--' + variant">{{
      $t(`${text}`)
    }}</span>
  </router-link>
  <button
    v-else
    :disabled="disabled"
    @click="method"
    class="base-button"
    :class="'base-button--' + variant"
  >
    <component
      :class="['base-icon', 'base-icon--' + variant]"
      :is="icon"
    ></component>
    <span class="base-text" :class="'base-text--' + variant">{{
      $t(`${text}`)
    }}</span>
  </button>
</template>

<style scoped>
.base-link,
.base-button {
  display: flex;
  max-width: max-content;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5em 1em;
  border-radius: 2em;
  transition: color 0.2s;
}

.base-button--primary,
.base-link--primary {
  gap: 0.5rem;
  background-color: rgb(80, 80, 118);
  transition: all 200ms linear;
}

.base-button--primary:hover {
  background-color: rgb(23, 103, 150);
}
.base-link--primary:hover {
  background-color: rgb(80, 80, 118);
}

.base-button--secondary,
.base-link--secondar {
  background-color: rgb(37, 37, 76);
  transition: all 200ms linear;
}
.base-button--secondary:hover {
  background-color: rgb(23, 103, 150);
}
.base-link--secondary:hover {
  background-color: rgb(80, 80, 118);
}

.base-button--secondary,
.base-link--secondar {
  background-color: rgb(37, 37, 76);
  transition: all 200ms linear;
}

.base-text {
  font-size: 1rem;
  white-space: nowrap;
}

.base-icon {
  width: 1rem;
  height: 1rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.base-icon--primary {
  color: white;
}

.base-icon--secondary {
  color: blue;
}

.base-text--primary {
  color: white;
}

.base-text--secondary {
  color: orange;
}

.base-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
