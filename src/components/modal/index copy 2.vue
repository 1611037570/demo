<template>
  <Teleport to="body" v-if="modelValue">
    <!-- 外层容器作为事件监听区域 -->
    <div
      class="fixed top-0 right-0 bottom-0 left-0 z-80 flex transform items-center justify-center"
      style="
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.4);
      "
      @mousemove="handleContainerMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <!-- 3D卡片元素 -->
      <div
        id="element"
        ref="elementRef"
        @mousemove.stop="handleCardMouseMove"
        @mouseenter="handleCardMouseEnter"
        @mouseleave="handleCardMouseLeave"
      ></div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 双向绑定控制显示
const modelValue = defineModel()

// 元素引用
const elementRef = ref(null)

// 状态控制
const isHoveringCard = ref(false) // 是否悬停在卡片上
const multiple = 15

// 元素边界缓存
let elementRect = { x: 0, y: 0, width: 0, height: 0 }

// 节流函数
function throttle(fn, delay = 16) {
  let lastTime = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastTime > delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

// 容器鼠标移动（背景区域）
const handleContainerMouseMove = throttle((e) => {
  if (!elementRef.value || isHoveringCard.value) return

  // 计算旋转角度
  let calcX = -(e.clientY - elementRect.y - elementRect.height / 2) / multiple
  let calcY = (e.clientX - elementRect.x - elementRect.width / 2) / multiple
  calcX = Math.max(-20, Math.min(20, calcX))
  calcY = Math.max(-20, Math.min(20, calcY))
  // 更新样式
  elementRef.value.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`
})

// 卡片上的鼠标移动（阻止冒泡到容器）
function handleCardMouseMove(e) {
  e.stopPropagation()
  // 鼠标在卡片上时保持还原状态
  if (elementRef.value) {
    elementRef.value.style.transform = 'rotateX(0) rotateY(0)'
  }
}

// 鼠标进入卡片
function handleCardMouseEnter() {
  isHoveringCard.value = true
  // 还原旋转状态
  if (elementRef.value) {
    elementRef.value.style.transform = 'rotateX(0) rotateY(0)'
  }
}

// 鼠标离开卡片（回到背景）
function handleCardMouseLeave() {
  isHoveringCard.value = false
}

// 鼠标离开整个容器
function handleMouseLeave() {
  if (elementRef.value) {
    elementRef.value.style.transform = 'rotateX(0) rotateY(0)'
  }
}

// 初始化元素信息
function initElementRect() {
  if (elementRef.value) {
    const rect = elementRef.value.getBoundingClientRect()
    elementRect = {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    }
  }
}

// 窗口大小变化重新计算
function handleResize() {
  initElementRect()
}

onMounted(() => {
  initElementRect()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
#element {
  margin: auto;
  width: 250px;
  height: 400px;
  background: linear-gradient(45deg, black, deeppink, #6006ff);
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: all 0.1s;
  will-change: transform;
  transform: translateZ(0); /* GPU加速 */
}

#g-img {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('https://key-drop.com/cdn-cgi/image/format=auto,width=270,dpr=2/uploads/skins/JAINA.png');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  filter: brightness(1.2);
}

#g-img::after {
  content: '';
  display: none;
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif');
  mix-blend-mode: color-dodge;
}

#g-img::before {
  content: '';
  display: none;
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: linear-gradient(
    115deg,
    transparent 0%,
    #06e8ff var(--per),
    #ffab2e calc(var(--per) + 25%),
    #ff2212 calc(var(--per) + 50%),
    transparent 100%
  );
  mix-blend-mode: color-dodge;
}

#g-img:hover::after,
#g-img:hover::before {
  display: block;
}

:root {
  --per: 30%;
}
</style>
