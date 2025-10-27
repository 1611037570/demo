<template>
  <div
    class="docker flex items-end p-2.5 bg-white/20 mx-auto rounded-xl z-20 fixed translate left-1/2 -translate-x-1/2 transition-all duration-300"
    ref="menuRef"
    :class="dockClass"
    style="-webkit-backdrop-blur: 10px; backdrop-filter: blur(10px)"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- 1. 使用唯一标识作为key，避免v-for复用错误 -->
    <template v-for="i in list" :key="i.name">
      <div class="menu-item">
        <Component
          v-if="i.component"
          :is="i.component"
          class="cursor-pointer"
          :style="{
            zoom: 'var(--i) !important',
          }"
        />
      </div>
      <!-- 2. 减少gap判断次数，用计算属性提前处理 -->
      <div class="gap" v-if="i !== list[list.length - 1]"></div>
    </template>
  </div>
</template>

<script setup>
import { useElementBounding, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import list from './dock.data'

import { useHomeStore } from '@/stores'
const homeStore = useHomeStore()
const { autoHideDock } = storeToRefs(homeStore)
const dockVisible = ref(false)

// 常量定义
const range = 200
const maxScale = 1.35
const throttleDelay = 16 // 约60fps
const resizeThrottleDelay = 200 // 窗口 resize 节流间隔

// DOM元素引用
const menuRef = ref(null)
const itemCache = ref([]) // 缓存元素信息
const lastScales = ref({}) // 缓存上次缩放值，避免重复设置

// 使用VueUse获取元素边界信息（响应式）
const { x: menuX, width: menuWidth, update: updateMenuBounds } = useElementBounding(menuRef)

// 3. 节流函数优化：使用箭头函数减少this绑定开销
const throttle = (fn, delay) => {
  let lastTime = 0
  return (...args) => {
    const now = performance.now() // 更高精度的时间API
    if (now - lastTime >= delay) {
      fn(...args)
      lastTime = now
    }
  }
}

// 基础曲线函数（保持不变）
const baseCurve = (x) => {
  if (x < 0 || x > 1) return 0
  return Math.sin(x * Math.PI)
}

// 4. 曲线计算优化：避免闭包创建，使用参数传递
const curve = (x, totalXDis, topX, minY, maxY) => {
  const beginX = topX - totalXDis / 2
  const endX = topX + totalXDis / 2
  if (x < beginX || x > endX) return minY
  const yDis = maxY - minY
  return baseCurve((x - beginX) / totalXDis) * yDis + minY
}

// 布局计算函数：根据鼠标位置更新元素缩放
const layout = (totalXDis, topX, minY, maxY) => {
  requestAnimationFrame(() => {
    if (!menuRef.value || itemCache.value.length === 0) return

    // 主动更新边界信息
    updateMenuBounds()

    itemCache.value.forEach(({ element, relativeX, width, id }) => {
      const x = menuX.value + relativeX + width / 2
      const scale = curve(x, totalXDis, topX, minY, maxY)
      const currentScale = lastScales.value[id] || 1

      // 仅在缩放值变化超过阈值时更新
      if (Math.abs(scale - currentScale) > 0.001) {
        element.style.setProperty('--i', scale)
        lastScales.value[id] = scale
      }
    })
  })
}

// 6. 鼠标移动处理：提前计算曲线参数，减少函数嵌套
const throttledLayout = throttle((e) => {
  layout(range, e.clientX, 1, maxScale)
}, throttleDelay)

const handleMouseMove = (e) => {
  throttledLayout(e)
}

// 鼠标离开时重置所有元素缩放
const handleMouseLeave = () => {
  requestAnimationFrame(() => {
    itemCache.value.forEach(({ element, id }) => {
      element.style.setProperty('--i', 1)
      lastScales.value[id] = 1
    })
  })
}

// 8. 初始化优化：增加唯一ID标识，提升缓存准确性
onMounted(() => {
  if (!menuRef.value) return

  // 确保获取到正确的边界信息
  updateMenuBounds()
  const items = menuRef.value.querySelectorAll('.menu-item, .gap')

  // 为每个元素生成唯一ID，用于缓存跟踪
  itemCache.value = Array.from(items).map((element, idx) => {
    const rect = element.getBoundingClientRect()
    return {
      id: `item-${idx}`, // 唯一标识
      element,
      relativeX: rect.x - menuX.value, // 使用响应式的menuX
      width: rect.width,
    }
  })

  // 窗口resize节流，减少频繁计算
  const handleResize = throttle(() => {
    if (!menuRef.value) return

    // 主动更新边界信息
    updateMenuBounds()

    itemCache.value.forEach((item) => {
      const newRect = item.element.getBoundingClientRect()
      item.relativeX = newRect.x - menuX.value
    })
  }, resizeThrottleDelay)

  // 监听鼠标移动事件，控制停靠栏显示/隐藏
  const handleWindowMouseMove = (event) => {
    if (autoHideDock.value) {
      dockVisible.value = height.value - event.clientY < 200
    }
  }

  // 添加事件监听器
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleWindowMouseMove)

  // 统一的事件清理函数
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleWindowMouseMove)
  })

  // 监听menu位置变化，自动更新缓存的相对位置
  watch(
    [menuX, menuWidth],
    () => {
      handleResize()
    },
    { deep: true },
  )
})

const dockClass = computed(() => {
  // 自动隐藏停靠栏
  if (autoHideDock.value) {
    return dockVisible.value ? 'bottom-[46px]' : '-bottom-[100px]'
  }
  // 不自动隐藏停靠栏
  return 'bottom-[46px]'
})
const { height } = useWindowSize()

// 监听鼠标移动事件
window.addEventListener('mousemove', (event) => {
  // 当不使用自动隐藏时，不处理鼠标移动事件
  if (!autoHideDock.value) {
    return
  }
  if (height.value - event.clientY >= 200) {
    dockVisible.value = false
  } else {
    dockVisible.value = true
  }
})
</script>

<style scoped>
/* 样式保持不变 */
.docker {
  box-sizing: content-box;
  min-height: 40px;
  max-height: 40px;
  overflow: visible;
  align-items: end;
}

.menu-item {
  border-radius: 5px;
  width: calc(var(--i, 1) * 40px);
  height: calc(var(--i, 1) * 40px);
  margin-bottom: calc(var(--i, 1) * 15px - 15px);
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom center;
}

.gap {
  width: calc(var(--i, 1) * 10px);
  height: 30px;
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>

<style scoped>
/* 样式保持不变 */
.docker {
  box-sizing: content-box;
  min-height: 40px;
  max-height: 40px;
  overflow: visible;
  align-items: end;
  transition: all 300ms;
}

.menu-item {
  border-radius: 5px;
  width: calc(var(--i, 1) * 40px);
  height: calc(var(--i, 1) * 40px);
  margin-bottom: calc(var(--i, 1) * 15px - 15px);
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom center;
}

.gap {
  width: calc(var(--i, 1) * 10px);
  height: 30px;
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
