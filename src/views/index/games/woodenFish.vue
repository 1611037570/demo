<template>
  <!-- 木鱼容器 -->
  <div class="fixed bottom-12 left-12 z-20" @mousedown="knockWoodenFish" @mouseup="resetKnocking">
    <!-- 木鱼图标 -->
    <div
      class="transform -translate-y-1/2 w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ease-out"
      :class="isKnocking ? 'scale-95 bg-amber-600' : 'bg-amber-700'"
    >
      <Icon
        icon="mdi:fish"
        class="w-10 h-10 text-amber-100"
        :class="isKnocking ? 'animate-pulse' : ''"
      />
    </div>

    <!-- 木鱼棒 -->
    <div
      class="absolute -top-2 left-8 w-15 h-4 bg-amber-800 rounded-full flex items-center justify-center transition-all duration-100"
      :style="{ rotate: isKnocking ? '0deg' : '40deg' }"
    >
      <div class="w-12 h-1 bg-amber-600 rounded-full"></div>
      <div
        class="rounded-full w-6 h-6 bg-amber-900 absolute top-1/2 -translate-y-1/2 -left-2"
      ></div>
    </div>

    <!-- 计数器 -->
    <div class="absolute left-1/2 -translate-x-1/2 bottom-0 w-auto whitespace-nowrap">
      功德：{{ fish.count }}
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 从游戏状态存储中获取功德计数器
const gameStore = useGameStore()
const { fish } = storeToRefs(gameStore)

// 敲击状态
const isKnocking = ref(false)

// 敲击木鱼函数
function knockWoodenFish() {
  // 增加计数
  fish.value.count++

  // 设置敲击状态为true
  isKnocking.value = true
}

// 重置敲击状态函数
function resetKnocking() {
  isKnocking.value = false
}
</script>

<style scoped>
/* 木鱼敲击动画 */
@keyframes knock {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

/* 增加点击反馈 */
.cursor-pointer {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.cursor-pointer:active {
  transform: scale(0.98);
}
</style>
