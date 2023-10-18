<template>
  <svg class="animated-spin" fill="none" viewBox="0 0 24 24">
    <circle
      class="circle"
      cx="12"
      cy="12"
      r="10"
      stroke="black"
      stroke-width="4"
    />
    <path
      class="path"
      fill="white"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
</template>

<style scoped>
.animated-spin {
  align-self: center;
  animation: spin 2s linear infinite;
  height: 3rem;
  width: 3rem;
  color: white;
}

.circle {
  opacity: 0.75;
}

.path {
  opacity: 0.25;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
