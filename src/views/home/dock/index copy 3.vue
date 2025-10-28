<template>
  <div class="docker-container">
    <div class="docker" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <div class="menu">
        <!-- 生成11个菜单项和间隔 -->
        <template v-for="i in 11" :key="i">
          <div class="menu-item"></div>
          <div class="gap" v-if="i < 11"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const range = 500
const maxScale = 1.8
let menuItems = ref([])

// 获取所有菜单项元素
onMounted(() => {
  menuItems.value = document.querySelectorAll('.menu-item, .gap')
})

// 基础曲线函数
const baseCurve = (x) => {
  if (x < 0) return 0
  if (x > 1) return 0
  return Math.sin(x * Math.PI)
}

// 创建曲线函数
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

// 布局处理函数
const layout = (curve) => {
  menuItems.value.forEach((item) => {
    const rect = item.getBoundingClientRect()
    const x = rect.x + rect.width / 2
    const scale = curve(x)
    item.style.setProperty('--i', scale)
  })
}

// 鼠标移动事件处理
const handleMouseMove = (e) => {
  const curve = createCurve(range, e.clientX, 1, maxScale)
  layout(curve)
}

// 鼠标离开事件处理
const handleMouseLeave = () => {
  layout(() => 1)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: justify;
}

body {
  background: #000;
  color: #fff;
}

.docker-container {
  position: fixed;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.docker {
  box-sizing: content-box;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: end;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.3);
}

.menu {
  display: flex;
  align-items: end;
}

.menu-item {
  border-radius: 5px;
  width: calc(var(--i, 1) * 30px);
  height: calc(var(--i, 1) * 30px);
  margin-bottom: calc(var(--i, 1) * 15px - 15px);
  background: #b4433d;
  border: 1px solid #ccc;
}

.gap {
  width: calc(var(--i, 1) * 10px);
  height: 30px;
}

/* 使用::v-deep穿透scoped样式 */
::v-deep .menu .menu-item:nth-child(3n + 1) {
  background: blue;
}
::v-deep .menu .menu-item:nth-child(3n) {
  background: yellow;
}
</style>
