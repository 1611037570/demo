<template>
  <div
    class="w-20 h-20 cursor-pointer group rounded-lg bg-white/80 backdrop-blur-md transition-all duration-300"
    @click="switchTab"
  >
    <!-- 多彩3x3圆点网格 -->
    <div class="grid grid-cols-3 gap-0.5 h-full w-full place-items-center p-2">
      <div class="w-4 h-4 rounded-sm bg-red-500"></div>
      <div class="w-4 h-4 rounded-sm bg-orange-500"></div>
      <div class="w-4 h-4 rounded-sm bg-yellow-500"></div>
      <div class="w-4 h-4 rounded-sm bg-green-500"></div>
      <div class="w-4 h-4 rounded-sm bg-blue-500"></div>
      <div class="w-4 h-4 rounded-sm bg-indigo-500"></div>
      <div class="w-4 h-4 rounded-sm bg-purple-500"></div>
      <div class="w-4 h-4 rounded-sm bg-teal-500"></div>
      <div class="w-4 h-4 rounded-sm bg-pink-500"></div>
    </div>
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
const { switchTab } = useIndexStore()
</script>

<style scoped></style>
