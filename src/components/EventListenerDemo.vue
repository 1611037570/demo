<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-blue-600">事件监听示例</h2>
    
    <div class="mb-4">
      <p class="text-gray-700 mb-2">按下任意键查看效果（在document上监听）：</p>
      <p class="font-medium">{{ lastKey }}</p>
    </div>
    
    <div class="mb-4">
      <p class="text-gray-700 mb-2">点击此区域（在特定元素上监听）：</p>
      <div 
        ref="clickAreaRef" 
        class="w-full h-20 bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
      >
        {{ clickCount }} 次点击
      </div>
    </div>
    
    <div class="mb-4">
      <p class="text-gray-700 mb-2">滚动页面查看效果：</p>
      <p>滚动位置: {{ scrollPosition }}</p>
    </div>
    
    <div class="text-sm text-gray-500">
      <p>提示：此组件展示了useEventListener钩子在不同场景下的使用方法</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener } from '@/hooks/useEventListener'

// 示例1：监听document上的keydown事件
const lastKey = ref('尚未按键')
useEventListener(
  document,
  'keydown',
  (e) => {
    lastKey.value = `按下了: ${e.key}`
  }
)

// 示例2：监听特定DOM元素上的click事件
const clickAreaRef = ref<HTMLElement>()
const clickCount = ref(0)
useEventListener(
  clickAreaRef,
  'click',
  () => {
    clickCount.value++
  }
)

// 示例3：监听window上的scroll事件（带选项）
const scrollPosition = ref(0)
useEventListener(
  window,
  'scroll',
  () => {
    scrollPosition.value = window.scrollY
  },
  { passive: true } // 使用passive选项提高滚动性能
)
</script>

<style scoped>
/* 组件样式 */
</style>