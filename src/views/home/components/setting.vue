<template>
  <sf-icon
    icon="fluent:settings-24-regular"
    size="6"
    class="hover:rotate-180 transition-all duration-200 fixed top-12 right-12 z-20"
    @click="openSet"
  />
</template>

<script setup>
import { useHomeStore } from '@/stores'
import { storeToRefs } from 'pinia'

const homeStore = useHomeStore()
const { systemVisible } = storeToRefs(homeStore)
const openSet = () => {
  systemVisible.value = true
}
</script>

<style lang="scss" scoped></style>
