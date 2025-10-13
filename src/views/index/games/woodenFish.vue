<template>
  <!-- 木鱼图标 -->
  <div
    @click="knockWoodenFish"
    class="fixed bottom-12 left-12 z-20 transform -translate-y-1/2 w-12 h-12 bg-amber-700 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ease-out"
    :class="isKnocking ? 'scale-95 bg-amber-600' : ''"
  >
    <Icon
      icon="mdi:fish"
      class="w-10 h-10 text-amber-100"
      :class="isKnocking ? 'animate-pulse' : ''"
    />
    <!-- 木鱼棒 -->
    <div
      class="absolute top-1/2 left-8 transform -translate-y-1/2 w-20 h-6 bg-amber-800 rounded-full flex items-center justify-center"
      :style="{ rotate: isKnocking ? '20deg' : '0deg' }"
    >
      <div class="w-14 h-2 bg-amber-600 rounded-full"></div>
    </div>
    <div class="absolute left-1/2 -translate-x-1/2 -bottom-6">{{ fish.count }}</div>
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

  // 短暂延迟后恢复状态
  setTimeout(() => {
    isKnocking.value = false
  }, 150)
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
