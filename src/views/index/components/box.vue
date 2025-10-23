<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'

const indexStore = useIndexStore()
const { shortcutList } = storeToRefs(indexStore)

// 拖拽状态
const isDrag = ref(false)
// 缩放比例
const zoom = ref(1)
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
  indexStore.initShortcutList()
  isInit.value = true
})

const handleAdd = () => {
  indexStore.addShortcut({
    name: '新应用',
    url: '#',
  })
}
</script>

<template>
  <div>
    <VueDraggable
      :style="{
        zoom: zoom,
      }"
      class="w-[680px] mx-auto grid grid-cols-5"
      v-if="isInit"
      v-model="shortcutList"
      ghostClass="bg-amber-500"
      @start="onStart"
      @update="onUpdate"
      @end="onEnd"
    >
      <sf-app
        v-for="(item, index) in shortcutList"
        :key="item.id"
        :index="index"
        :name="item.name"
        :value="item.url"
        :class="{ 'shake-element': isDrag }"
      ></sf-app>
      <sf-app
        name="添加"
        type="custom"
        :class="{ 'shake-element': isDrag }"
        @click="handleAdd"
      ></sf-app>
    </VueDraggable>
  </div>
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
