<template>
  <!-- 使用ref获取容器元素，避免DOM查询 -->
  <div
    class="docker menu p-2.5 bg-white/20 mx-auto rounded-xl z-20 fixed bottom-12 left-1/2 -translate-x-1/2"
    ref="menuRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <template v-for="(i, index) in list" :key="index">
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
      <div class="gap" v-if="index < list.length - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Snowflake from '../snowflake/index.vue'
import Background from './background.vue'
import Launchpad from './launchpad.vue'
import SendResume from './sendResume.vue'
import Setting from './setting.vue'
import WriteResume from './writeResume.vue'
const list = [
  {
    name: '启动台',
    component: Launchpad,
  },
  {
    name: '背景',
    component: Background,
  },
  {
    name: '写简历',
    component: WriteResume,
  },
  {
    name: '投简历',
    component: SendResume,
  },
  {
    name: '雪花',
    component: Snowflake,
  },
  {
    name: '设置',
    component: Setting,
  },
]
// 常量定义
const range = 200
const maxScale = 1.35
const throttleDelay = 16 // 节流间隔（约60fps）

// DOM元素引用
const menuRef = ref(null)
const itemCache = ref([]) // 缓存元素的相对位置和尺寸

// 节流函数：限制高频事件触发频率
const throttle = (fn, delay) => {
  let lastTime = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

// 基础曲线函数（保持不变）
const baseCurve = (x) => {
  if (x < 0) return 0
  if (x > 1) return 0
  return Math.sin(x * Math.PI)
}

// 创建曲线函数（保持不变）
const createCurve = (totalXDis, topX, minY, maxY) => {
  return function curve(x) {
    const beginX = topX - totalXDis / 2
    const endX = topX + totalXDis / 2
    if (x < beginX) return minY
    if (x > endX) return minY
    const yDis = maxY - minY
    return baseCurve((x - beginX) / totalXDis) * yDis + minY
  }
}

// 优化布局计算：使用缓存的相对位置，减少重排
const layout = (curve) => {
  // 使用requestAnimationFrame合并DOM更新，确保在一帧内完成
  requestAnimationFrame(() => {
    if (!menuRef.value) return
    const menuRect = menuRef.value.getBoundingClientRect() // 只获取一次容器位置

    itemCache.value.forEach(({ element, relativeX, width }) => {
      // 基于容器位置和缓存的相对偏移计算x，避免每个元素调用getBoundingClientRect()
      const x = menuRect.x + relativeX + width / 2
      const scale = curve(x)
      element.style.setProperty('--i', scale)
    })
  })
}

// 节流处理鼠标移动事件，减少计算次数
const throttledLayout = throttle((e) => {
  const curve = createCurve(range, e.clientX, 1, maxScale)
  layout(curve)
}, throttleDelay)

// 鼠标移动事件处理
const handleMouseMove = (e) => {
  throttledLayout(e)
}

// 鼠标离开事件：批量恢复样式，减少DOM操作
const handleMouseLeave = () => {
  requestAnimationFrame(() => {
    itemCache.value.forEach(({ element }) => {
      element.style.setProperty('--i', 1)
    })
  })
}

// 初始化：缓存元素相对位置和尺寸（只执行一次）
onMounted(() => {
  if (!menuRef.value) return
  const menuRect = menuRef.value.getBoundingClientRect()
  const items = menuRef.value.querySelectorAll('.menu-item, .gap')

  // 缓存每个元素的相对位置和宽度（相对于menu容器）
  itemCache.value = Array.from(items).map((element) => {
    const rect = element.getBoundingClientRect()
    return {
      element,
      relativeX: rect.x - menuRect.x, // 相对容器的X偏移（固定不变）
      width: rect.width, // 初始宽度（固定不变）
    }
  })

  // 监听窗口 resize，重新计算相对位置（避免布局变化后错位）
  const handleResize = () => {
    if (!menuRef.value) return
    const newMenuRect = menuRef.value.getBoundingClientRect()
    itemCache.value.forEach((item) => {
      const newRect = item.element.getBoundingClientRect()
      item.relativeX = newRect.x - newMenuRect.x
    })
  }

  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
.docker {
  box-sizing: content-box;
  min-height: 40px; /* 固定menu高度 */
  max-height: 40px; /* 固定menu高度 */
  overflow: visible; /* 允许子元素超出容器 */
  align-items: end;
  transition: all 300ms;
}

.menu {
  display: flex;
  align-items: end;
}

.menu-item {
  border-radius: 5px;
  width: calc(var(--i, 1) * 40px);
  height: calc(var(--i, 1) * 40px);
  margin-bottom: calc(var(--i, 1) * 15px - 15px);
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom center; /* 设置缩放原点为底部中心 */
}

.gap {
  width: calc(var(--i, 1) * 10px);
  height: 30px;
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
