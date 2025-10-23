<template>
  <div
    class="w-10 h-10 cursor-pointer group rounded-lg bg-white/80 backdrop-blur-md transition-all duration-200 hover:scale-105"
    @click="switchTab"
  >
    <!-- 多彩3x3圆点网格 -->
    <div class="grid grid-cols-3 gap-0.5 h-full w-full place-items-center p-1.5">
      <div class="w-1.5 h-1.5 bg-red-500"></div>
      <div class="w-1.5 h-1.5 bg-orange-500"></div>
      <div class="w-1.5 h-1.5 bg-yellow-500"></div>
      <div class="w-1.5 h-1.5 bg-green-500"></div>
      <div class="w-1.5 h-1.5 bg-blue-500"></div>
      <div class="w-1.5 h-1.5 bg-indigo-500"></div>
      <div class="w-1.5 h-1.5 bg-purple-500"></div>
      <div class="w-1.5 h-1.5 bg-teal-500"></div>
      <div class="w-1.5 h-1.5 bg-pink-500"></div>
    </div>
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
const { switchTab } = useIndexStore()
</script>

<style scoped></style>
