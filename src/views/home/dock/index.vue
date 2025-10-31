<template>
  <div
    class="bottom-0 fixed left-1/2 z-20 flex -translate-x-1/2 flex-col items-center transition-all duration-300"
    :class="dockClass"
  >
    <div
      class="translate rounded-xl p-2.5 flex max-h-[60px] min-h-[60px] w-auto items-end bg-sf-transparent-4 transition-all duration-300"
      ref="menuRef"
      style="-webkit-backdrop-blur: 10px; backdrop-filter: blur(10px)"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <template v-for="(i, index) in list" :key="i.name">
        <div class="menu-item">
          <Component
            v-if="i.component"
            :is="i.component"
            class="cursor-pointer"
            :style="{ zoom: 'var(--i) !important' }"
          />
        </div>
        <div class="gap" v-if="index !== list.length - 1"></div>
      </template>
    </div>
    <Copyright />
  </div>
</template>

<script setup>
import { useThrottleFn, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

import { useHomeStore } from '@/stores'
import list from './dock.data'

import Copyright from './copyright.vue'

// 原始样式相关状态保留
const init = ref(false)
setTimeout(() => {
  init.value = true
}, 1)

// 核心常量
const SCALE_RANGE = 200
const MAX_SCALE = 1.55
const MIN_SCALE = 1
const SCALE_DIFF = MAX_SCALE - MIN_SCALE
const HALF_RANGE = SCALE_RANGE / 2
const PI = Math.PI
const SCALE_FACTOR = PI / SCALE_RANGE

// 状态管理
const menuRef = ref(null)
const homeStore = useHomeStore()
const { autoHideDock } = storeToRefs(homeStore)
const dockVisible = ref(false)
const { height: windowHeight } = useWindowSize()

// 原始dockClass计算逻辑保留
const dockClass = computed(() => {
  if (!init.value) return 'translate-y-[100px]'
  if (autoHideDock.value) {
    return dockVisible.value ? 'translate-y-[-10px]' : 'translate-y-[100px]'
  }
  return 'translate-y-[-10px]'
})

// DOM元素引用
let elements = []

// 初始化：获取元素列表并设置节流事件
onMounted(() => {
  if (menuRef.value) {
    elements = Array.from(menuRef.value.querySelectorAll('.menu-item, .gap'))
  }

  // 使用useThrottleFn处理全局鼠标移动（自动关联生命周期）
  const throttledWindowMouseMove = useThrottleFn((e) => {
    if (!autoHideDock.value) return
    dockVisible.value = windowHeight.value - e.clientY < 300
  }, 30) // 30ms节流间隔

  window.addEventListener('mousemove', throttledWindowMouseMove, { passive: true })
})

// 缩放计算
const getScale = (mouseX, element) => {
  const rect = element.getBoundingClientRect()
  const elemCenter = rect.x + rect.width / 2
  const distance = Math.abs(mouseX - elemCenter)

  if (distance >= HALF_RANGE) return MIN_SCALE

  return Math.sin((HALF_RANGE - distance) * SCALE_FACTOR) * SCALE_DIFF + MIN_SCALE
}

// 使用useThrottleFn处理dock内部鼠标移动（自动清理）
const throttledMouseMove = useThrottleFn((e) => {
  requestAnimationFrame(() => {
    if (!elements.length) return
    const mouseX = e.clientX
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.setProperty('--i', getScale(mouseX, elements[i]))
    }
  })
}, 16) // 约60fps间隔

const handleMouseMove = (e) => {
  throttledMouseMove(e)
}

// 鼠标离开重置
const handleMouseLeave = () => {
  requestAnimationFrame(() => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.setProperty('--i', 1)
    }
  })
}
</script>

<style scoped>
.menu-item {
  min-width: calc(var(--i, 1) * 40px);
  min-height: calc(var(--i, 1) * 40px);
  margin-bottom: calc(var(--i, 1) * 15px - 15px);
}

.gap {
  min-width: calc(var(--i, 1) * 10px);
  min-height: 1px;
}
.menu-item,
.gap {
  transform: translateZ(0);
  will-change: transform, width, height, margin-bottom;
  transition: all 450ms cubic-bezier(0.4, 1.6, 0.05, 0.95);
}
</style>
