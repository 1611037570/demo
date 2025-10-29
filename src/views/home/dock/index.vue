<template>
  <div
    class="translate fixed bottom-0 left-1/2 z-20 mx-auto flex max-h-[60px] min-h-[60px] w-auto -translate-x-1/2 items-end rounded-xl bg-white/20 p-2.5 transition-all duration-300"
    ref="menuRef"
    :class="dockClass"
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
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { useHomeStore } from '@/stores'
import list from './dock.data'

// 原始样式相关状态保留
const init = ref(false)
setTimeout(() => {
  init.value = true
}, 1)

// 核心常量（仅添加预计算比例因子优化）
const SCALE_RANGE = 200
const MAX_SCALE = 1.55
const MIN_SCALE = 1
const SCALE_DIFF = MAX_SCALE - MIN_SCALE
const HALF_RANGE = SCALE_RANGE / 2
const PI = Math.PI
const SCALE_FACTOR = PI / SCALE_RANGE // 预计算比例因子（仅保留此优化）

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
    return dockVisible.value ? 'translate-y-[-46px]' : 'translate-y-[100px]'
  }
  return 'translate-y-[-46px]'
})

// DOM元素引用（仅保存元素列表，不缓存位置）
let elements = []

// 初始化：仅获取一次元素列表
onMounted(() => {
  if (menuRef.value) {
    elements = Array.from(menuRef.value.querySelectorAll('.menu-item, .gap'))
  }

  // 全局鼠标监听（保持原始逻辑）
  const handleWindowMouseMove = (e) => {
    if (!autoHideDock.value) return
    dockVisible.value = windowHeight.value - e.clientY < 300
  }

  window.addEventListener('mousemove', handleWindowMouseMove, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleWindowMouseMove)
  })
})

// 仅优化缩放计算中的比例因子使用
const getScale = (mouseX, element) => {
  const rect = element.getBoundingClientRect()
  const elemCenter = rect.x + rect.width / 2 // 元素中心X坐标
  const distance = Math.abs(mouseX - elemCenter) // 鼠标到元素中心的水平距离

  // 超出范围直接返回最小缩放
  if (distance >= HALF_RANGE) return MIN_SCALE

  // 使用预计算的SCALE_FACTOR替代实时计算 (ratio * PI)
  return Math.sin((HALF_RANGE - distance) * SCALE_FACTOR) * SCALE_DIFF + MIN_SCALE
}

// 鼠标移动处理（保持原始逻辑）
const handleMouseMove = (e) => {
  requestAnimationFrame(() => {
    if (!elements.length) return
    const mouseX = e.clientX
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.setProperty('--i', getScale(mouseX, elements[i]))
    }
  })
}

// 鼠标离开重置（保持原始逻辑）
const handleMouseLeave = () => {
  requestAnimationFrame(() => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.setProperty('--i', 1)
    }
  })
}
</script>

<style scoped>
/* 保留原始样式定义 */
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
  transform: translateZ(0); /* 开启GPU加速 */
  will-change: transform, width, height, margin-bottom;
  transition: all 450ms cubic-bezier(0.4, 1.6, 0.05, 0.95);
}
</style>
