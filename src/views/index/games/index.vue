<template>
  <!-- 容器 - 固定定位 -->
  <div
    class="fixed bottom-12 left-12 cursor-pointer"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 背景扩宽元素 - 位于底层 -->
    <div
      class="absolute inset-0 bg-pink-300 rounded-xl transition-all duration-300 ease-out"
      :style="{ width: isHovered ? '200px' : '48px', zIndex: 1 }"
    ></div>

    <!-- 原始固定大小的元素 - 位于上层 -->
    <div class="w-12 h-12 flex items-center justify-center text-white z-20 relative">更多</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 控制悬停状态的响应式变量
const isHovered = ref(false)
</script>

<style scoped>
/* 背景元素过渡效果增强 */
.absolute.inset-0 {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
