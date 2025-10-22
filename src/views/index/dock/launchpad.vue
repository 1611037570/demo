<template>
  <div
    class="w-12 h-12 cursor-pointer group rounded-lg bg-white/80 backdrop-blur-md transition-all duration-200"
    @click="switchTab"
  >
    <!-- 多彩3x3圆点网格 -->
    <div class="grid grid-cols-3 gap-0.5 h-full w-full place-items-center p-2">
      <div class="w-2 h-2 bg-red-500"></div>
      <div class="w-2 h-2 bg-orange-500"></div>
      <div class="w-2 h-2 bg-yellow-500"></div>
      <div class="w-2 h-2 bg-green-500"></div>
      <div class="w-2 h-2 bg-blue-500"></div>
      <div class="w-2 h-2 bg-indigo-500"></div>
      <div class="w-2 h-2 bg-purple-500"></div>
      <div class="w-2 h-2 bg-teal-500"></div>
      <div class="w-2 h-2 bg-pink-500"></div>
    </div>
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
const { switchTab } = useIndexStore()
</script>

<style scoped></style>
