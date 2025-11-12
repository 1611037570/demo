<template>
  <div
    class="group h-10 w-10 rounded-lg bg-white/80 backdrop-blur-md cursor-pointer transition-all duration-200"
    @click="switchTab"
  >
    <!-- 多彩3x3圆点网格 -->
    <div class="gap-0.5 p-1.5 grid h-full w-full grid-cols-3 place-items-center">
      <div class="h-2 w-2 bg-red-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-orange-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-yellow-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-green-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-blue-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-indigo-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-purple-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-teal-500 rounded-[2px]"></div>
      <div class="h-2 w-2 bg-pink-500 rounded-[2px]"></div>
      <div
        v-if="tabIndex === 1"
        class="h-1 w-1 absolute -bottom-[7px] left-1/2 -translate-x-1/2 rounded-[2px] bg-sf-primary"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from '@/stores'
const homeStore = useHomeStore()
const { switchTab } = homeStore
const { tabIndex } = storeToRefs(homeStore)
</script>

<style scoped></style>
