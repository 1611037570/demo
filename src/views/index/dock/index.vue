<template>
  <div
    class="flex items-center justify-center p-3 bg-white/20 mx-auto rounded-xl gap-3 fixed bottom-14 left-1/2 transform -translate-x-1/2"
    style="-webkit-backdrop-blur: 10px; backdrop-filter: blur(10px)"
  >
    <launchpad />
    <div
      class="hover:scale-105 transition-all duration-200 w-12 h-12 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center"
      @click="openSet"
    >
      <sf-icon icon="fluent:settings-24-regular" size="9" />
    </div>
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import launchpad from './launchpad.vue'

const indexStore = useIndexStore()
const { systemVisible } = storeToRefs(indexStore)
const openSet = () => {
  systemVisible.value = true
}
</script>

<style lang="scss" scoped></style>
