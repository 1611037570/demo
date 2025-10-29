<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50">
    <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
    <p class="mt-4 font-medium text-blue-600">正在加载中...</p>
  </div>
</template>

<script setup></script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
