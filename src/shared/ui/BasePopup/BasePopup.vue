<script setup lang="ts">
import { IconClose } from "@/shared/ui";
import { vOnClickOutside } from "@vueuse/components";

const { message } = defineProps<{
  message: string;
}>();

const emits = defineEmits<{
  (e: "closePopup"): void;
}>();

const closePopup = () => {
  emits("closePopup");
};
</script>

<template>
  <div class="popup-overlay">
    <div class="popup-content" v-on-click-outside="closePopup">
      <IconClose class="close-icon" @click="closePopup" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-content {
  position: relative;
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.close-icon {
  position: absolute;
  top: 0px;
  right: 5px;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
}
</style>
