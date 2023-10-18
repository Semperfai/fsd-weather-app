<script lang="ts" setup>
const menu = [
  {
    to: "/",
    text: "Головна",
  },
  {
    to: "/favorites",
    text: "Обране",
  },
];
</script>

<template>
  <div class="items">
    <router-link v-for="{ to, text } in menu" :to="to" :key="to" class="item">
      {{ $t(`${text}`) }}
    </router-link>
  </div>
</template>

<style scoped>
.items {
  position: relative;
  display: flex;
  gap: 0.75rem;
  padding: 2em 0;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  border-radius: 1rem;
  flex-shrink: 0;
  transition: all 200ms linear;
}

.item:hover {
  background-color: rgb(126, 121, 121, 0.5);
}

.router-link-active {
  background-color: grey;
  color: aliceblue;
}
</style>
