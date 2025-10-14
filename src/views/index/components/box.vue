<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'
import Item from './item.vue'

const indexStore = useIndexStore()
const { dataList, openMode } = storeToRefs(indexStore)

const isDrag = ref(false)
const onStart = (e) => {
  isDrag.value = true
  console.log('start', e)
}

const onEnd = (e) => {
  isDrag.value = false
  console.log('onEnd', e)
}

const onUpdate = () => {
  console.log('update')
}
const isInit = ref(false)
onMounted(async () => {
  await nextTick()
  indexStore.initDataList()
  isInit.value = true
})

const handleClick = (item) => {
  window.open(item.url, openMode.value)
}
</script>

<template>
  <VueDraggable
    v-if="isInit"
    v-model="dataList"
    class="w-[680px] mx-auto grid grid-cols-5 gap-10"
    ghostClass="bg-amber-500"
    @start="onStart"
    @update="onUpdate"
    @end="onEnd"
  >
    <SfMenu v-for="item in dataList" :key="item.id">
      <Item :item="item" :class="{ 'shake-element': isDrag }" @click="handleClick(item)"></Item>
    </SfMenu>
  </VueDraggable>
</template>
<style scoped>
@keyframes tiltShake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(3deg);
  }
}

.shake-element {
  animation: tiltShake 0.4s linear infinite;
  transform-origin: center;
}
</style>
