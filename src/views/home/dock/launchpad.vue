<template>
  <div
    class="w-10 h-10 cursor-pointer group rounded-lg bg-white/80 backdrop-blur-md transition-all duration-200"
    @click="switchTab"
  >
    <!-- 多彩3x3圆点网格 -->
    <div class="grid grid-cols-3 gap-0.5 h-full w-full place-items-center p-1.5">
      <div class="w-2 h-2 rounded-[2px] bg-red-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-orange-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-yellow-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-green-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-blue-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-indigo-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-purple-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-teal-500"></div>
      <div class="w-2 h-2 rounded-[2px] bg-pink-500"></div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from '@/stores/home'
const { switchTab } = useHomeStore()
</script>

<style scoped></style>
