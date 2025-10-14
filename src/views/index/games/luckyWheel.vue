<template>
  <!-- 幸运转盘容器 -->
  <div class="fixed bottom-32 left-12 z-20 flex flex-col items-center">
    <!-- 上次结果显示 - 顶部 -->
    <div
      v-if="lastResult"
      class="text-[10px] text-gray-600 bg-white/80 px-2 py-0.5 rounded-full mb-1 whitespace-nowrap"
    >
      {{ lastResult }}
    </div>

    <!-- 转盘主体 - 保持原尺寸 w-12 h-12 -->
    <div class="relative w-12 h-12 mb-4">
      <!-- 转盘背景（承载所有扇区） -->
      <div
        class="absolute inset-0 rounded-full shadow-md overflow-hidden"
        :style="{
          transform: `rotate(${wheelData.currentAngle}deg)`,
          transition: wheelData.isSpinning
            ? 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)'
            : 'none',
        }"
      >
        <!-- 遍历生成扇区（动态适配数量，每个大小一致） -->
        <div
          v-for="(sector, index) in wheelData.sectors"
          :key="sector.id"
          class="absolute inset-0"
          :style="{
            transform: `rotate(${index * sectorAngle}deg)`, // 扇区旋转到对应位置
            clipPath: getSectorClipPath(sectorAngle), // 动态计算切割路径
          }"
        >
          <!-- 扇区颜色层 + 细白分隔线 -->
          <div
            class="w-full h-full border-l border-white/50"
            :style="{ backgroundColor: sector.color }"
          ></div>
        </div>
      </div>

      <!-- 转盘指针 -->
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1.5 z-10">
        <div
          class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-red-500"
        ></div>
      </div>

      <!-- 中心按钮 -->
      <button
        class="absolute inset-0 m-auto w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center shadow transition-all duration-200"
        :class="{
          'scale-90 bg-red-600': isButtonPressed,
          'opacity-50 cursor-not-allowed': wheelData.isSpinning,
        }"
        @mousedown="handleButtonDown"
        @mouseup="handleButtonUp"
        @mouseleave="handleButtonUp"
        @click="spinWheel"
        :disabled="wheelData.isSpinning"
      ></button>
    </div>

    <!-- 标题 - 底部 -->
    <div class="text-xs font-bold text-gray-800">吃什么</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 状态管理
const isButtonPressed = ref(false)
const lastResult = ref('')

// 转盘数据（可动态增删扇区，当前6个）
const wheelData = ref({
  sectors: [
    { id: 1, color: '#FF4136', name: '火锅' },
    { id: 2, color: '#2ECC40', name: '烧烤' },
    { id: 3, color: '#0074D9', name: '炒菜' },
    { id: 4, color: '#FFDC00', name: '快餐' },
    { id: 5, color: '#B10DC9', name: '寿司' },
    { id: 6, color: '#FF851B', name: '面条' },
  ],
  currentAngle: 0,
  isSpinning: false,
})

// 1. 计算每个扇区的角度（360° / 扇区数量，动态适配）
const sectorAngle = computed(() => 360 / wheelData.value.sectors.length)

// 2. 动态生成扇区的 clip-path 路径（核心：解决扇区大小不一致）
function getSectorClipPath(angle) {
  // 计算扇区结束边的角度（当前扇区角度 + 单个扇区角度）
  const endAngle = angle
  // 角度转弧度（用于计算坐标）
  const radStart = (0 * Math.PI) / 180
  const radEnd = (endAngle * Math.PI) / 180

  // 计算扇区边缘的两个顶点（基于元素100%尺寸，中心在(50%,50%)）
  const startX = 50 + 50 * Math.cos(radStart - Math.PI / 2) // 起始边顶点（右向为0°，修正为上向）
  const startY = 50 + 50 * Math.sin(radStart - Math.PI / 2)
  const endX = 50 + 50 * Math.cos(radEnd - Math.PI / 2) // 结束边顶点
  const endY = 50 + 50 * Math.sin(radEnd - Math.PI / 2)

  // 生成 clip-path 多边形路径：中心 → 起始边 → 边缘 → 结束边 → 中心
  return `polygon(50% 50%, ${startX}% ${startY}%, 100% 0%, 100% 100%, ${endX}% ${endY}%)`
}

// 按钮交互
function handleButtonDown() {
  if (!wheelData.value.isSpinning) isButtonPressed.value = true
}
function handleButtonUp() {
  isButtonPressed.value = false
}

// 旋转逻辑（适配动态扇区）
function spinWheel() {
  if (wheelData.value.isSpinning) return
  wheelData.value.isSpinning = true

  const randomIndex = Math.floor(Math.random() * wheelData.value.sectors.length)
  const targetSector = wheelData.value.sectors[randomIndex]

  // 精准计算旋转角度（确保停在扇区中心）
  const totalAngle =
    wheelData.value.currentAngle +
    4 * 360 + // 基础旋转4圈
    (360 - (randomIndex * sectorAngle.value + sectorAngle.value / 2)) // 对准扇区中心

  wheelData.value.currentAngle = totalAngle

  // 旋转结束更新结果
  setTimeout(() => {
    lastResult.value = targetSector.name
    wheelData.value.isSpinning = false
  }, 3000)
}
</script>

<style scoped></style>
