<script setup lang="ts"></script>
<template>
  <div class="container">
    <div class="wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 3%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #0e100f;
  border-radius: 25px;
}
</style>
