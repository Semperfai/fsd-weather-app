<script setup lang="ts">
import { BaseContainer } from "@/shared/ui";
</script>
<template>
  <div class="default--layout">
    <BaseContainer>
      <nav class="navigation">
        <slot name="navigation" />
      </nav>
      <main class="page">
        <slot name="page" />
      </main>
    </BaseContainer>
  </div>
</template>

<style scoped>
.default--layout {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px 0;
  background-color: #59585d;
}

.navigation {
  align-self: flex-start;
}

.page {
  min-height: 50rem;
}
</style>
