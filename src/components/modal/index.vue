<template>
  <Teleport to="body" v-if="modeValue">
    <div
      class="body top-0 right-0 bottom-0 left-0 fixed z-80 flex transform items-center justify-center bg-sf-transparent-4"
      ref="mask"
      style="backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px)"
      @mousemove="handleMouseMove"
    >
      <div
        id="element"
        ref="elementRef"
        class="shadow-4xl rounded-xl p-3 z-80 flex flex-col border bg-sf-modal"
        :style="transformStyle"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- 标题和关闭按钮 -->
        <div class="mb-3 relative flex items-center justify-between">
          <div class="text-2xl font-bold w-full text-center">123</div>
          <div
            class="right-0 absolute top-1/2 -translate-y-1/2 transform cursor-pointer"
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
