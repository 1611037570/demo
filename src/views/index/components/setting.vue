<template>
  <div class="fixed top-12 right-12 z-20" @click="openSet">设置</div>
  <settingModal v-if="systemVisible" />
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import settingModal from '../setting/modal.vue'

const indexStore = useIndexStore()
const { systemVisible } = storeToRefs(indexStore)
const openSet = () => {
  systemVisible.value = true
}
</script>

<style lang="scss" scoped></style>
