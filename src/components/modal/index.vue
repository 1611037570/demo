<template>
  <Teleport to="body" v-if="modeValue">
    <!-- 遮罩层作为事件监听容器（modal 外部区域） -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.4);
      "
      @mousemove="handleMouseMove"
    >
      <div
        class="flex flex-col bg-neutral-200 rounded-xl p-3 z-50"
        :style="transform"
        ref="modal"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseResume"
      >
        <!-- 标题和关闭按钮 -->
        <div class="flex justify-between items-center relative mb-3">
          <div class="text-2xl font-bold text-center w-full">123</div>
          <div
            class="cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2"
            @click="modeValue = false"
          >
            关闭
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, useTemplateRef } from 'vue'
const modeValue = defineModel()
const modal = useTemplateRef('modal')
import { useElementBounding } from '@vueuse/core'
const { left, top, width, height } = useElementBounding(modal)
import { useModalStore } from '@/stores'

const modalStore = useModalStore()
const { modalVisible } = storeToRefs(modalStore)
// 控制是否允许旋转的开关
const allowRotate = ref(true)

const maxRotate = 5 // 最大旋转角度，可根据需要调整
const yRange = [-maxRotate, maxRotate]
const xRange = [-maxRotate, maxRotate]
const rx = ref(0)
const ry = ref(0)

const transform = computed(() => {
  return `transform: perspective(1200px) rotateX(${rx.value}deg) rotateY(${ry.value}deg)`
})

function getRotate(range, value, max) {
  const res = (value / max) * (range[1] - range[0]) + range[0]
  return Math.max(-20, Math.min(20, res))
}

// 处理遮罩层上的鼠标移动（外部区域）
const handleMouseMove = (e) => {
  if (!modal.value || !allowRotate.value) return

  const x = e.clientX - left.value
  const y = e.clientY - top.value

  if (!width.value || !height.value) return
  rx.value = -getRotate(xRange, y, height.value)
  ry.value = getRotate(yRange, x, width.value)
}

// 鼠标进入 modal 内部时：暂停旋转
const handleMouseEnter = () => {
  allowRotate.value = false
  rx.value = 0
  ry.value = 0
}

// 鼠标离开 modal 回到遮罩层时：恢复旋转
const handleMouseResume = () => {
  allowRotate.value = true
}

onMounted(() => {
  modalVisible.value = true
})
onBeforeUnmount(() => {
  modalVisible.value = false
})
</script>

<style scoped></style>
