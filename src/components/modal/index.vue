<template>
  <Teleport to="body" v-if="modeValue">
    <div
      class="fixed left-0 top-0 right-0 bottom-0 z-80 flex items-center justify-center transform body"
      ref="mask"
      style="
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.4);
      "
      @mousemove="handleMouseMove"
    >
      <div
        id="element"
        ref="elementRef"
        class="flex flex-col bg-neutral-200 rounded-xl p-3 z-80 shadow-4xl border border-white"
        :style="transformStyle"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
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
import { onMounted, ref } from 'vue'
const mask = useTemplateRef('mask')
const modeValue = defineModel()

const { x, y, width, height } = useElementBounding(mask)
const multiple = 55
const elementRef = ref(null)
const isMouseOverCard = ref(false)

const rx = ref(0)
const ry = ref(0)
const transformStyle = computed(() => {
  //  perspective(1200px)
  return `transform:translateZ(0) rotateX(${rx.value}deg) rotateY(${ry.value}deg)`
})
function transformElement(clientX, clientY) {
  if (isMouseOverCard.value) return

  const element = elementRef.value
  if (!element) return

  const calcX = -(clientY - y.value - height.value / 2) / multiple
  const calcY = (clientX - x.value - width.value / 2) / multiple
  const num = 14
  rx.value = Math.max(-num, Math.min(num, calcX))
  ry.value = Math.max(-num, Math.min(num, calcY))
}

function handleMouseMove(e) {
  requestAnimationFrame(() => {
    transformElement(e.clientX, e.clientY)
  })
}
function handleMouseEnter() {
  isMouseOverCard.value = true
  rx.value = 0
  ry.value = 0
}

function handleMouseLeave() {
  isMouseOverCard.value = false
}

onMounted(() => {})
</script>

<style>
.body {
  perspective: 500px;
}

#element {
  transition: transform 0.3s;
}
</style>
