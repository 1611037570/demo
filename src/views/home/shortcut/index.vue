<script setup>
import { useShortcutStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'
import AddShortcut from './addShortcut.vue'

const shortcutStore = useShortcutStore()
const { shortcutList } = storeToRefs(shortcutStore)

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
  shortcutStore.initShortcutList()
  isInit.value = true
})

const handleAdd = () => {
  addVisible.value = true
  return
}
const addVisible = ref(false)
</script>

<template>
  <div>
    <SfModal v-if="addVisible" v-model="addVisible">
      <AddShortcut />
    </SfModal>
    <VueDraggable
      :style="{
        zoom: zoom,
      }"
      class="top-41 gap-5 fixed left-1/2 z-10 mx-auto grid w-[680px] -translate-x-1/2 transform grid-cols-5"
      v-if="isInit"
      v-model="shortcutList"
      ghostClass="bg-amber-500"
      @start="onStart"
      @update="onUpdate"
      @end="onEnd"
    >
      <SfApp
        v-for="(item, index) in shortcutList"
        :key="item.id"
        :index="index"
        :name="item.name"
        :value="item.url"
        :class="{ 'shake-element': isDrag }"
      ></SfApp>
      <SfApp
        name="添加"
        type="custom"
        :class="{ 'shake-element': isDrag }"
        @click="handleAdd"
      ></SfApp>
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
