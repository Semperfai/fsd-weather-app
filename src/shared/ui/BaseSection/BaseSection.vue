<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(defineProps<Partial<{ align: string }>>(), {
  align: "row",
});

const flexDirection = computed(() => {
  return `${props.align}`;
});
</script>
<template>
  <section class="section">
    <slot />
  </section>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: v-bind(flexDirection);
  gap: 20px;
  place-items: start;
  justify-content: space-between;
  width: 100%;
}
</style>
