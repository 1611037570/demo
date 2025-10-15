<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'
import Item from './item.vue'

const indexStore = useIndexStore()
const { shortcutList, openMode } = storeToRefs(indexStore)

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

const handleClick = (item) => {
  window.open(item.url, openMode.value)
}

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
      <SfMenu v-for="item in shortcutList" :key="item.id">
        <Item :item="item" :class="{ 'shake-element': isDrag }" @click="handleClick(item)"></Item>
      </SfMenu>
      <Item
        :item="{
          name: '添加',
          url: '#',
        }"
        :class="{ 'shake-element': isDrag }"
        @click="handleAdd()"
      ></Item>
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
