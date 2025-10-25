<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    <p class="mt-4 text-blue-600 font-medium">正在加载中...</p>
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
