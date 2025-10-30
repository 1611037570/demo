<template>
  <sf-icon
    icon="fluent:settings-24-regular"
    size="6"
    class="transition-all duration-200 hover:rotate-180"
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
